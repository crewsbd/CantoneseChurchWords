// Third party
const router = require('express').Router();

// Local middleware
const controller = require('../controllers/character');

// Character endpoints
router.get('/:character', controller.getOneCharacterByCharacter);

module.exports = router;
