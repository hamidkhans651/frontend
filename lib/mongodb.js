// lib/mongodb.js

import mongoose from 'mongoose';

// Global variable to store the connection state.
// This prevents multiple connections in development mode.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection to the MongoDB database.
 * If a connection already exists, it returns the existing connection.
 * If a connection promise is pending, it waits for that promise to resolve.
 * Otherwise, it creates a new connection.
 * @returns {Promise<mongoose.Connection>} A promise that resolves to the Mongoose connection object.
 */
async function dbConnect() {
  // If a connection is already established, return it.
  if (cached.conn) {
    console.log('Using existing MongoDB connection.');
    return cached.conn;
  }

  // If a connection promise is pending, wait for it to resolve.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disables Mongoose's internal buffering.
      // You can add more options here if needed, e.g., useNewUrlParser, useUnifiedTopology
      // However, newer Mongoose versions often handle these by default.
    };

    // Get the MongoDB URI from environment variables.
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }

    // Create a new connection promise.
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB.');
      return mongoose;
    });
  }

  // Await the connection promise and store the connection object.
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, reset the promise to allow retries.
    cached.promise = null;
    console.error("MongoDB connection error:", e);
    throw e; // Re-throw the error to be caught by the API route.
  }

  return cached.conn;
}

export default dbConnect;
