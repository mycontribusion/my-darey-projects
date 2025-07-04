Node.js Express REST API (In-Memory CRUD)This project implements a simple RESTful API using Node.js and Express.js. It demonstrates basic CRUD (Create, Read, Update, Delete) operations on an in-memory data store. This serves as a foundational example for building backend services.

Table of ContentsFeaturesPrerequisitesSetup InstructionsAPI EndpointsData ModelError HandlingTesting with PostmanFeaturesBasic Express.js server setup.In-memory data storage (JavaScript array) for simplicity.Full CRUD operations for /items resource.Input validation for POST and PUT requests.Custom error handling for 404 Not Found and 500 Internal Server Errors.PrerequisitesBefore you begin, ensure you have the following installed on your machine:Node.js: Download & Install Node.js (includes npm)npm: Node Package Manager (comes with Node.js)Postman (or similar API client): Download Postman (recommended for testing)Setup InstructionsFollow these steps to get the API up and running on your local machine:Clone the Repository (or create project directory):If you have this code in a repository, clone it:git clone <repository-url>
cd <repository-name>

Otherwise, create a new directory and navigate into it:mkdir express-api-demo
cd express-api-demo

Create package.json:Initialize a new Node.js project. You can accept the default values by pressing Enter for each prompt.npm init -y

Install Dependencies:Install Express.js, the only required dependency for this project.npm install express

Create app.js:Create a file named app.js in the root of your project directory and paste the provided JavaScript code into it.Run the Server:Start the Express.js application.node app.js

You should see a message in your terminal indicating that the server is running on http://localhost:3000.API EndpointsThe API base URL is http://localhost:3000.| Method | Endpoint | Description | Request Body (JSON) | Response (JSON) | Status Codes || GET | / | Returns a "Hello, World!" message. | None | string | 200 OK || GET | /items | Retrieves all items. | None | array of item objects | 200 OK || GET | /items/:id | Retrieves a single item by ID. | None | object (item) or object ({ message: "Not found." }) | 200 OK, 404 Not Found || POST | /items | Creates a new item. | { "name": "string", "description": "string" } | object (newly created item with ID) or object ({ message: "Error." }) | 201 Created, 400 Bad Request || PUT | /items/:id | Updates an item by ID. | { "name"?: "string", "description"?: "string" } | object (updated item) or object ({ message: "Error." }) | 200 OK, 400 Bad Request, 404 Not Found || DELETE | /items/:id | Deletes an item by ID. | None | None | 204 No Content, 404 Not Found |Data ModelEach item object in the in-memory store has the following structure:{
  "id": "string",        // Unique identifier for the item
  "name": "string",      // Name of the item
  "description": "string" // Description of the item
}

Error HandlingThe API implements robust error handling:404 Not Found: Returned for requests to undefined routes (app.use((req, res, next) => { ... })).400 Bad Request: Returned when request bodies or parameters fail validation (e.g., missing required fields, invalid data types).500 Internal Server Error: A global error handler catches any unhandled exceptions that occur during request processing, providing a generic error message to the client while logging the full error stack on the server side.Meaningful error messages are provided in the JSON response body.Testing with PostmanHere are example requests you can use in Postman (or curl from your terminal) to test the API:1. GET / (Hello World)Method: GETURL: http://localhost:3000/Expected Response (200 OK):Hello, World! Welcome to the In-Memory REST API.

2. GET /items (Retrieve All Items)Method: GETURL: http://localhost:3000/itemsExpected Response (200 OK):[
  { "id": "1", "name": "Laptop", "description": "Powerful computing device" },
  { "id": "2", "name": "Smartphone", "description": "Mobile communication and entertainment" },
  { "id": "3", "name": "Headphones", "description": "Audio output device" }
]

3. GET /items/:id (Retrieve Item by ID)Method: GETURL: http://localhost:3000/items/1Expected Response (200 OK):{ "id": "1", "name": "Laptop", "description": "Powerful computing device" }

URL: http://localhost:3000/items/99 (for a non-existent ID)Expected Response (404 Not Found):{ "message": "Item with ID 99 not found." }

4. POST /items (Create New Item)Method: POSTURL: http://localhost:3000/itemsHeaders: Content-Type: application/jsonBody (raw JSON):{
  "name": "Keyboard",
  "description": "Mechanical keyboard for typing"
}

Expected Response (201 Created):{
  "name": "Keyboard",
  "description": "Mechanical keyboard for typing",
  "id": "4"
}

Body (Invalid - Missing name):{
  "description": "Another item"
}

Expected Response (400 Bad Request):{
  "message": "Item name is required and must be a non-empty string."
}

5. PUT /items/:id (Update Item by ID)Method: PUTURL: http://localhost:3000/items/1Headers: Content-Type: application/jsonBody (raw JSON):{
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop"
}

Expected Response (200 OK):{
  "id": "1",
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop"
}

URL: http://localhost:3000/items/99 (for a non-existent ID)Expected Response (404 Not Found):{ "message": "Item with ID 99 not found." }

Body (Invalid - Empty name):{
  "name": ""
}

Expected Response (400 Bad Request):{ "message": "Item name must be a non-empty string if provided." }

6. DELETE /items/:id (Delete Item by ID)Method: DELETEURL: http://localhost:3000/items/1Expected Response (204 No Content): (Empty response body)URL: http://localhost:3000/items/99 (for a non-existent ID)Expected Response (404 Not Found):{ "message": "Item with ID 99 not found for deletion." }

