// app.js - Main server file for the Node.js API

// Import the Express.js framework
const express = require('express');
// Create an instance of the Express application
const app = express();
// Define the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// --- API Endpoints ---

/**
 * @route GET /
 * @description Basic root endpoint to confirm server is running.
 */
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Scalability Demo API!');
});

/**
 * @route GET /simulate-io/:delay
 * @description Simulates a non-blocking I/O operation (e.g., database query, external API call).
 * This demonstrates Node.js's ability to handle multiple concurrent requests
 * without blocking the event loop, even when one request takes time.
 * @param {number} delay - The delay in milliseconds to simulate the I/O operation.
 */
app.get('/simulate-io/:delay', (req, res) => {
    const delay = parseInt(req.params.delay, 10); // Get delay from URL parameter

    // Input validation: Ensure delay is a valid number and within reasonable bounds
    if (isNaN(delay) || delay < 0 || delay > 10000) {
        return res.status(400).json({ error: 'Invalid delay value. Please provide a number between 0 and 10000ms.' });
    }

    console.log(`[Request Received] Simulating non-blocking I/O for ${delay}ms...`);

    // Simulate a non-blocking I/O operation using setTimeout
    // Node.js queues this operation and immediately moves to the next request.
    // The main thread is NOT blocked.
    setTimeout(() => {
        console.log(`[Request Complete] Simulated I/O finished after ${delay}ms.`);
        res.status(200).json({
            message: `Non-blocking I/O simulation complete after ${delay}ms.`,
            timestamp: new Date().toISOString()
        });
    }, delay);
});

/**
 * @route GET /simulate-cpu/:iterations
 * @description Simulates a CPU-intensive, blocking operation.
 * This demonstrates the *limitation* of Node.js's single-threaded event loop.
 * While processing this request, the entire server might become unresponsive.
 * (Use with caution for demonstration purposes, do not deploy blocking code like this).
 * @param {number} iterations - The number of iterations for a dummy calculation.
 */
app.get('/simulate-cpu/:iterations', (req, res) => {
    const iterations = parseInt(req.params.iterations, 10);

    // Input validation for iterations
    if (isNaN(iterations) || iterations < 1 || iterations > 1000000000) {
        return res.status(400).json({ error: 'Invalid iterations value. Please provide a number between 1 and 1,000,000,000.' });
    }

    console.log(`[Request Received] Simulating blocking CPU-intensive work for ${iterations} iterations...`);

    // Simulate blocking CPU work: a synchronous loop
    // This blocks the single event loop, preventing other requests from being processed.
    let result = 0;
    for (let i = 0; i < iterations; i++) {
        result += Math.sqrt(i); // Dummy calculation to consume CPU
    }

    console.log(`[Request Complete] Blocking CPU work finished after ${iterations} iterations.`);
    res.status(200).json({
        message: `CPU-intensive simulation complete. Result: ${result}`,
        timestamp: new Date().toISOString()
    });
});


// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`--- Test Endpoints ---`);
    console.log(`Non-blocking I/O:   http://localhost:${PORT}/simulate-io/2000 (simulates 2-second delay)`);
    console.log(`Blocking CPU:       http://localhost:${PORT}/simulate-cpu/500000000 (simulates heavy CPU load)`);
    console.log(`Open multiple tabs for /simulate-io to see concurrency in action.`);
    console.log(`Then try /simulate-cpu and observe how other requests are delayed.`);
});

