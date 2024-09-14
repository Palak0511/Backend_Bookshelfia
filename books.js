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

// Define a Mongoose schema with auto-incremented `id` field
const bookSchema = new mongoose.Schema({
  name: String,
  title: String,
  price: Number,
  category: String,
  image: String,
}, { timestamps: true });

// Add auto-incrementing id field to the schema
bookSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Book = mongoose.model('Book', bookSchema);

// Example JSON data to insert
import booksi from "./list.json" assert { type: 'json' };

//Filter data to remove _id
const booksData = booksi.map(({_id, ...rest}) => rest)

// Insert JSON data into the collection
Book.insertMany(booksData)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close(); // Close the connection after operation
  })
  .catch(err => console.error("Error inserting data:", err));
