# Link Sharing API

This is the backend of a full-stack link-sharing application built using **Node.js** and **Express.js**, with **MongoDB** as the database. It provides endpoints for user authentication, link management, and profile handling with **JWT-based authentication** and **Multer** for image uploads.

## Features

- User registration and login with **JWT authentication**.
- Create, update, delete, and reorder social media links.
- User profile management with image uploads.
- Fetch user profiles and links by username.
- Secure API using **bcryptjs** for password hashing and **jsonwebtoken** for authentication.

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **dotenv** for environment variables

## Getting Started

### Prerequisites

To run this project, you'll need to have the following installed:

- **Node.js** (v20.16.0)
- **Mongoose** (v8.7.0 or above)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mhhabib/Linkshare.git
   cd Linkshare && cd link-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```bash
   MONGO_URI=your_mongodb_connection_url
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```

4. Start the MongoDB server locally:

   ```bash
   mongod
   ```

5. Run the server:

   - For production:

     ```bash
     npm start
     ```

   - For development (with **nodemon**):

     ```bash
     npm run dev
     ```

The server will be running on `http://localhost:8000`.

### Folder Structure

```
link-api
├── config
│   ├── authController.js
│   ├── linkController.js
│   └── userController.js
├── middlewares
│   └── authMiddleware.js
├── models
│   ├── Link.js
│   └── User.js
├── routes
│   ├── authRoutes.js
│   ├── linkRoutes.js
│   └── userRoutes.js
├── uploads/
├── .env
├── app.js
└── package.json
```

### API Endpoints

#### Auth Routes

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login with username and password to receive a JWT token.
- **PUT /api/auth/profile**: Update user profile (requires JWT token).
- **GET /api/auth/profile**: Get user profile (requires JWT token).

#### Link Routes

- **POST /api/links**: Create a new link (requires JWT token).
- **GET /api/links**: Get all links for the authenticated user (requires JWT token).
- **PUT /api/links/:linkId**: Update a specific link by ID (requires JWT token).
- **DELETE /api/links/:linkId**: Delete a specific link by ID (requires JWT token).
- **PUT /api/links/reorder**: Reorder links for the authenticated user (requires JWT token).

#### User Routes

- **GET /api/users/profile**: Get the user's profile with all associated links (requires JWT token).
- **GET /api/users/:username**: Get the public profile and links by username.

### Environment Variables

The application relies on the following environment variables:

- `MONGO_URI`: The MongoDB connection string.
- `JWT_SECRET`: The secret key for signing JWT tokens.
- `PORT`: The port number to run the server (default is 8000).

### Security

- Passwords are hashed using **bcryptjs**.
- User authentication is handled using **JWT**.
- Image uploads are secured using **Multer**.
- **CORS** is enabled to allow cross-origin requests from the frontend.
