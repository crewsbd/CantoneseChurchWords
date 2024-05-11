const documentAPI = require('swagger-ui-express');
const router = require('express').Router();
const vocabularyRouter = require('./vocabulary');
const characterRouter = require("./characters");
const swaggerRouter = require('swagger-ui-express');
const swaggerDocument = require('../swagger/api_document.json');


router.use('/vocabulary', vocabularyRouter);
router.use('/character', characterRouter);
router.use('/api-docs', swaggerRouter.serve, swaggerRouter.setup(swaggerDocument));
router.get('/', (request, response) => {
  response.json({ message: 'ROOT' });
});
router.get('/api-docs');

module.exports = router;
