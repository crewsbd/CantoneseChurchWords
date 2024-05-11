// Third party
const router = require('express').Router();

// Local middleware
const controller = require('../controllers/vocabulary');
const validator = require('../validators/vocabulary');

// Vocabulary endpoints
router.get('/:id', controller.getOneVocabularyById);
router.get('/yale/:term', controller.getOneVocabularyByYale);
router.get('/roman/:term', controller.getOneVocabularyByRoman);
router.get('/lshk/:term', controller.getOneVocabularyByLSHK);
router.get('/char/:term', controller.getOneVocabularyByCharacter);
router.post('/', validator.validators, validator.handleErrors, controller.postOneVocabulary);
router.put('/:id', validator.validators, validator.handleErrors, controller.putOneVocabulary);
router.delete('/:id', controller.deleteOneVocabulary);

module.exports = router;
