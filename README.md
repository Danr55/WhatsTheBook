# WhatsTheBook

 book tracking app that allows users to search for books, save them to their personal collection, and manage their book collection with authentication. The app utilizes GraphQL for API communication and Apollo Client for state management on the frontend.

 ![WhatsTheBook](./Assets/Screenshot%202025-01-16%20at%207.39.50%20PM.png)

![WhatTheBook](./Assets/Screenshot%202025-01-16%20at%207.40.05%20PM.png)

![WhatTheBook](./Assets/Screenshot%202025-01-16%20at%207.40.14%20PM.png)

![WhatsTheBook](./Assets/WhatsTheBook.gif)

## Features

- **Sign Up**: Users can create an account and log in.
- **Book Search**: Users can search for books using the Google Books API.
- **Save Books**: Users can save books to their personal collection.
- **Remove Books**: Users can remove books from their collection.
- **User Authentication**: JWT-based authentication is used for secure logins.
  
## Technologies Used

- **Frontend**: React, Apollo Client, React Router, Bootstrap
- **Backend**: Node.js, Express.js, Apollo Server, GraphQL, JWT for authentication
- **Database**: MongoDB (optional, only if you plan to use a database)
- **State Management**: Apollo Client for state management

## structure

### Backend:
- **models/**: Contains Mongoose models (e.g., User).
- **controllers/**: Contains controller functions (e.g., user controller).
- **resolvers/**: Defines GraphQL resolvers.
- **schemas/**: Contains GraphQL schemas (typeDefs.js, resolvers.js).

### Frontend:
- **components/**: Contains React components like Navbar, BookSearch, SavedBooks, etc.
- **pages/**: Contains page components like SearchBooks, SavedBooks, etc.
- **utils/**: Contains helper files like mutations.js, queries.js, and auth.js.

## future improvements:

- Integrate a real database (e.g., MongoDB or PostgreSQL).
- Implement password hashing for secure user authentication.
- Add user profile management and update user information.
- Improve UI/UX with additional features (e.g., ratings, reviews).

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript

## Contact 

Oscar Rendon

Code sourced with help ChatGPT, Help from TA David Park.

- github Link:https://github.com/Danr55/WhatsTheBook 
- Deployed Link:https://whatsthebook-nxpv.onrender.com/

