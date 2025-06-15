import express from 'express';
import cors from 'cors'; // Import CORS
import connectDB from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for frontend (http://localhost:5173)
const corsOptions = {
  origin: "http://localhost:5173", // Allow only your frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions)); // Apply CORS settings

// Middleware to parse JSON requests
app.use(express.json());

// User routes
app.use('/api/user', userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
