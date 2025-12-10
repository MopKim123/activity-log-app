# Student Activity Tracker Frontend

A Vue 3 + Vite frontend for managing student activity logs. Users can login, register, view, create, edit, and delete activity logs.  

---

## Features

- User authentication (login & registration)  
- View activity logs in a table with filtering by **type** and **date**  
- Create, edit, and delete activity logs  
- Responsive design for desktop and mobile  

---

## Tech Stack

- Vue 3  
- Vite  
- TypeScript  
- Pinia (state management)  
- Vue Router  
- Axios (API requests)  
- vue3-toastify (notifications)  

---

## Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <frontend-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables
Create a .env file at the root:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Replace the URL with your backend URL if different.

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview production build

```bash
npm run preview
```

---

## Folder Structure

```bash
src/
├─ assets/        # Images, icons, and styles
├─ components/    # Reusable components (modals, navbar)
├─ router/        # Vue Router configuration
├─ store/         # Pinia stores
├─ service/       # API service functions
├─ types/         # TypeScript interfaces/types
└─ views/         # Page components
```

---

## Usage
- Start the backend API.
- Run the frontend development server.
- Register a new user or login.
- Manage activities through the dashboard.

---

## Notes
- Ensure CORS is configured properly on the backend for local development.
- Notifications appear using vue3-toastify.
- The frontend expects the backend endpoints to match the following paths:
    - /users/login (POST)
    - /users/register (POST)
    - /activities (GET, POST, PUT, DELETE)
    - /activity-types (GET)
