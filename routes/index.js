const documentAPI = require('swagger-ui-express');
const router = require('express').Router();
const vocabularyRouter = require('./vocabulary');
const characterRouter = require('./characters');
const swaggerRouter = require('swagger-ui-express');
const swaggerDocument = require('../swagger/api_document.json');
const passport = require('passport');

router.use('/vocabulary', vocabularyRouter);
router.use('/character', characterRouter);
router.use(
    '/api-docs',
    swaggerRouter.serve,
    swaggerRouter.setup(swaggerDocument)
);
router.use('/login', passport.authenticate('github'), (request, response) => {
    // TODO Is the empty function needed?
});
router.use('/logout', function (request, response, next) {
    request.logout(function (error) {
        if (error) {
            return next(error);
        }
        response.redirect('/');
    });
});

router.get(
  '/github/callback',
  passport.authenticate('github', {
      failureRedirect: '/api-docs',
      session: false,
  }),
  (request, response) => {
      request.session.user = request.user;
      response.redirect('/');
  }
);

module.exports = router;
