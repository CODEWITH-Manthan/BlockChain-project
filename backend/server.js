const express = require("express");
const cors = require("cors");
const contractRoutes = require("./routes/contractRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Main route
app.get("/", (req, res) => {
  res.send("API Running for Blockchain Procurement System");
});

// Use contract routes
app.use("/api/contract", contractRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
