import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';
import toml from '@iarna/toml';
import { SourceMapConsumer, type RawSourceMap } from 'source-map';

// Define an interface for the configuration for type safety
interface Config {
    appUrlBase: string;
    sourceMapRoot: string;
}

// Extract the function name from a stack trace line
function extractFunctionName(line: string): string {
    const match = line.trim().match(/^at (.*?) \(/);
    return match?.[1] ?? '';
}

export async function main() {
    // Parse command line arguments using yargs
    const argv = await yargs(hideBin(process.argv))
        .usage('Usage: Pipe a stack trace into this script. $0 [options]')
        .option('c', {
            alias: 'config',
            type: 'string',
            description: 'Path to a TOML config file.',
            nargs: 1,
        })
        .option('app-url-base', {
            type: 'string',
            description: 'The base URL of your deployed application.',
        })
        .option('source-map-root', {
            type: 'string',
            description: 'The local root directory of your source maps.',
        })
        // Ensure -c is mutually exclusive with other options
        .conflicts('c', ['app-url-base', 'source-map-root'])
        .check((argv) => {
            if (!argv.c && (!argv.appUrlBase || !argv.sourceMapRoot)) {
                throw new Error('You must provide either a config file (-c) or both --app-url-base and --source-map-root.');
            }
            return true;
        })
        .help('h')
        .alias('h', 'help')
        .parse();

    let config: Config;

    if (argv.c) {
        // Load configuration from a TOML file
        try {
            const configPath = path.resolve(argv.c);
            const configFile = fs.readFileSync(configPath, 'utf-8');
            const parsedConfig: any = toml.parse(configFile);
            config = {
                appUrlBase: parsedConfig.appUrlBase,
                sourceMapRoot: parsedConfig.sourceMapRoot,
            };
        } catch (error: any) {
            console.error(`Error reading or parsing config file at ${argv.c}: ${error.message}`);
            process.exit(1);
        }
    } else {
        // Load configuration from command line arguments
        if (argv.appUrlBase && argv.sourceMapRoot) {
            config = {
                appUrlBase: argv.appUrlBase,
                sourceMapRoot: argv.sourceMapRoot,
            };
        } else {
            // This should not happen due to the .check() call, but it satisfies TypeScript
            console.error('Error: CLI arguments are incomplete.');
            process.exit(1);
        }
    }

    // Validate that the configuration is complete
    if (!config.appUrlBase || !config.sourceMapRoot) {
        console.error('Error: Configuration is incomplete.');
        process.exit(1);
    }

    // Read the entire stream from stdin
    process.stdin.setEncoding('utf8');
    let buffer = '';
    for await (const chunk of process.stdin) {
        buffer += chunk;
    }

    // Process each line of the input
    const lines = buffer.split('\n');
    for (const line of lines) {
        if (line.trim() === '') continue;
        await processLine(line, config);
    }
}

async function processLine(line: string, config: Config) {
    // Regular expression to find URL, line, and column in a stack trace
    const stackLineRegex = /\(?(https?:\/\/.+?):(\d+):(\d+)\)?/;
    const match = line.match(stackLineRegex);

    // If it's not a stack trace line, print it as is
    if (!match) {
        console.log(line);
        return;
    }

    const [, url, lineNumberStr, columnNumberStr] = match;
    const lineNumber = parseInt(lineNumberStr, 10);
    const columnNumber = parseInt(columnNumberStr, 10);

    // Ignore URLs that don't match the app's base URL
    if (!url || !url.startsWith(config.appUrlBase)) {
        console.log(line);
        return;
    }

    // Construct the path to the local source map file
    const relativePath = url.substring(config.appUrlBase.length).split('?')[0].replace(/^\//, '');
    const sourceMapPath = path.join(config.sourceMapRoot, `${relativePath}.map`);

    try {
        if (!fs.existsSync(sourceMapPath)) {
            throw new Error(`File not found`);
        }
        const rawSourceMap: RawSourceMap = JSON.parse(fs.readFileSync(sourceMapPath, 'utf8'));
        
        // Use the source-map library to find the original position
        await SourceMapConsumer.with(rawSourceMap, null, consumer => {
            const pos = consumer.originalPositionFor({
                line: lineNumber,
                column: columnNumber,
            });

            if (pos.source && pos.line != null && pos.column != null) {
                const funcName = pos.name || extractFunctionName(line);
                const at = funcName ? `at ${funcName}` : 'at';
                
                // Print the resolved position
                console.log(`    ${at} (${pos.source}:${pos.line}:${pos.column})`);

                // Try to find and print the original source code snippet
                const sourceContent = consumer.sourceContentFor(pos.source, true);
                if (sourceContent) {
                    const sourceLines = sourceContent.split('\n');
                    const errorLine = sourceLines[pos.line - 1];
                    if (typeof errorLine === 'string') {
                        console.log(`    ${errorLine.trim()}`);
                        const leadingWhitespaceLength = errorLine.match(/^\s*/)?.[0].length ?? 0;
                        const pointerColumn = pos.column - leadingWhitespaceLength;
                        if (pointerColumn >= 0) {
                           console.log('    ' + ' '.repeat(pointerColumn) + '^');
                        }
                    }
                }
            } else {
                // If mapping fails, print the original line
                console.log(line);
            }
        });
    } catch (error: any) {
        console.error(`> Could not process ${sourceMapPath}. Reason: ${error.message}`);
        console.log(line); // Print the original line on error
    }
}

main().catch(console.error);