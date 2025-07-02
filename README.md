# Resolve Stack CLI

> **🤖 AI-Powered Development Project**  
> This project was created through **Vibe Coding** using **Gemini CLI + Claude 4** collaboration. The primary goal is to solve real-world problems while exploring the feasibility and capability boundaries of AI-assisted development workflows.

A lightweight, fast command-line tool for resolving JavaScript stack traces using source maps.

## Features

- 🚀 **Fast**: Built with Bun runtime for optimal performance
- 📁 **TOML Configuration**: Support for TOML-based configuration files
- 🛠️ **CLI Interface**: Easy-to-use command-line interface
- 📊 **Stack Trace Resolution**: Resolve minified stack traces to original source code locations
- ⚡ **TypeScript**: Written in TypeScript with full type safety

## Installation

### From npm (Recommended)

```bash
# Install globally to use as a CLI tool
npm install -g resolve-stack-cli
```

### Prerequisites

- Node.js >=16.0.0
- npm

### Alternative Installation Methods

<details>
<summary>For developers and contributors</summary>

#### From Source

```bash
# Clone the repository
git clone https://github.com/luxi78/resolve-stack-cli.git
cd resolve-stack-cli
bun install
bun install -g .
```

#### Development Installation

```bash
# For development purposes
git clone https://github.com/luxi78/resolve-stack-cli.git
cd resolve-stack-cli
bun install
```

**Development Prerequisites:**
- [Bun](https://bun.sh) runtime (latest version recommended)
- TypeScript ^5.0.0

</details>

## Usage

### Basic Usage

After installing via npm, use the tool directly:

```bash
resolve-stack [options]
```

### Getting Help

```bash
resolve-stack --help
```

### Command Line Options

The tool uses `yargs` for command-line argument parsing with the following options:

- `-c, --config`: Path to a TOML config file
- `--app-url-base`: The base URL of your deployed application  
- `--source-map-root`: The local root directory of your source maps
- `-h, --help`: Show help
- `--version`: Show version number

<details>
<summary>Development Usage</summary>

```bash
# If running from source:
bun run index.ts [options]
bun run index.ts --help
```

</details>

## Configuration

Resolve Stack CLI supports TOML configuration files for advanced usage scenarios. Create a configuration file in your project directory:

```toml
# example.toml
[sourcemap]
appUrlBase = "https://cdn.xuante.top:44300/cdns1.bangnimang.net/fapiao-ng"
sourceMapRoot = "out"
```

## Dependencies

- **[@iarna/toml](https://www.npmjs.com/package/@iarna/toml)**: TOML parser for configuration files
- **[source-map](https://www.npmjs.com/package/source-map)**: Core source map processing library for stack trace resolution
- **[yargs](https://www.npmjs.com/package/yargs)**: Command-line argument parsing

## License

MIT License

---

## For Developers and Contributors

<details>
<summary>Development Setup and Guidelines</summary>

### Development

#### Running the Development Version

```bash
bun run start
```

#### Building

This project uses ES modules and is designed to run directly with Bun:

```bash
bun run index.ts
```

#### Requirements

- Node.js-compatible runtime (Bun recommended)
- TypeScript ^5.0.0

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📦 NPM Publishing Guide

### Core Concepts

This is a TypeScript CLI project that compiles TS code to Node.js-compatible JavaScript through a build process, then publishes to npm. Users don't need to install bun or TypeScript to use the package.

### Project Configuration Essentials

#### Key package.json Fields

```json
{
  "name": "resolve-stack-cli",
  "version": "1.0.0",
  "description": "A lightweight, fast command-line tool for resolving JavaScript stack traces using source maps",
  "main": "dist/index.js",           // Points to compiled JS file
  "module": "dist/index.js",
  "type": "module",
  "bin": {
    "resolve-stack": "dist/index.js"  // CLI command entry point
  },
  "files": [                         // Files included in publication
    "dist/**/*",
    "README.md", 
    "package.json"
  ],
  "engines": {
    "node": ">=16.0.0"              // Node.js version requirement
  }
}
```

#### Build Script Configuration

```json
{
  "scripts": {
    "build": "bun build index.ts --outdir dist --target node --format esm",
    "prepublishOnly": "npm run build",  // Auto-build before publishing
    "test": "echo \"No tests specified\" && exit 0"
  }
}
```

### Pre-Publishing Checklist

#### 1. Complete Project Information

Update in `package.json`:

```json
{
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/resolve-stack-cli.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/resolve-stack-cli/issues"
  },
  "homepage": "https://github.com/yourusername/resolve-stack-cli#readme",
  "keywords": [
    "stack-trace",
    "source-map", 
    "cli",
    "debugging",
    "typescript",
    "javascript"
  ]
}
```

#### 2. Fix Entry Point

Ensure `index.ts` uses Node.js shebang:

```typescript
#!/usr/bin/env node
import { main } from './resolve-stack.js';

main().catch(console.error);
```

### Complete Publishing Process

#### 1. Register npm Account

```bash
# First-time registration
npm adduser

# Login with existing account
npm login

# Verify login status
npm whoami
```

#### 2. Check Package Name Availability

```bash
npm view resolve-stack-cli
# If shows 404 Not Found, the package name is available
```

#### 3. Pre-Build Verification

```bash
# Build project
npm run build

# Test build result
node dist/index.js --help

# Preview publication content
npm pack --dry-run
```

#### 4. Publish to npm

```bash
# Publish
npm publish

# Verify successful publication
npm view resolve-stack-cli
```

### Version Management

#### Manual Version Updates

```bash
# Modify version field in package.json
# Then republish
npm publish
```

#### Using npm Version Commands

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch && npm publish

# Minor version (1.0.0 → 1.1.0) 
npm version minor && npm publish

# Major version (1.0.0 → 2.0.0)
npm version major && npm publish
```

### Technical Details

#### TypeScript to JavaScript Conversion

- **Development Stage**: Use `bun` to run TypeScript directly
- **Build Stage**: `bun build` compiles TS to Node.js-compatible JS
- **Publishing Stage**: Only publish compiled JavaScript
- **User Usage**: Run through Node.js, no bun required

#### Build Output Characteristics

- Uses `#!/usr/bin/env node` shebang
- ES Module format
- All dependencies bundled in single file
- Node.js >=16.0.0 compatible

### User Installation Experience

```bash
# Global installation
npm install -g resolve-stack-cli

# Direct usage
resolve-stack --help
```

User system requirements:
- ✅ Node.js >=16.0.0
- ✅ npm
- ❌ No bun required
- ❌ No TypeScript required

### Troubleshooting

#### Common Issues

1. **Shebang errors**: Ensure built file uses `#!/usr/bin/env node`
2. **File permissions**: Built file should have execute permissions
3. **Import paths**: Ensure import statements use `.js` extensions
4. **Published files**: Check `files` field includes `dist/**/*`

#### Verification Steps

```bash
# Check build file type
file dist/index.js
# Should display: Node.js script executable

# Check shebang
head -1 dist/index.js  
# Should display: #!/usr/bin/env node

# Test CLI functionality
node dist/index.js --help
```

### Best Practices

1. **Pre-publish testing**: Always test built files locally
2. **Semantic versioning**: Follow [Semantic Versioning](https://semver.org/)
3. **Documentation integrity**: Keep README.md synchronized with features
4. **License clarity**: Choose appropriate open source license
5. **Keyword optimization**: Add relevant keywords for discoverability

</details>

---

Built with ❤️ using [Bun](https://bun.sh) runtime.
