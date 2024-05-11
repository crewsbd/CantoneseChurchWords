const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const vocabularySchema = new Schema({
  englishWord: String,
  englishDescription: String,
  characters: [
    {
      chinese: String,
      roman: [String],
      yale: [String],
      lshk: [String],
    },
  ],
  synonyms: [String],
});

const Vocabulary = model('Vocabulary', vocabularySchema, 'words');

module.exports = Vocabulary;
