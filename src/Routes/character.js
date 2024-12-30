const express = require('express');
const route = express.Router();
const characterController = require('../Controllers/characterController');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
route.use(auth);

route.get('/', characterController.getAllCharacters);
route.get('/:character', characterController.getAnCharacter);

module.exports = route;
