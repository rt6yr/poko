import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for specific origin
app.use(cors({
//   origin: "https://example.com"
}));

// Parse request body and extend the size to 1mb
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// Universal route handler for all requests
app.all("*", (req, res) => {
  const data = {
    method: req.method,       // Request method (GET, POST, etc.)
    url: req.originalUrl,     // Requested URL
    headers: req.headers,      // Request headers
    query: req.query,          // Query parameters (for GET requests)
    body: req.body,            // Request body (for POST requests)
    env: process.env           // Environment variables
  };

  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
