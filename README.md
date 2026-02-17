# ChopChop

The Digital Cookbook (Adolfo was here)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Install dependencies:

```bash
bun install
bun run docs:agents #installs next.js docs for ai agents
```

2. Set up .env

```bash
cp .env.example .env
```

> You will need to replace any placeholder values with real api tokens

3. Set up the database:

```bash
bun run db:migrate
```

4. Start the development server:

```bash
bun run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Available Commands

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `bun run dev`         | Start the development server         |
| `bun run lint`        | Run ESLint                           |
| `bun run format`      | Format code with Prettier            |
| `bun run db:generate` | Generate database migrations         |
| `bun run db:migrate`  | Apply database migrations            |
| `bun run db:push`     | Sync schema directly to the database |
| `bun run db:studio`   | Open Drizzle Studio to view database |
