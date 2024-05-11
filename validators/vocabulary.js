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
    validator
        .body('characters.*.roman.*')
        .trim()
        .escape()
        .exists()
        .isString()
        .isAlpha() // No numbers
        .withMessage('Romanization is invalid'),
    validator
        .body('characters.*.yale.*')
        .trim()
        .escape()
        .exists()
        .isString()
        .isAlphanumeric()
        .custom((value) => {
            return utilities.hasTone(value);
        })
        .withMessage('Yale pingyam in invalid'),
    validator
        .body('characters.*.lshk.*')
        .trim()
        .escape()
        .exists()
        .isString()
        .isAlphanumeric()
        .custom((value) => {
            return utilities.hasTone(value);
        })
        .withMessage('LSHK pingyam in invalid'),
    validator
        .body('synonyms.*')
        .trim()
        .escape()
        .isString()
        .isAlphanumeric()
        .isHexadecimal()
        .optional()
        .withMessage('Synonym index is invalid'),
];

/**
 * Middleware to handle validation errors found
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
const handleErrors = (request, response, next) => {
    const errors = validator.validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ Errors: errors.array() });
    } else {
        next();
    }
};

module.exports = { validators, handleErrors };
