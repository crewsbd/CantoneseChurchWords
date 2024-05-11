/**
 * A stub to return a generic response
 * @param {import('express').Response} response
 */
const stubResponse = (response) => {
  response.status(200).json({ message: 'This route has not been implemented.' });
};

const isChinese = (characters) => {
  const regularExpression = /^[^\u4E00-\u9FFF\u3400-\u4DBF]+$/; // Is it in the range of chinese characters
  return regularExpression.test(characters)
}

module.exports = { stubResponse, isChinese };
