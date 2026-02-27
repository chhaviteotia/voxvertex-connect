const express = require("express");
const cors = require("cors");
const dotenv=require('dotenv')
const mongoose=require ('mongoose')

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VoxVertex Connect API");
});

// Mock data for development (when MongoDB not available)
const mockUsers = [
  { _id: "1", name: "Test User", email: "test@example.com" }
];

app.get("/api/users", (req, res) => {
  res.json(mockUsers);
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port} (using MongoDB)`);
    });
  } catch (error) {
    console.warn("⚠️  MongoDB not available, using mock data");
    console.warn("MongoDB Error:", error.message);
    console.log("💡 To fix: Connect to a different network or contact your friend");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port} (MOCK DATA MODE)`);
    });
  }
};

connectDB();