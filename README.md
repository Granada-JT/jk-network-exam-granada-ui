# JK Network Services Exam - UI/Frontend (Employee Management)

Welcome to the **JK Network Exam Employee Management UI**. This is a modern, responsive frontend built with **Next.js 15**, **React 19**, and **Tailwind CSS**, providing a clean and intuitive interface for managing employee records.

---

## Prerequisites

Before you begin, ensure you have the following installed and running:
* **Node.js** (v24.x or higher)
* **Git**
* **JK Network Exam API** (running locally - see API README)

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

## Quick Start Guide

Follow these steps exactly to get your development environment running.

### 1. Unzip & Install
```bash
1. clone the project via `https` or `ssh`
2. ensure you are on the root folder of the project
3. npm install
```

### 2. Environment Configuration
The application relies on the API endpoint for backend communication.

  1. Locate the `.env.example` file in the root directory.

  2. Create a new file named `.env`.

  3. Add your API endpoint configuration.

### Example `.env` structure:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run the Development Server
Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port if 3000 is in use).

---

### Key Components

#### Pages
- **Home (`page.tsx`)**: Landing page with navigation to login/register
- **Login (`app/login/page.tsx`)**: User authentication interface
- **Register (`app/register/page.tsx`)**: New user registration
- **Dashboard (`app/dashboard/page.tsx`)**: Main employee records management interface

#### Core Components
- **`PageContent.tsx`**: Full-screen layout wrapper with centered content
- **`FormLayout.tsx`**: Reusable form container with navigation and error handling
- **`AccountDetailsForm.tsx`**: Employee details form with image upload
- **`RecordsTable.tsx`**: Advanced data table with search, sort, pagination, and CRUD operations
- **`LoginForm.tsx`**: Login form with email/password authentication

#### Custom Hooks
- **`useApi`**: Centralized API communication with error handling
- **`useForm`**: Form state management, validation, and submission
- **`useRecordsTable`**: Table state, filtering, sorting, and pagination logic

---

## Features

### Authentication
- Email/password login
- New user registration

### Employee Management
- **Create**: Add new employee records with optional photo upload
- **Read**: View all employees in a paginated, searchable table
- **Update**: Edit employee details including profile information
- **Delete**: Remove employees with confirmation step

### Table Features
- **Search**: Real-time filtering across all fields
- **Sort**: Click column headers to sort by name or email
- **Pagination**: Configurable page size (5, 10, 20, 50 entries)
- **Profile Management**: Quick access to edit your own profile

### User Experience
- Form validation and reset functionality
- Modal-based editing interface
- Confirmation step for destructive actions

---

## Important Notes

1. **API Dependency**: This frontend requires the BPIMS API to be running. Ensure the API is started before launching the UI.

2. **Port Configuration**: By default, Next.js runs on port 3000. If your API also uses port 3000, the UI will automatically use the next available port.

3. **Image Uploads**: Employee photos are converted to base64 and stored in the database. Large images may impact performance.

4. **TypeScript**: This project uses TypeScript for type safety. Type definitions are located in `src/common/types.ts`.

---

### Author: 

```bash
Jomar Granada
```

### License:
```bash
ISC
```
