# NestJS E-commerce API Project

Este projeto é uma Proof of Concept (POC) para uma API de e-commerce desenvolvida com NestJS, construída como ambiente de aprendizagem para aplicação de conceitos técnicos de desenvolvimento backend.

## 🚀 Visão Geral

Este projeto implementa uma API RESTful para um sistema de e-commerce com funcionalidades básicas de:
- Cadastro de usuários
- Gerenciamento de produtos
- Processamento de pedidos
- Geração de relatórios de vendas

O sistema foi desenvolvido utilizando tecnologias modernas como TypeScript, NestJS, TypeORM e PostgreSQL, seguindo boas práticas de desenvolvimento como injeção de dependências, validação de dados com Zod e arquitetura modular.

## 📋 Arquitetura

O projeto segue uma arquitetura modular baseada nos princípios do NestJS:

```
src/
├── users/           # Gerenciamento de usuários
├── products/        # Gerenciamento de produtos
├── orders/          # Processamento de pedidos
│   └── order-items/ # Itens de pedido
├── reports/         # Relatórios e análises
└── auth/            # Autenticação (a ser implementado)
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução
- **NestJS** - Framework backend
- **TypeScript** - Linguagem de programação tipada
- **PostgreSQL** - Banco de dados relacional
- **TypeORM** - ORM para comunicação com o banco de dados
- **Zod** - Validação de dados e tipagem
- **Docker** - Containerização do ambiente de desenvolvimento

## ⚙️ Como Executar

### Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- npm ou yarn

### Configuração Inicial

1. Clone o repositório:
```bash
git clone https://github.com/brenoalvesd/ecommerce-project.git
cd ecommerce-project
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

4. Configure as variáveis de ambiente copiando o arquivo `.env.example` para `.env` e ajuste conforme necessário.

5. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

### Populando o Banco de Dados

Para popular o banco com dados iniciais de teste:

```bash
npm run seed
# ou
ts-node src/seeds/seed.ts
```

## 🔍 Endpoints da API

A API oferece os seguintes endpoints principais:

- **Usuários**: `/users` - CRUD de usuários
- **Produtos**: `/products` - CRUD de produtos
- **Pedidos**: `/orders` - Processamento de pedidos
- **Relatórios**: `/reports/sales` - Geração de relatórios de vendas

Para testar os endpoints, você pode importar a coleção do Postman disponível no arquivo `postman-collection.json`.

## 📊 Recursos Implementados

- [x] Cadastro de usuários
- [x] Gerenciamento de produtos
- [x] Processamento de pedidos
- [x] Relatórios de vendas em CSV
- [ ] Autenticação e autorização
- [ ] 

## 🧪 Conceitos Técnicos Explorados

Este projeto foi construído como ambiente de aprendizado para aplicação dos seguintes conceitos:

- Arquitetura modular com NestJS
- Injeção de dependências
- ORM com TypeORM
- Containerização com Docker
- Desenvolvimento de Testes Automatizados com Jest
- Validação de dados com Zod
- Relacionamentos de entidades (One-to-Many, Many-to-One)
- Geração de relatórios

## 🔧 Considerações de Desenvolvimento

Este projeto é uma POC e ambiente de aprendizado, portanto:

- Alguns conceitos de segurança como autenticação não estão totalmente implementados
- Em um ambiente de produção, seria necessário adicionar mais testes e melhorar a segurança
- A aplicação está configurada para sincronização automática com o banco de dados (`synchronize: true`), o que deve ser desativado em produção