# Resolve Stack CLI

A lightweight, fast command-line tool for resolving JavaScript stack traces using source maps.

## Features

- 🚀 **Fast**: Built with Bun runtime for optimal performance
- 📁 **TOML Configuration**: Support for TOML-based configuration files
- 🛠️ **CLI Interface**: Easy-to-use command-line interface
- 📊 **Stack Trace Resolution**: Resolve minified stack traces to original source code locations
- ⚡ **TypeScript**: Written in TypeScript with full type safety

## Installation

### Prerequisites

- [Bun](https://bun.sh) runtime (latest version recommended)
- TypeScript ^5.0.0

### Global Installation

Install globally from local project:

```bash
# Clone or download the project, then:
cd resolve-stack-cli
bun install
bun install -g .
```

Or install directly from a Git repository:

```bash
bun install -g git+https://github.com/username/resolve-stack-cli.git
```

### Development Installation

For development purposes:

```bash
bun install
```

## Usage

### After Global Installation

```bash
resolve-stack [options]
```

### Development Usage

```bash
bun run index.ts [options]
```

### Command Line Options

The tool uses `yargs` for command-line argument parsing. Run with `--help` to see available options:

```bash
# If globally installed:
resolve-stack --help

# If running from source:
bun run index.ts --help
```

## Configuration

Resolve Stack CLI supports TOML configuration files for advanced usage scenarios. Create a configuration file in your project directory:

```toml
# example.toml
[sourcemap]
appUrlBase = "https://cdn.xuante.top:44300/cdns1.bangnimang.net/fapiao-ng"
sourceMapRoot = "out"
```

## Development

### Running the Development Version

```bash
bun run start
```

### Building

This project uses ES modules and is designed to run directly with Bun:

```bash
bun run index.ts
```

## Dependencies

- **[@iarna/toml](https://www.npmjs.com/package/@iarna/toml)**: TOML parser for configuration files
- **[source-map](https://www.npmjs.com/package/source-map)**: Core source map processing library for stack trace resolution
- **[yargs](https://www.npmjs.com/package/yargs)**: Command-line argument parsing

## Requirements

- Node.js-compatible runtime (Bun recommended)
- TypeScript ^5.0.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and not currently licensed for public distribution.

---

Built with ❤️ using [Bun](https://bun.sh) runtime.
