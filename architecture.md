# E-commerce Project Architecture

## System Architecture

```mermaid
graph TD
    Client[Client] --> API[NestJS API]
    API --> Auth[Auth Module]
    API --> Users[Users Module]
    API --> Products[Products Module]
    API --> Orders[Orders Module]
    Orders --> OrderItems[Order Items Module]
    
    Auth --> DB[(PostgreSQL)]
    Users --> DB
    Products --> DB
    Orders --> DB
    OrderItems --> DB
```

## Database Schema

```mermaid
erDiagram
    USER {
        string id PK
        string email
        string telephone
        string username
        string password
        datetime created_at
        datetime updated_at
    }
    
    PRODUCT {
        string id PK
        string name
        string description
        decimal price
        int quantityInStock
    }
    
    ORDER {
        string id PK
        string user_id FK
        datetime created_at
        string status
    }
    
    ORDER_ITEM {
        string id PK
        string order_id FK
        string product_id FK
        int quantity
    }
    
    USER ||--o{ ORDER : places
    ORDER ||--o{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : included_in
```

## Module Structure

```
src/
├── auth/
│   ├── auth.controller.ts
│   └── auth.module.ts
├── users/
│   ├── dtos/
│   │   └── create-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   └── users.module.ts
├── products/
│   ├── dtos/
│   │   └── create-product.dto.ts
│   ├── entities/
│   │   └── product.entity.ts
│   ├── products.controller.ts
│   └── products.module.ts
├── orders/
│   ├── dtos/
│   │   └── create-order.dto.ts
│   ├── entities/
│   │   └── order.entity.ts
│   ├── order-items/
│   │   ├── dtos/
│   │   │   └── create-order-item.dto.ts
│   │   ├── entities/
│   │   │   └── order-item.entity.ts
│   │   ├── order-items.controller.ts
│   │   └── order-items.module.ts
│   ├── orders.controller.ts
│   └── orders.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Technology Stack

- **Backend Framework**: NestJS (Node.js)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: Zod with @anatine/zod-nestjs
- **Configuration**: @nestjs/config with dotenv
- **Development Tools**: ESLint, Prettier
- **Containerization**: Docker & Docker Compose

## Authentication Flow

```mermaid
sequenceDiagram
    Client->>API: Register/Login with credentials
    API->>Auth Service: Validate credentials
    Auth Service->>DB: Check user
    DB->>Auth Service: User data
    Auth Service->>API: Generate JWT
    API->>Client: Return JWT
    
    Client->>API: Request with JWT
    API->>Auth Service: Validate JWT
    Auth Service->>API: Token valid
    API->>Client: Return requested resource
```

## Order Creation Flow

```mermaid
sequenceDiagram
    Client->>API: Create order request
    API->>Orders Service: Process order
    Orders Service->>Products Service: Check inventory
    Products Service->>DB: Verify product availability
    DB->>Products Service: Product data
    Products Service->>Orders Service: Inventory status
    Orders Service->>DB: Create order
    Orders Service->>Order Items Service: Create order items
    Order Items Service->>DB: Save order items
    DB->>Orders Service: Confirmation
    Orders Service->>API: Order created
    API->>Client: Order confirmation
```