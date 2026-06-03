# API Testing Guide

Use Thunder Client or Postman while the server is running on `http://localhost:3000`.

## 1. Server Check
Method: GET  
URL: `http://localhost:3000/`  
Expected status: 200

## 2. Read All Notes
Method: GET  
URL: `http://localhost:3000/api/notes`  
Expected status: 200

## 3. Read Single Note
Method: GET  
URL: `http://localhost:3000/api/notes/1`  
Expected status: 200

## 4. Create Note
Method: POST  
URL: `http://localhost:3000/api/notes`  
Body:
```json
{
  "title": "New note",
  "content": "This note was created through API testing."
}
```
Expected status: 201

## 5. Update Note
Method: PUT  
URL: `http://localhost:3000/api/notes/1`  
Body:
```json
{
  "title": "Updated note",
  "content": "This note was updated through API testing."
}
```
Expected status: 200

## 6. Delete Note
Method: DELETE  
URL: `http://localhost:3000/api/notes/1`  
Expected status: 200

## 7. Validation Test
Method: POST  
URL: `http://localhost:3000/api/notes`  
Body:
```json
{
  "title": "",
  "content": ""
}
```
Expected status: 400
