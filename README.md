# Blog App — React + Express
A full-stack **blog application** built with:

- 🔧 **React** (frontend)
- 🚀 **Express.js** (backend)
- 🗃️ **MongoDB** (database)
- 🌐 **Vite** (development server for frontend)

Users can register, log in, create posts, and interact with blog content in a responsive UI.

---

## 📌 Features

- 🔐 User authentication (login/register)
- 📝 Create, edit, delete blog posts
- 📄 View post details
- ❤️ Like/dislike posts
- 🧑‍💼 Profile management
- 🌙 Clean and modern UI with **Flowbite + Tailwind CSS**

---

## 🚀 Technologies Used

| Stack       | Tech                           |
|-------------|--------------------------------|
| Frontend    | React, Vite, TypeScript, Tailwind CSS, Flowbite |
| Backend     | Node.js, Express.js, JWT, bcrypt |
| Database    | MongoDB with Mongoose          |
| Tooling     | React Query, Axios, Dotenv     |

---

## 📦 Tech Stack & Version Info

> ⚠️ Node version used: **v22.12.0**

### 🖥 Frontend (`/frontend`)

| Package                   | Version     |
|---------------------------|-------------|
| React                     | ^19.1.0     |
| React DOM                 | ^19.1.0     |
| React Router DOM          | ^7.7.1      |
| React Icons               | ^5.5.0      |
| Vite                      | ^7.0.4      |
| Tailwind CSS              | ^4.1.11     |
| Flowbite                  | ^3.1.2      |
| Flowbite React            | ^0.12.6     |
| Axios                     | ^1.11.0     |
| TanStack React Query      | ^5.84.1     |
| TypeScript                | ~5.8.3      |
| ESLint                    | ^9.30.1     |

### 🔧 Backend (`/backend`)

| Package             | Version     |
|---------------------|-------------|
| Express             | ^5.1.0      |
| Mongoose            | ^8.17.0     |
| JSON Web Token      | ^9.0.2      |
| BcryptJS            | ^3.0.2      |
| CORS                | ^2.8.5      |
| Express Rate Limit  | ^8.0.1      |
| Dotenv              | ^17.2.1     |

---

## 📦 Installation

### 1. Clone the repository

- git clone https://github.com/Seikixo/Blog-App.git
- cd Blog-App

### 2. Backend .env
- PORT=
- MONGO_URI=

### 3. Install dependencies
- cd backend
- npm install

- cd ../fronted
- npm install

### 4. Running the App

- cd backend
- node server.js
- Runs on http://localhost:8000

- cd frontend
- npm run dev
- Runs on http://localhost:5173