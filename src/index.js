const express = require('express');
const cors = require('cors');

const {
  getFundingRequests
} = require('./controllers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Use body-parser middleware

// Define routes
app.get('/api/fundingRequests/:name', getFundingRequests);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
