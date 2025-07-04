// app.js - Main server file for the Express.js REST API

// Import the Express.js framework
const express = require('express');
// Create an instance of the Express application
const app = express();
// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// --- In-Memory Data Store ---
// This array will simulate a database.
// In a real application, this would be replaced by a database like PostgreSQL.
let items = [
    { id: '1', name: 'Laptop', description: 'Powerful computing device' },
    { id: '2', name: 'Smartphone', description: 'Mobile communication and entertainment' },
    { id: '3', name: 'Headphones', description: 'Audio output device' }
];

// Helper to generate unique IDs for new items (simple increment for demo)
let nextId = items.length > 0 ? Math.max(...items.map(item => parseInt(item.id))) + 1 : 1;

// --- Middleware ---
// Middleware to parse JSON bodies from incoming requests.
// This is essential for POST and PUT requests to read data sent in JSON format.
app.use(express.json());

// --- Helper Function for Data Validation ---
// This function validates if an item object has the required properties and correct types.
const validateItem = (item) => {
    if (!item || typeof item !== 'object') {
        return { isValid: false, message: 'Item data is missing or invalid.' };
    }
    if (typeof item.name !== 'string' || item.name.trim().length === 0) {
        return { isValid: false, message: 'Item name is required and must be a non-empty string.' };
    }
    if (typeof item.description !== 'string' || item.description.trim().length === 0) {
        return { isValid: false, message: 'Item description is required and must be a non-empty string.' };
    }
    return { isValid: true };
};

// --- API Routes (CRUD Operations) ---

/**
 * @route GET /
 * @description Root endpoint. Returns a simple "Hello, World!" message.
 */
app.get('/', (req, res) => {
    res.send('Hello, World! Welcome to the In-Memory REST API.');
});

/**
 * @route GET /items
 * @description Retrieves all items from the in-memory data store.
 */
app.get('/items', (req, res) => {
    console.log('GET /items - Retrieving all items');
    res.status(200).json(items);
});

/**
 * @route GET /items/:id
 * @description Retrieves a single item by its ID.
 * @param {string} id - The unique identifier of the item.
 */
app.get('/items/:id', (req, res) => {
    const { id } = req.params; // Extract ID from URL parameters
    console.log(`GET /items/${id} - Retrieving item by ID`);

    const item = items.find(i => i.id === id); // Find item in the array

    if (item) {
        res.status(200).json(item); // Return item if found
    } else {
        // Return 404 Not Found if item does not exist
        res.status(404).json({ message: `Item with ID ${id} not found.` });
    }
});

/**
 * @route POST /items
 * @description Creates a new item.
 * @body {string} name - The name of the item (required).
 * @body {string} description - The description of the item (required).
 */
app.post('/items', (req, res) => {
    const newItem = req.body; // Get the new item data from the request body
    console.log('POST /items - Creating new item:', newItem);

    // Validate incoming data
    const validation = validateItem(newItem);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message }); // 400 Bad Request
    }

    // Assign a new unique ID and add to the array
    newItem.id = String(nextId++); // Convert to string to match existing IDs
    items.push(newItem);

    // Return 201 Created status with the newly created item
    res.status(201).json(newItem);
});

/**
 * @route PUT /items/:id
 * @description Updates an existing item by its ID.
 * @param {string} id - The unique identifier of the item to update.
 * @body {string} name - The new name of the item (optional).
 * @body {string} description - The new description of the item (optional).
 */
app.put('/items/:id', (req, res) => {
    const { id } = req.params; // Get ID from URL
    const updatedData = req.body; // Get updated data from request body
    console.log(`PUT /items/${id} - Updating item with data:`, updatedData);

    // Find the index of the item
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex === -1) {
        // Return 404 Not Found if item does not exist
        return res.status(404).json({ message: `Item with ID ${id} not found.` });
    }

    // Validate incoming data for update (only if fields are present)
    if (updatedData.name !== undefined && (typeof updatedData.name !== 'string' || updatedData.name.trim().length === 0)) {
        return res.status(400).json({ message: 'Item name must be a non-empty string if provided.' });
    }
    if (updatedData.description !== undefined && (typeof updatedData.description !== 'string' || updatedData.description.trim().length === 0)) {
        return res.status(400).json({ message: 'Item description must be a non-empty string if provided.' });
    }

    // Update the item properties. Use Object.assign or spread to merge.
    items[itemIndex] = { ...items[itemIndex], ...updatedData };

    // Return 200 OK with the updated item
    res.status(200).json(items[itemIndex]);
});

/**
 * @route DELETE /items/:id
 * @description Deletes an item by its ID.
 * @param {string} id - The unique identifier of the item to delete.
 */
app.delete('/items/:id', (req, res) => {
    const { id } = req.params; // Get ID from URL
    console.log(`DELETE /items/${id} - Deleting item by ID`);

    // Filter out the item to be deleted
    const initialLength = items.length;
    items = items.filter(i => i.id !== id);

    if (items.length < initialLength) {
        // Return 204 No Content if deletion was successful
        res.status(204).send(); // No content to send back for successful deletion
    } else {
        // Return 404 Not Found if item was not found for deletion
        res.status(404).json({ message: `Item with ID ${id} not found for deletion.` });
    }
});

// --- Error Handling for Invalid Routes (404 Not Found) ---
// This middleware will catch any requests that don't match the above routes.
app.use((req, res, next) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// --- Global Error Handling Middleware (500 Internal Server Error) ---
// This catches any unhandled errors that occur during request processing.
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging purposes
    res.status(500).json({ message: 'Something went wrong on the server.', error: err.message });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('API Endpoints:');
    console.log('GET /items - Retrieve all items');
    console.log('GET /items/:id - Retrieve item by ID');
    console.log('POST /items - Create new item');
    console.log('PUT /items/:id - Update item by ID');
    console.log('DELETE /items/:id - Delete item by ID');
    console.log('---');
    console.log('Use Postman or curl to test these endpoints.');
});