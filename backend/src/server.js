import express from 'express';  //this will use if type is module in package.json
// const express = require('express');  this will use if type is commonjs in package.json
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config(); // Load environment variables from .env file
console.log(process.env.MONGO_URI); // to check if the environment variable is loaded correctly

const app = express();
const PORT = process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001
const __dirname = path.resolve(); // Get the current directory name

// Middleware to parse JSON bodies
app.use(express.json()); // this middleware will parse JSON bodies: req.body


if (process.env.NODE_ENV !== "production") {
    app.use(
    cors({
        origin: "http://localhost:5173",
    }));
}


// our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`req method is ${req.method} & req URL is ${req.url}`);
//     next();
// }) 
app.use(rateLimiter); // Apply the rate limiter middleware to all routes

// what is Endpoint ?
// An endpoint is a combination of a URL + HTTP method (GET, POST, PUT, DELETE, etc.) that  lets the client  interact with a specific resource.

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist"))); // Serve static files from the frontend build directory

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html")); // Serve the frontend's index.html for any other routes
});
}

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log("Server started on PORT :", PORT);
});
});



