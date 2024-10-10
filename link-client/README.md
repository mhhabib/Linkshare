# Link Sharing Frontend

This is the frontend part of a full-stack link-sharing application built using **React.js** and **Tailwind CSS**. The application allows users to create, update, delete, and reorder social media links. Users can also preview their profiles, copy their shareable profile link, and manage their profiles, with persistent authentication using **localStorage**.

## Features

- **Authentication**: Users can register, log in, and their sessions persist via `localStorage`.
- **Drag and Drop Links**: Allows users to reorder their links using drag-and-drop functionality.
- **Link Management**: Users can add, update, and delete social media links.
- **Profile Management**: Users can update their profile details.
- **Profile Preview**: Preview the user’s profile with all created links.
- **Clipboard Sharing**: Copy the shareable profile link to the clipboard.
- **Responsive Design**: Built with **Tailwind CSS** for a responsive user interface.

## Tech Stack

- **React.js**
- **Tailwind CSS**
- **Axios** for API requests
- **React Router** for routing
- **React Beautiful DnD** and **Dnd Kit** for drag-and-drop
- **React Toastify** for notifications

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v20.16.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/link-client.git
   cd link-client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

The application will run on `http://localhost:3000`.

### Scripts

- `npm start`: Runs the app in development mode.

### Authentication

The app uses **localStorage** for persistent authentication. When a user logs in, the JWT token is stored in localStorage and is used for all subsequent API requests to authenticate the user.

### Pages and Features

1. **Login and Registration**:

   - Users can register by filling in their details on the `/register` page.
   - Registered users can log in via the `/login` page, which stores the JWT token in localStorage for session persistence.

2. **Home Page** (`/`):

   - The main page is divided into two columns:
     - **First column**: Shows a live preview of the user's profile and links as they are updated.
     - **Second column**: Used conditionally for either link management (add, update, delete, and drag-and-drop) or profile management based on the user’s actions.

3. **Link Management**:

   - Users can add new social media links, update or delete existing links, and reorder them using drag-and-drop.
   - The links are updated in real-time and reflected in the profile preview.

4. **Profile Management**:

   - Users can update their profile information, including their display name and other details.
   - The second column of the page switches to a profile information form when the user chooses to update their profile.

5. **Profile Preview** (`/share`):

   - Users can preview their profile and links as it would appear to others.
   - There’s a **Share** button that copies the link to the clipboard, allowing the user to share their profile with others.

6. **Link Sharing** (`/users/:username`):
   - Users can view their profile via a shareable URL (e.g., `http://localhost:3000/users/username`).
   - This page displays all links associated with the user.
