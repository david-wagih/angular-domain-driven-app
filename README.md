# Angular Domain-Driven App

A modern Angular application built using Domain-Driven Design principles, showcasing best practices in architecture and development.

## Features

- Domain-Driven Design architecture
- Comprehensive documentation
- Dependency visualization
- Automated documentation generation
- Clean architecture implementation
- Type-safe development

## Documentation

This project uses several tools for documentation and dependency visualization:

1. **API Documentation**
   - Generated using Compodoc
   - Available at: [GitHub Pages](https://david-wagih.github.io/angular-domain-driven-app/)
   - Local access: `http://localhost:8080` (after running `npm run docs:serve`)

2. **Dependency Graphs**
   - Generated using Madge and NgD
   - Visual representation of module dependencies
   - Located in `documentation/dependencies`

3. **Architecture Documentation**
   - Located in `docs/architecture`
   - Covers domain model and technical architecture
   - Includes design decisions and patterns

## Quick Start

1. **Installation**
   ```bash
   git clone https://github.com/david-wagih/angular-domain-driven-app.git
   cd angular-domain-driven-app
   npm install
   ```

2. **Development Server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200`

3. **Documentation**
   ```bash
   # Generate documentation
   npm run docs:generate

   # Serve documentation
   npm run docs:serve
   ```

4. **Dependency Visualization**
   ```bash
   # Generate dependency graph
   npm run deps:graph

   # Check for circular dependencies
   npm run deps:circular
   ```

## Project Structure

```
angular-domain-driven-app/
├── src/
│   ├── app/
│   │   ├── domain/         # Domain models and interfaces
│   │   ├── application/    # Use cases and application services
│   │   ├── infrastructure/ # External services and implementations
│   │   └── presentation/   # UI components and pages
│   ├── assets/            # Static assets
│   └── environments/      # Environment configurations
├── docs/                  # Documentation
├── e2e/                  # End-to-end tests
└── README.md             # Project overview
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build production version
- `npm run test` - Run unit tests
- `npm run e2e` - Run end-to-end tests
- `npm run lint` - Run linting
- `npm run docs:generate` - Generate documentation
- `npm run docs:serve` - Serve documentation
- `npm run deps:graph` - Generate dependency graph
- `npm run deps:circular` - Check for circular dependencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

For detailed documentation, please see:
- [Architecture Overview](docs/architecture/overview.md)
- [Domain Model](docs/architecture/domain-model.md)
- [Getting Started Guide](docs/development/getting-started.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 