# simple_social A Social Media Web Application with None of the Fluff

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Simple Social Media Web Application is a basic social media platform that allows users to register, log in, create posts, and view posts by all users. The application includes user authentication, session management, and a responsive UI.

## Features

- User Registration and Login
- Create, View, and Scroll through Posts
- Responsive Design using Bootstrap
- Authentication with sessions and cookies
- Protected routes
- Dynamic rendering with Handlebars.js

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Handlebars.js
- Bootstrap
- EmailJS (for future email notifications)
- Render (for deployment)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/simple-social.git
   cd simple-social
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   SESSION_SECRET=your_session_secret
   DB_NAME=social_media_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_DIALECT=postgres
   ```

4. **Set up the database:**

   - Ensure PostgreSQL is installed and running.
   - Run the following command to create the database:

   ```bash
   npx sequelize db:create
   ```

5. **Seed the database:**

   ```bash
   node db/seed.js
   ```

6. **Start the server:**

   ```bash
   npm start
   ```

The application will be running on `http://localhost:3000`.

## Usage

1. **Register an account:**

   - Navigate to `http://localhost:3000/register` and fill out the registration form.

2. **Log in:**

   - Navigate to `http://localhost:3000/login` and enter your credentials.

3. **Create a post:**

   - Once logged in, use the form at the top of the homepage to create a new post.

4. **View posts:**

   - Scroll through the list of posts created by all users.

## Folder Structure

```plaintext
simple-social/
│
├── config/
│   └── connection.js
│
├── controllers/
│   ├── index.js
│   ├── homeRoutes.js
│   ├── postRoutes.js
│   └── userRoutes.js
│
├── db/
│   ├── schema.sql
│   └── seed.js
│
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── createPost.js
│       └── login.js
│
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── partials/
│   ├── homepage.handlebars
│   └── login.handlebars
│
├── .env
├── package.json
├── server.js
└── README.md
## API Endpoints

### User Routes

- **POST /users/register**
  - Register a new user
  - Request Body: `{ "username": "string", "email": "string", "password": "string" }`
  - Response: `{ "id": "number", "username": "string", "email": "string", "password": "hashed_string" }`

- **POST /users/login**
  - Log in an existing user
  - Request Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "user": { "id": "number", "username": "string", "email": "string" }, "message": "string" }`

- **POST /users/logout**
  - Log out the current user
  - Response: `204 No Content`

### Post Routes

- **GET /posts/all**
  - Get all posts
  - Response: Array of posts with user and comments included

- **POST /posts**
  - Create a new post
  - Request Body: `{ "title": "string", "body": "string", "image_url": "string" (optional) }`
  - Response: `{ "id": "number", "title": "string", "body": "string", "image_url": "string", "user_id": "number", "likes": "number", "created_at": "date" }`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
```
