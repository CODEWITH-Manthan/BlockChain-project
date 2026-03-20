const express = require("express");
const router = express.Router();
const { contract } = require("../utils/blockchain");

// Add a milestone to the smart contract
router.post("/add-milestone", async (req, res) => {
  try {
    const { desc, amount } = req.body;
    
    if(!contract) {
        return res.status(500).json({ error: "Contract instance not initialized" });
    }

    const tx = await contract.addMilestone(desc, amount);
    await tx.wait();
    res.status(200).json({ message: "Milestone added successfully", hash: tx.hash });
  } catch (error) {
    console.error("Error adding milestone", error);
    res.status(500).json({ error: error.message });
  }
});

// Further endpoints: approve-milestone, release-payment can be added similarly

module.exports = router;
