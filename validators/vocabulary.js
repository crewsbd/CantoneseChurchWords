const validator = require('express-validator');
const utilities = require('../utilities');

const validators = [
    validator
        .body('englishWord')
        .trim()
        .escape()
        .exists()
        .isString()
        .withMessage('English word is invalid'),
    validator
        .body('englishDescription')
        .trim()
        .escape()
        .exists()
        .isString()
        .withMessage('English description is invalid'),
    validator
        .body('characters.*.chinese')
        .trim()
        .escape()
        .exists()
        .isString()
        .custom((value) => {
            return utilities.isChinese(value);
        })
        .withMessage('Chinese character is invalid'),
];

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const handleErrors = (request, response, next) => {
    const errors = validator.validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ Errors: errors.array() });
    }
    next();
};

module.exports = { validators, handleErrors };
