const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001; // Choose a port for your proxy server

app.use(express.json());
app.use(cors());

// Define a route to proxy requests to the external API
app.get("/api/symbols", async (req, res) => {
  try {
    // Make a request to the external API
    const response = await axios.get("https://api.bitfinex.com/v1/symbols");

    // Send the response from the external API to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get('/api/pubticker/:symbol', async (req, res) => {
//   try {
//     // Make a request to the external API
//     const response = await axios.get(
//       `https://api.bitfinex.com/v1/pubticker/{symbol}`
//     );

//     // Send the response from the external API to the client
//     res.json(response.data);
//   } catch (error) {
//     // Handle errors
//     console.error("Error proxying request:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get('/api/pubticker/:symbol', async (req, res) => {
  try {
    // Extract the symbol from the request params
    const { symbol } = req.params;

    // Make a request to the external API using double curly braces
    const response = await axios.get(
      `https://api.bitfinex.com/v1/pubticker/${symbol}` // Use double curly braces
    );

    // Send the response from the external API to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





// Start the server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
