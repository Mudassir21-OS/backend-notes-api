# Backend Notes API

This project is an Express.js backend application for managing notes. It extends the original Notes API by adding a stronger validation layer and a JSON file persistence layer.

## Project Overview

The API supports Create, Read, Update, and Delete operations for notes. In the first version, notes were stored in memory, which meant all data was lost when the server restarted. This version stores notes in `src/data/notes.json`, so created and updated notes remain available after restarting the backend.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON file storage
- Thunder Client or Postman for API testing
- GitHub for version control

## Installation Instructions

Clone the repository:

```bash
git clone https://github.com/Mudassir21-OS/backend-notes-api.git
```

Open the project folder:

```bash
cd backend-notes-api
```

Install dependencies:

```bash
npm.cmd install
```

Start the server:

```bash
npm.cmd start
```

The server runs on:

```text
http://localhost:3000
```

## Project Structure

```text
backend-notes-api
├── src
│   ├── controllers
│   │   └── notesController.js
│   ├── data
│   │   └── notes.json
│   ├── middleware
│   │   └── errorHandler.js
│   ├── routes
│   │   └── notesRoutes.js
│   ├── storage
│   │   └── notes.storage.js
│   ├── validation
│   │   └── notes.validation.js
│   └── server.js
├── API_TESTING_GUIDE.md
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/notes` | Read all notes |
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes/:id` | Read one note by ID |
| PUT | `/api/notes/:id` | Update one note by ID |
| DELETE | `/api/notes/:id` | Delete one note by ID |

The same endpoints are also available using the shorter `/notes` path.

## Validation Rules

### Title

- Required
- Must be a string
- Minimum 3 characters
- Maximum 100 characters

### Content

- Required
- Must be a string
- Minimum 10 characters
- Maximum 5000 characters

### Unknown Fields

Unexpected fields are rejected. For example, a request containing `admin: true` will return a validation error.

### ID Validation

The note ID must be a positive integer. Invalid IDs such as `abc`, `0`, or `-1` return a 400 validation error.

## Error Format

Validation errors use this structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Specific validation message",
    "field": "field_name"
  }
}
```

## Persistence Layer

The storage module is located at:

```text
src/storage/notes.storage.js
```

It handles:

- Loading notes from the JSON file
- Saving notes to the JSON file
- Creating the storage file automatically
- Handling missing files gracefully
- Recovering from invalid JSON by creating a backup and starting with a clean array

## Testing Instructions

Use Thunder Client or Postman to test all endpoints. The file `API_TESTING_GUIDE.md` includes success tests, validation failure tests, not found tests, and persistence verification steps.

## GitHub Repository

Repository link:

```text
https://github.com/Mudassir21-OS/backend-notes-api
```
