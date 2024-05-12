// Third party
const router = require('express').Router();

// Utilities
const utilities = require('../utilities'); // Error handler breaks swagger :(

// Local middleware
const controller = require('../controllers/vocabulary');
const validator = require('../validators/vocabulary');

// Vocabulary endpoints
router.get(
    '/:id',
    validator.idValidator,
    controller.getOneVocabularyById
);
router.get(
    '/yale/:term',
    controller.getManyVocabularyByYale
);
router.get(
    '/roman/:term',
    controller.getManyVocabularyByRoman
);
router.get(
    '/lshk/:term',
    controller.getManyVocabularyByLSHK
);
router.get(
    '/char/:term',
    controller.getManyVocabularyByCharacter
);
router.post(
    '/',
    validator.validators,
    validator.handleErrors,
    controller.postOneVocabulary
);
router.put(
    '/:id',
    validator.idValidator,
    validator.validators,
    validator.handleErrors,
    controller.putOneVocabulary
);
router.delete(
    '/:id',
    validator.idValidator,
    validator.handleErrors,
    controller.deleteOneVocabulary
);

module.exports = router;
