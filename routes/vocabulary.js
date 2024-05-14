// Third party
const router = require('express').Router();

// Utilities
const utilities = require('../utilities'); // Error handler breaks swagger :(

// Local middleware
const controller = require('../controllers/vocabulary');
const validator = require('../validators/vocabulary');
const oauth = require('../oauth');

// Vocabulary endpoints
router.get(
    '/:id',
    oauth.isAuthenticated,
    validator.idValidator,
    controller.getOneVocabularyById
);
router.get(
    '/yale/:term',
    oauth.isAuthenticated,
    controller.getManyVocabularyByYale
);
router.get(
    '/roman/:term',
    oauth.isAuthenticated,
    controller.getManyVocabularyByRoman
);
router.get(
    '/lshk/:term',
    oauth.isAuthenticated,
    controller.getManyVocabularyByLSHK
);
router.get(
    '/char/:term',
    oauth.isAuthenticated,
    controller.getManyVocabularyByCharacter
);
router.post(
    '/',
    oauth.isAuthenticated,
    validator.validators,
    validator.handleErrors,
    controller.postOneVocabulary
);
router.put(
    '/:id',
    oauth.isAuthenticated,
    validator.idValidator,
    validator.validators,
    validator.handleErrors,
    controller.putOneVocabulary
);
router.delete(
    '/:id',
    oauth.isAuthenticated,
    validator.idValidator,
    validator.handleErrors,
    controller.deleteOneVocabulary
);

module.exports = router;
