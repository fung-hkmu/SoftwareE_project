const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const uri = "mongodb+srv://csci3100:chicker@cluster0.io5pa.mongodb.net/terry?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  mongoose.connection.db.listCollections().toArray(function (err, collections) {
    if (err) {
      console.log("Error getting collections:", err);
    } else {
      console.log("Available collections:", collections.map(c => c.name));
    }
  });
})
.catch((error) => console.error("Database connection error:", error));

// Routes
const userRoute = require("./route/userRoute");
app.use("/", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});