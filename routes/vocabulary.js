// Third party
const router = require('express').Router();

// Local middleware
const controller = require('../controllers/vocabulary');

// Vocabulary endpoints
router.get('/:id', controller.getOneVocabularyById);
router.get('/yale/:term', controller.getOneVocabularyByYale);
router.get('/roman/:term', controller.getOneVocabularyByRoman);
router.get('/lshk/:term', controller.getOneVocabularyByLSHK);
router.get('/char/:term', controller.getOneVocabularyByCharacter);
router.post('/', controller.postOneVocabulary);
router.put('/:id', controller.putOneVocabulary);
router.delete('/:id', controller.deleteOneVocabulary);

module.exports = router;
