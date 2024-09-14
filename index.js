import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

// Define the allowed origin
// const allowedOrigins = ['http://localhost:5173/**'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true // If you're using cookies or authentication
// };

// Apply CORS middleware
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = "mongodb+srv://palaksh0511:palak_2002@cluster0.jhszz7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// connect to mongoDB
mongoose.connect(URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// defining routes
app.use("/api", bookRoute);
app.use("/user", userRoute);
// app.use('/index', express.static('./index.html'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});