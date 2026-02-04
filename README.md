# JK Network Services Exam - UI/Frontend (Employee Management)

Welcome to the **JK Network Exam Employee Management UI**. This is a modern, responsive frontend built with **Next.js 15**, **React 19**, and **Tailwind CSS**, providing a clean and intuitive interface for managing employee records.

---

## Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v24.x or higher)
* **Git**
* **JK Network Exam API** (running locally - see API README)

---


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

---

## Project Architecture

This project follows Next.js 15 app router conventions with a clean, modular structure:

### Directory Structure

```
src/
├── app/                        # ROUTES
│   ├── layout.tsx
│   ├── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
│
├── common/                     # GLOBAL FILES/STYLES
│   ├── constants.ts
│   ├── globals.css
│   └── types.ts
│
├── components/                 # SHARED UI
│   ├── ui/
│   └── layout/
│
├── features/                   # BUSINESS LOGIC
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── records/
│       ├── components/
│       └── hooks/
│
└── hooks/                      # SHARED HOOKS
    └── useApi.ts
```

