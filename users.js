// index.mjs

import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import dotenv from "dotenv";
dotenv.config();

const AutoIncrement = AutoIncrementFactory(mongoose);

// Replace with your actual connection string
const mongoURI = "mongodb+srv://palaksh0511:palak_2002@cluster0.jhszz7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema for Users
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String, // Store hashed passwords, ensure security practices are followed
}, { timestamps: true });

// Add auto-incrementing id field to the schema
userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema, 'users'); // Use 'users' as the collection name

// Import user data from JSON file
import usersi from "../bookStore.users.json" assert { type: 'json' };

// Filter data to remove _id
const usersData = usersi.map(({ _id, ...rest }) => rest);

// Insert JSON data into the collection
User.insertMany(usersData)
  .then(() => {
    console.log("User data inserted successfully");
    mongoose.connection.close(); // Close the connection after operation
  })
  .catch(err => console.error("Error inserting user data:", err));
