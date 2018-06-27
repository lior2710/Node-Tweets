const express = require('express');
const tweets = require('./tweets');

// create router for the api
const api = express.Router();

// assign tweets
api.use('/tweets', tweets);

module.exports = api;
