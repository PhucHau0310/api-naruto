const characterController = require('../Controllers/characterController');

const route = require('express').Router();

route.get('/', characterController.getAllCharacters);
route.get('/:character', characterController.getAnCharacter);

module.exports = route;
