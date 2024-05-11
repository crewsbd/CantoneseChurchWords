const validator = require('express-validator');
const utilities = require('../utilities');

const validation = [
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

module.exports = { validation };
