<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## Description

This is a Client Gateway application for a NestJS Microservices architecture. It serves as an API Gateway that routes client requests to the appropriate microservices using NATS as the transport layer.

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications
- **Language**: TypeScript
- **Message Broker**: [NATS](https://nats.io/) - A simple, secure and high performance messaging system
- **Validation**: class-validator, class-transformer, Joi
- **Configuration**: @nestjs/config, dotenv

## Project Structure

```
├── src/
│   ├── app.module.ts         # Main application module
│   ├── main.ts               # Application entry point
│   ├── common/               # Common utilities and DTOs
│   │   ├── dto/              
│   │   │   └── pagination.dto.ts
│   │   └── exceptions/
│   │       └── rpc-exception.filter.ts
│   ├── config/               # Configuration
│   │   ├── env.ts            # Environment variables
│   │   ├── index.ts
│   │   └── services.ts       # Service constants
│   ├── orders/               # Orders module
│   │   ├── orders.controller.ts
│   │   ├── orders.module.ts
│   │   ├── dto/
│   │   ├── entities/
│   │   └── enum/
│   ├── products/             # Products module
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   ├── dto/
│   │   └── entities/
│   └── transports/           # Transport modules
│       └── nats.module.ts    # NATS client configuration
├── test/                     # End-to-end tests
├── dockerfile                # Docker configuration
├── nest-cli.json             # NestJS CLI configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Architecture

This client gateway is part of a microservices architecture using NestJS. It acts as an API Gateway that routes client requests to the appropriate microservices using NATS as the message broker.

```
┌─────────────┐         ┌──────────────────────────┐         ┌────────────────────┐
│             │         │                          │         │                    │
│   Clients   │ ───────▶│   Client API Gateway     │ ───────▶│  NATS Message Bus  │
│             │         │                          │         │                    │
└─────────────┘         └──────────────────────────┘         └────────────────────┘
                                                                       │
                                                                       │
                         ┌────────────────────────────────────────────┐│
                         │                                             ▼
                ┌────────────────────┐                    ┌────────────────────┐
                │                    │                    │                    │
                │  Products Service  │◀──────────────────▶│   Orders Service   │
                │                    │                    │                    │
                └────────────────────┘                    └────────────────────┘
```

### Microservices Communication

The gateway handles HTTP requests from clients and communicates with microservices using NATS message patterns:

1. **Products Service** - Handles product-related operations
2. **Orders Service** - Manages order processing and status updates

Each service can emit events that other services can subscribe to, enabling loosely coupled communication.

## Installation and Setup

```bash
# Install dependencies
$ npm install
```

## Running the Application

```bash
# Development mode
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## Setting up NATS

NATS is required for communication between the gateway and microservices:

```bash
# Run NATS server with Docker
$ docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```

NATS port usage:
- 4222: Client connections
- 8222: HTTP management port for monitoring
- 6222: Clustering port (not exposed in the above command)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NATS_SERVERS=nats://localhost:4222
```

## Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## API Endpoints

### Products

- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PATCH /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders

- `GET /api/orders` - Get all orders with pagination
- `GET /api/orders/:id` - Get a specific order
- `POST /api/orders` - Create a new order
- `PATCH /api/orders/:id` - Update an order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete an order

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
