# 🚀 AI Learning Assistant

> An AI-powered learning engine built with **Next.js 16, Server Actions, Prisma, PostgreSQL, Docker, and Vitest**.
> Designed with domain-driven architecture and production-grade environment separation.

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Core Features (v1)](#-core-features-v1)
- [Application Flow](#-application-flow)
- [Architecture Philosophy](#-architecture-philosophy)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Docker Environments](#-docker-environments)
- [Environment Variables](#-environment-variables)
- [Prisma Workflow](#-prisma-workflow)
- [Testing (Vitest)](#-testing-vitest)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Product Roadmap](#-product-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

# 📖 Project Overview

AI Learning Assistant is a structured AI learning system where users:

1. Paste content
2. Select a difficulty level
3. Generate a structured explanation
4. Ask grounded follow-up questions

The application is intentionally designed using:

- Clear domain boundaries
- Server Actions as application layer
- Explicit mutation flows
- Containerized infrastructure
- Isolated dev and production environments

This project demonstrates production-ready thinking, not just UI rendering.

---

# 🌍 Live Demo

> TODO: Add deployed URL
> TODO: Add screenshots or demo GIF

---

# ✨ Core Features (v1)

- Paste text content
- Generate:
  - Simplified explanation
  - “Explain like I’m 5”
  - Key takeaways

- Ask follow-up questions grounded in a Lesson
- Persistent lesson storage
- Clean, minimal UI
- Fully containerized environments

---

# 🔁 Application Flow

## 🧠 Full Flow: “Teach Me”

### 1️⃣ UI (Client)

- User pastes content
- Selects difficulty level
- Clicks **Teach Me**
- `<form>` submits to a Server Action

---

### 2️⃣ Server Action (Application Layer)

Responsibilities:

- Receives `FormData`
- Extracts `prompt` and `level`
- Calls domain mutation: `createLesson(request)`
- Calls `revalidatePath(...)` to refresh UI

The Server Action acts as glue — it does not contain business logic.

---

### 3️⃣ Domain Mutation

`src/lib/learning/mutations.ts`

Responsibilities:

- Validate request
- Call AI function `generateExplanation(request)`
- Construct a `Lesson` entity:
  - `id`
  - `title`
  - `originalPrompt`
  - `explanation`
  - `level`
  - `createdAt`

- Persist to database
- Return created Lesson

---

### 4️⃣ AI Layer

`src/lib/learning/ai.ts`

- Calls external AI API
- Returns explanation text only
- Contains no persistence logic

---

### 5️⃣ UI Revalidation

Because the route is revalidated:

- The page re-runs
- Lessons are queried again
- Updated list is rendered

Clean, predictable data flow.

---

## 💬 Follow-up Question Flow

When a user asks a follow-up:

1. Save user message
2. Generate AI response grounded in selected Lesson
3. Save assistant message
4. Revalidate route
5. UI updates automatically

---

# 🧱 Architecture Philosophy

This app follows a lightweight domain-driven structure:

| Layer                   | Responsibility              |
| ----------------------- | --------------------------- |
| UI                      | Rendering & form submission |
| Server Actions          | Application orchestration   |
| Domain (`lib/learning`) | Business logic              |
| AI Module               | External API interaction    |
| Prisma                  | Persistence                 |

Principles:

- No business logic in UI
- No DB logic in AI module
- Server Actions = orchestration only
- Mutations are explicit
- Side effects are controlled

This keeps the system testable and scalable.

---

# 🧰 Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Framework        | Next.js 16 (App Router) |
| Language         | TypeScript              |
| ORM              | Prisma                  |
| Database         | PostgreSQL              |
| Testing          | Vitest                  |
| Containerization | Docker                  |
| CI               | GitHub Actions          |

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/learnwithalfred/ai-learning-assistant.git
cd ai-learning-assistant
```

---

# 🐳 Docker Environments

Two completely separate environments run in parallel.

| Environment           | URL                                            | DB Port |
| --------------------- | ---------------------------------------------- | ------- |
| Development           | [http://localhost:3001](http://localhost:3001) | 5434    |
| Production Simulation | [http://localhost:3000](http://localhost:3000) | 5433    |

---

## 🧪 Development

```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop:

```bash
docker compose -f docker-compose.dev.yml down
```

---

## 🏭 Production Simulation

```bash
docker compose up --build
```

Stop:

```bash
docker compose down
```

---

# 🔐 Environment Variables

Create `.env.local`:

```env
OPENAI_API_KEY=<your-key>
DATABASE_URL="postgresql://postgres:password@localhost:5434/ai_app_dev"
```

> ⚠️ Do not commit secrets

```
OPENAI_API_KEY=
DATABASE_URL=
```

---

# Development Setup

## 1. Install Dependencies

```bash
npm install
npx prisma generate
```

---

## 2. Local Development (Recommended)

Start database:

```bash
docker compose -f docker-compose.dev.yml up dev_db -d
```

Run migrations:

```bash
npx prisma migrate dev
```

Start dev server:

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 3. Full Docker Development

Run app + database:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop:

```bash
docker compose -f docker-compose.dev.yml down
```

---

## 4. Reset Database

```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up dev_db -d
npx prisma migrate dev
```

---

# 🧪 Testing (Vitest)

This project uses **Vitest** for unit and domain testing.

Run locally:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Inside container:

```bash
docker exec -it ai_app
npm run test
```

## Testing Strategy

- Domain mutations tested in isolation
- AI module mocked
- Database interactions validated
- Edge cases covered (invalid input, empty prompt, etc.)

> TODO: Add coverage badge
> TODO: Add example test snippet

---

# 📁 Project Structure

```
.
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
├── src/
│   ├── app/              → Next.js routes
│   ├── lib/
│   │   └── learning/
│   │       ├── mutations.ts
│   │       ├── ai.ts
│   ├── components/
│   └── tests/
├── docker-compose.yml
├── docker-compose.dev.yml
├── Dockerfile
└── README.md
```

---

# 🛠 Troubleshooting

### ❌ P1001: Can't reach database

Use Docker service name (`ai_db`, `ai_db_dev`).

### ❌ Port already allocated

```bash
docker compose down --remove-orphans
```

### ❌ Migrations missing

Ensure `prisma/` is copied in Dockerfile.

---

# 🗺 Product Roadmap

Only **v1** is implemented.

---

## ✅ v1 – Core Learning Engine (Implemented)

- Paste text
- Generate explanations
- Follow-up Q&A
- Domain-driven structure
- Server Actions + AI integration

---

## 🔜 v2 – Knowledge History

- View past lessons
- Delete / edit lessons
- Search

---

## 🔜 v3 – Quiz System

- Generate quizzes
- Score answers
- Track correctness

---

## 🔜 v4 – Learning Progress

- Streaks
- Completion tracking
- Weak area detection

---

## 🔜 v5 – Smart Search

- Semantic search (embeddings)
- Query past learning context

---

## 🔜 v6 – File Upload

- PDF / DOC upload
- Extract content
- Generate lessons from files

---

## 🔜 v7 – Audio Learning

- Convert explanations to audio
- Hands-free learning

---

## 🔜 v8 – Visual Learning

- Generate diagrams
- Concept illustrations

---

## 🔜 v9 – Sharing & Collaboration

- Public lessons
- Shareable links
- Community learning

---

## 🔜 v10 – Personal AI Teacher

- Personalized learning plans
- Adaptive difficulty
- Weakness memory
- Smart recommendations

---

# 🤝 Contributing

> TODO: Add contribution guidelines
> TODO: Define branch naming conventions

---

# 📜 License

> TODO: Add LICENSE file
