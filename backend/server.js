//importing necessary modules
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

//creating express app and setting port to 5000
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//connecting to mongodb database
const uri = "mongodb+srv://atharvalotankar11:<dbPassword>@cluster0.p5bnole.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const dbName = "government_schemes";

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

//api route to filter relevant schemes
app.post("/api/schemes", async (req, res) => {
  try {
    const { name, age, location } = req.body;

    if (!name || !age || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = client.db(dbName);
    const schemesCollection = db.collection("schemes");

    const matchedSchemes = await schemesCollection.find({
    location: { $regex: new RegExp("^" + location + "$", "i") },
    minAge: { $lte: age },
    maxAge: { $gte: age }
    }).toArray();

    res.json({ name, schemes: matchedSchemes });
  } catch (err) {
    console.error("Error fetching schemes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//api route to get all schemes
app.get("/api/schemes/all", async (req, res) => {
  try {
    const db = client.db(dbName);
    const schemesCollection = db.collection("schemes");

    const allSchemes = await schemesCollection.find({}).toArray();
    res.json(allSchemes);
  } catch (err) {
    console.error("Error fetching all schemes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//to start the server
app.listen(PORT, function () {
  console.log("Server running at http://localhost:" + PORT);
});