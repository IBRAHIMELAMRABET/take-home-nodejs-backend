require("dotenv").config();
const express = require("express");
const axios = require("axios");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const API_BASE_URL = process.env.MINERSTAT_API_BASE_URL;

// Middleware for Bearer Authentication
app.use(authMiddleware);

//get all available coins
app.get("/coins", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coins" });
  }
});

//get all pools for a specific coin

app.get("/pools/:coin", async (req, res) => {
  const coin = req.params.coin;

  try {
    const response = await axios.get(`${API_BASE_URL}/pools?coin=${coin}`);
    const pools = response.data;
    if (pools.length === 0) {
      return res.json({
        message: `No pools found for coin: ${coin}`,
        pools: pools,
      });
    }
    res.json(pools);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mining pools" });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success" });
});

module.exports = app;
