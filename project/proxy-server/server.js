const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/symbols", async (req, res) => {
  try {
    const response = await axios.get("https://api.bitfinex.com/v1/symbols");
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/pubticker/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://api.bitfinex.com/v1/pubticker/${symbol}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
