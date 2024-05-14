// Third party
const router = require('express').Router();

// Local middleware
const controller = require('../controllers/character');
const oauth = require('../oauth');

// Character endpoints
router.get(
    '/:character',
    oauth.isAuthenticated,
    controller.getOneCharacterByCharacter
);

module.exports = router;
