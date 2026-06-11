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

## PostgreSQL Database Setup

This project now includes a PostgreSQL database connection using the `pg` package. The database connection is managed through a connection pool, which allows the Express.js application to communicate with PostgreSQL efficiently.

The database connection module is located at:

```text
src/db.js
```

It uses the `DATABASE_URL` environment variable to connect to the PostgreSQL database.

## Environment Variable Configuration

Create a `.env` file in the project root and add the following variable:

```env
DATABASE_URL=your_postgresql_connection_string
```

The `.env` file stores private database credentials locally. It is included in `.gitignore` so sensitive information such as the database username, password, and host are not pushed to GitHub.

## Database Health Check Endpoint

A database health check endpoint was added to confirm that the Express application can successfully connect to PostgreSQL.

Endpoint:

```http
GET /api/db-health
```

This endpoint runs the following SQL query:

```sql
SELECT NOW();
```

If the connection is successful, the endpoint returns a JSON response containing a success message and the current PostgreSQL timestamp.

Example response:

```json
{
  "success": true,
  "message": "Database connection is healthy.",
  "databaseTime": "2026-06-10T08:37:09.934Z"
}
```


## Testing Instructions

Use Thunder Client or Postman to test all endpoints. The file `API_TESTING_GUIDE.md` includes success tests, validation failure tests, not found tests, and persistence verification steps.

## GitHub Repository

Repository link:

```text
https://github.com/Mudassir21-OS/backend-notes-api
```


## PostgreSQL CRUD Migration Update

This project was migrated from file-based JSON storage to PostgreSQL database storage. The API routes, validation rules, and response formats remain the same, but the storage layer now uses SQL queries instead of reading and writing to JSON files.

### Environment Variables

Create a `.env` file in the root project folder and add the following values:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

The `DATABASE_URL` value should contain the PostgreSQL connection string from Neon or another PostgreSQL provider. The real database URL should only be stored inside the `.env` file. The `.env` file should not be uploaded to GitHub because it contains private database credentials.

### Database Setup

Install the required PostgreSQL and environment variable packages:

```bash
npm install pg dotenv
```

Create the PostgreSQL `notes` table by running:

```bash
node setup-db.js
```

This setup script creates a `notes` table with the following fields:

- `id`
- `title`
- `content`
- `created_at`

### Running the Server

Start the backend server using:

```bash
node src/server.js
```

The server runs on:

```text
http://localhost:5000
```

The main notes API can be tested using:

```text
http://localhost:5000/notes
```

The database health check endpoint can be tested using:

```text
http://localhost:5000/api/db-health
```

### Migration from JSON Storage to PostgreSQL

The old implementation used JSON file storage through functions such as `loadNotes()`, `saveNotes()`, and `getNextId()`. These functions loaded notes from a local JSON file, generated the next note ID manually, and saved the updated notes back into the file.

The new implementation uses PostgreSQL through the `pg` package and the `pool.query(...)` method. This means the API now sends SQL queries directly to the PostgreSQL database instead of depending on a JSON file.

The CRUD operations now use SQL commands:

- `INSERT` is used to create a new note.
- `SELECT` is used to read all notes or one note by ID.
- `UPDATE` is used to modify an existing note.
- `DELETE` is used to remove a note.

Parameterized queries such as `$1`, `$2`, and `$3` are used to safely pass user input into SQL statements. This helps prevent SQL injection because user input is treated as data instead of executable SQL code.

### API Behavior

The API behavior remains the same after the migration. Successful create requests return `201 Created`, successful read, update, and delete requests return `200 OK`, validation errors return `400 Bad Request`, and requests for a note ID that does not exist return `404 Not Found`.

### Persistence Verification

Persistence was verified by creating three notes through the API, stopping the server, restarting it, and calling `GET /notes` again. The same notes were still available after the restart, proving that PostgreSQL is now the source of truth instead of temporary memory or JSON file storage.