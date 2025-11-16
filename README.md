# LaTeXdex

The free and open-source LaTeX database

## Table of Contents

1. [Getting Started](#getting-started)
    1. [Installation](#installation)
2. [Tech Stack](#tech-stack)
3. [License](#license)

## Getting Started

### Installation

[Drizzle | How to setup PostgreSQL locally](https://orm.drizzle.team/docs/guides/postgresql-local-setup)

#### 1. Pull the PostgreSQL image

```sh
docker pull postgres
```

#### 2. Start a Postgres instance

```sh
docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

#### 3. Configure database url

`.env`

```sh
# Drizzle ORM
DATABASE_URL=postgres://postgres:mypassword@localhost:5432/postgres
```

## Tech Stack

* Next.js
* Prisma + PostgreSQL
* Better Auth

## License

[MIT](LICENSE.txt)
