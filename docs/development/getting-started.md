# Getting Started

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Angular CLI (v16 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/david-wagih/angular-domain-driven-app.git
cd angular-domain-driven-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## Development Tools

### Documentation

Generate and view documentation:
```bash
# Generate documentation
npm run docs:generate

# Serve documentation
npm run docs:serve
```

Documentation will be available at `http://localhost:8080`

### Dependency Graphs

Generate dependency graphs:
```bash
# Generate TypeScript dependency graph
npm run deps:graph

# Check for circular dependencies
npm run deps:circular

# Generate Angular-specific dependency graph
npm run ngd
```

### Code Quality

Run linting:
```bash
npm run lint
```

Run tests:
```bash
# Unit tests
npm run test

# End-to-end tests
npm run e2e
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

## Development Guidelines

1. **Domain-Driven Design**
   - Keep domain logic in the domain layer
   - Use interfaces for dependencies
   - Follow DDD patterns and practices

2. **Code Organization**
   - Follow the layered architecture
   - Keep components small and focused
   - Use feature modules for organization

3. **Testing**
   - Write unit tests for domain logic
   - Write integration tests for services
   - Write e2e tests for critical flows

4. **Documentation**
   - Document domain concepts
   - Keep technical documentation up-to-date
   - Use JSDoc comments for code documentation

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