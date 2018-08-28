const express = require('express');

const apiRouter = express.Router();

const getLocations = (req, res) => {
  
}

apiRouter.get('/locations', getLocations);

module.exports = apiRouter;