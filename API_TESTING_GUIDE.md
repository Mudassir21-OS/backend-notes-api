# API Testing Guide

Base URL: `http://localhost:3000/api/notes`

Use Thunder Client or Postman. Start the server first with `npm.cmd start`.

## Required Validation Test Cases

| # | Test | Method | URL | Body | Expected Status |
|---|------|--------|-----|------|-----------------|
| 1 | Read all notes | GET | `/api/notes` | none | 200 |
| 2 | Create valid note | POST | `/api/notes` | title and content valid | 201 |
| 3 | Read single valid note | GET | `/api/notes/1` | none | 200 |
| 4 | Update valid note | PUT | `/api/notes/1` | title and content valid | 200 |
| 5 | Delete valid note | DELETE | `/api/notes/1` | none | 200 |
| 6 | Missing title | POST | `/api/notes` | content only | 400 |
| 7 | Title too short | POST | `/api/notes` | title has 1-2 chars | 400 |
| 8 | Content too short | POST | `/api/notes` | content under 10 chars | 400 |
| 9 | Unknown admin field | POST | `/api/notes` | includes `admin: true` | 400 |
| 10 | Invalid ID | GET | `/api/notes/abc` | none | 400 |
| 11 | Not found ID | GET | `/api/notes/9999` | none | 404 |
| 12 | Persistence check | GET | `/api/notes` after restart | none | 200 |

## Sample Bodies

### Valid Create
```json
{
  "title": "Persistent Note",
  "content": "This note should remain available after the server restarts."
}
```

### Valid Update
```json
{
  "title": "Updated Persistent Note",
  "content": "This updated note should also be saved to the JSON file."
}
```

### Unknown Field Failure
```json
{
  "title": "Admin Field Test",
  "content": "This request should fail because it contains an unexpected field.",
  "admin": true
}
```

### Content Too Short Failure
```json
{
  "title": "Short Content",
  "content": "short"
}
```

## Persistence Verification

1. Create a valid note.
2. Stop the server with `CTRL + C`.
3. Restart the server with `npm.cmd start`.
4. Send `GET http://localhost:3000/api/notes`.
5. Confirm the created note is still available.
6. Open `src/data/notes.json` to show that the note is stored in the file.

## Edge Case Verification

### Missing Storage File
Delete `src/data/notes.json`, restart the server, then send `GET /api/notes`. The application should create the file automatically.

### Invalid JSON File
Change `src/data/notes.json` temporarily to invalid text such as `broken-json`, restart or send a request, and the storage module should recover by backing up the invalid file and creating a clean notes array.
