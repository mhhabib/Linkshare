Here's a summarized README for the parent directory (`link-share`), linking to the individual README files for more detailed instructions:

---

# Link Sharing Application

This is a full-stack link-sharing application that allows users to manage and share social media links through a user-friendly interface. The project is split into two parts: the **backend (API)** and the **frontend (client)**. The backend handles user authentication, link management, and profile features, while the frontend provides a responsive user interface for users to interact with the API.

## Project Structure

```
Link-Share
├── link-api (Backend - Node.js and Express)
├── link-client (Frontend - React.js and Tailwind CSS)
├── .gitignore
└── readme.md (You are here)
```

## Features

- **User Authentication**: Secure JWT-based authentication with registration and login functionality.
- **Link Management**: Users can create, update, delete, and reorder their social media links.
- **Profile Management**: Users can upload profile pictures and manage their personal information.
- **Drag-and-Drop Functionality**: Reorder links easily using a drag-and-drop interface.
- **Profile Sharing**: Generate shareable profile links to showcase social media profiles.

## Tech Stack

- **Node.js** and **Express.js** for the backend API
- **MongoDB** as the database
- **JWT** for user authentication
- **React.js** and **Tailwind CSS** for the frontend
- **Axios** for API requests
- **Multer** for file uploads
- **React Beautiful DnD** and **Dnd Kit** for drag-and-drop
- **bcryptjs** for password hashing

## Installation

### Prerequisites

Before running this project, ensure that you have the following installed:

- **Node.js** (v20.16.0 or above)
- **MongoDB** running locally or available via a remote connection

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mhhabib/Linkshare.git
   cd Linkshare
   ```

2. **Setup the Backend (API)**:

   Navigate to the backend directory:

   ```bash
   cd link-api
   ```

   For detailed setup instructions for the backend, see the [Link Sharing API README](./link-api/readme.md).

3. **Setup the Frontend (Client)**:

   Navigate to the frontend directory:

   ```bash
   cd link-client
   ```

   For detailed setup instructions for the frontend, see the [Link Sharing Frontend README](./link-client/readme.md).

## Running the Application

1. **Backend**:

   Start the backend server by following the instructions in the [link-api README](./link-api/readme.md).

2. **Frontend**:

   Start the frontend development server by following the instructions in the [link-client README](./link-client/readme.md).

## Folder Structure

```
Link-Share
├── link-api                # Backend folder
│   ├── config/             # Configuration and controller files
│   ├── middlewares/        # Middleware for authentication
│   ├── models/             # Mongoose models (User, Link)
│   ├── routes/             # API routes
│   ├── uploads/            # Folder for profile image uploads
│   ├── .env                # Environment variables for the backend
│   ├── app.js              # Entry point of the backend app
│   └── package.json        # Backend dependencies
├── link-client             # Frontend folder
│   ├── public/             # Public assets for the frontend
│   ├── src/                # Source code of the React app
│   ├── .env                # Environment variables for the frontend
│   └── package.json        # Frontend dependencies
├── .gitignore              # Ignore rules for both link-api and link-client
└── readme.md               # Parent README
```

For more detailed instructions, please refer to the individual README files for the backend and frontend:

- [Link Sharing API README](./link-api/readme.md)
- [Link Sharing Frontend README](./link-client/readme.md)
