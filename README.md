# Backend Foundation & First API Implementation

## Project Overview
This project is a small backend application built with Node.js and Express.js. It implements a simple Notes CRUD API that allows users to create, read, update, and delete notes.

## Technologies Used
- Node.js
- Express.js
- npm
- Thunder Client or Postman for API testing
- GitHub for version control

## Repository Structure
```text
backend-notes-api/
├── src/
│   ├── controllers/
│   │   └── notesController.js
│   ├── data/
│   │   └── notesStore.js
│   ├── routes/
│   │   └── notesRoutes.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions
1. Install Node.js.
2. Open the project folder in Visual Studio Code.
3. Open the terminal inside the project folder.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Open this URL in the browser:
   ```text
   http://localhost:3000
   ```

## API Endpoints

| Method | Endpoint | Purpose | Expected Status |
|---|---|---|---|
| GET | / | Checks if server is running | 200 |
| GET | /api/notes | Reads all notes | 200 |
| GET | /api/notes/:id | Reads a single note | 200 / 404 |
| POST | /api/notes | Creates a new note | 201 / 400 |
| PUT | /api/notes/:id | Updates an existing note | 200 / 400 / 404 |
| DELETE | /api/notes/:id | Deletes a note | 200 / 404 |

## Example JSON Body for POST and PUT
```json
{
  "title": "Backend task",
  "content": "Testing the Notes CRUD API using Thunder Client."
}
```

## Notes
This project uses an in-memory data store, so notes reset when the server restarts. This is intentional because the assignment focuses on backend foundation, Express routing, request handling, validation, status codes, testing, and documentation.
