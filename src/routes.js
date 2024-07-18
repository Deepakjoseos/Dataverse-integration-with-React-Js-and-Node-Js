const express = require('express');
const { getFundingRequests } = require('./controllers');

const router = express.Router();

// Define routes
router.get('/api/fundingRequests/:name', getFundingRequests);


module.exports = {
  setupRoutes: (app) => {
    app.use(router);
  },
};
