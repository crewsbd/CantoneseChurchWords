/**
 * A stub to return a generic response
 * @param {import('express').Response} response
 */
const stubResponse = (response) => {
    response
        .status(200)
        .json({ message: 'This route has not been implemented.' });
};

const isChinese = (characters) => {
    const regularExpression = /^[\u4E00-\u9FFF\u3400-\u4DBF]+$/; // Is it in the range of chinese characters
    return regularExpression.test(characters);
};

const hasTone = (pingyam) => {
    const regularExpression = /^[^\d]*\d$/; // Ensure there is a tone number at the end
    return regularExpression.test(pingyam);
};

/**
 * 
 * @param {Function} wrappedFunction 
 * @returns 
 */
const handleErrors = (wrappedFunction) => (request, response, next) => {
  
}
    // Promise.resolve(wrappedFunction(request, response, next)).catch(next);

module.exports = { stubResponse, isChinese, hasTone };
