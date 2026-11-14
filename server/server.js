const dns = require("node:dns");
const path = require("node:path");

// Fix DNS resolution for MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Ensure .env is loaded from server directory regardless of current working directory
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Meat Shop API is running!");
});

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
