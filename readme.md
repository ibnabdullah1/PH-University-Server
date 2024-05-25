# PH University Management Project

## Introduction

This project is a university management system designed to handle authentication, profile management, academic processes, and user management for students, faculty, and administrators.

This PH University application is built with Node.js, Express, TypeScript, Mongoose, MongoDB, Zod, and Validator for validation. The application allows for managing users and academic processes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Express.js](https://expressjs.com/)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Monogoose](https://mongoosejs.com/docs/index.html)
- [ZOD](https://zod.dev/)

## Installation


1. **Clone the repository:**

   ```bash
   git clone https://github.com/ibnabdullah1/PH-University-Server.git
   cd PH-University-Server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file in the root directory and add the following environment variables:**

   ```env
   PORT=3000
   MONGODB_URI= (Your MongoDB URI)
   JWT_SECRET= (Your JWT secret key)
   ```

2. **Make sure MongoDB is running:**

   ```bash
   mongod
   ```

## Running the Application

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Access the application:**

   Open your browser and go to `http://localhost:3000`

## API Endpoints

### User

- `POST /users/create-student`
- `POST /users/create-faculty`
- `POST /users/create-admin`

### Student

- `GET /students`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`
- `GET /students/my-profile`

### Faculty

- `GET /faculties`
- `GET /faculties/:id`
- `PATCH /faculties/:id`
- `DELETE /faculties/:id`
- `GET /faculties/my-profile`

### Admin

- `GET /admins`
- `GET /admins/:id`
- `PATCH /admins/:id`
- `DELETE /admins/:id`
- `GET /admins/my-profile`

### Auth

- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /auth/change-password`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a Pull Request
