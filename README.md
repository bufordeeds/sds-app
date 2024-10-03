# Service Dog Standards (SDS) Project

This project consists of a Vue.js frontend application and a Node.js backend API for the Service Dog Standards platform.

## Project Structure

The project is divided into two main parts:

1. `sds/ `- Frontend Vue.js application
2. `sds-api/` - Backend Node.js API

### Frontend (sds/)

The frontend is a Vue.js application with the following key features:

-   Vue Router for navigation
-   Vuex for state management
-   Vuetify for UI components
-   Storybook for component development and documentation
-   SCSS for styling

#### Key directories:

-   src/components/ - Vue components
-   src/views/ - Vue views/pages
-   src/router/ - Route definitions
-   src/store/ - Vuex store
-   src/assets/ - Static assets (images, fonts, etc.)

### Backend (sds-api/)

The backend is a Node.js API with the following features:

-   Express.js for handling HTTP requests
-   MongoDB for data storage
-   JWT for authentication
-   Pino for logging

#### Key directories:

-   `lib/handlers/` - Request handlers
-   `lib/db/` - Database connection and models
-   `lib/middleware/` - Express middleware
-   `lib/utilities/` - Utility functions and helpers

### Getting Started

#### Prerequisites

-   Node.js (v14+ recommended)
-   MongoDB
-   Vue CLI

#### Installation

1. Clone the repository

```code
git clone https://github.com/bufordeeds/sds-app.git
```

2. Install frontend dependencies:

```code
cd sds
npm install
```

3. Install backend dependencies:

```code
cd ../sds-api
npm install
```

#### Running the application

1. Start the backend server:

```code
cd sds-api
npm start
```

2. In a new terminal, start the frontend development server:

```code
cd sds
npm run serve
```

The application should now be running at `http://localhost:5300` (frontend) and `http://localhost:5301` (backend API).
Development

Use `npm run build` in the sds/ directory to build the frontend for production

The backend uses nodemon for auto-restarting during development
