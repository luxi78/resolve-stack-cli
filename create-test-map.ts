import { SourceMapGenerator } from 'source-map';
import fs from 'fs';
import path from 'path';

async function createValidSourceMap() {
    const generator = new SourceMapGenerator({
        file: '_next/static/chunks/9b0008ae-271aa26b9a487cb1.js'
    });

    const sourceFile = 'webpack://_N_E/pdf.js/src/display/network.js';

    // Create an array of lines to accurately simulate the source file
    const lines = [];
    // Fill with empty lines up to the target line
    for (let i = 1; i < 119; i++) {
        lines.push('');
    }
    lines[118] = '      pendingRequest.onHeadersReceived();'; // line 119 (0-indexed)

    for (let i = 120; i < 276; i++) {
        lines.push('');
    }
    lines[275] = '    const responseHeaders = new Headers();'; // line 276 (0-indexed)

    const sourceContent = lines.join('\n');

    // Add mapping (column numbers are 0-based)
    generator.addMapping({
        generated: { line: 1, column: 176770 },
        original: { line: 276, column: 28 },
        source: sourceFile,
        name: '_onHeadersReceived'
    });

    generator.addMapping({
        generated: { line: 1, column: 174922 },
        original: { line: 119, column: 21 },
        source: sourceFile,
        name: 'onStateChange'
    });

    // Set the correct source content
    generator.setSourceContent(sourceFile, sourceContent);

    const mapPath = path.resolve('/home/luxee/temp/easy-source-map/out/_next/static/chunks/9b0008ae-271aa26b9a487cb1.js.map');
    fs.writeFileSync(mapPath, generator.toString());

    console.log(`Successfully created a valid source map at ${mapPath}`);
}

createValidSourceMap().catch(console.error);