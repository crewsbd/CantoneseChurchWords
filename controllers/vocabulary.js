const romanisation = require('cantonese-romanisation');
const mongoose = require('../database');

const utilities = require('../utilities');
const Vocabulary = require('../models/vocabulary');

/**
 * Get one vocabulary word by id
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getOneVocabularyById = async (request, response) => {
    // #swagger.summary = 'Get a vocabulary word'
    // #swagger.description = 'Get the vocabulary word by the id specified.'
    // #swagger.tags = ['Vocabulary']
    console.log(`Connection State: ${mongoose.connection.readyState}`);

    const result = await Vocabulary.findById(request.params.id);

    if (result) {
        response.status(200).json(result.toJSON());
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

/**
 * Get vocabulary words that has a specific yale pingyam in it
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getManyVocabularyByYale = async (request, response) => {
    // #swagger.summary = 'Get vocabulary from a yale pingyam.'
    // #swagger.description = 'Get a list of vocabulary words that have the specified pingyam in them.'
    // #swagger.tags = ['Vocabulary']

    const result = await Vocabulary.find({
        characters: {
            $elemMatch: {
                yale: request.params.term,
            },
        },
    });
    if (result) {
        response.status(200).json(
            result.map((model) => {
                return model.toJSON();
            })
        );
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

const getManyVocabularyByRoman = async (request, response) => {
    // #swagger.summary = 'Get vocabulary from a romanization word.'
    // #swagger.description = 'Get a list of vocabulary words that have the specified romanization word in them.'
    // #swagger.tags = ['Vocabulary']

    const result = await Vocabulary.find({
        characters: {
            $elemMatch: {
                roman: request.params.term,
            },
        },
    });
    if (result) {
        response.status(200).json(
            result.map((model) => {
                return model.toJSON();
            })
        );
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getManyVocabularyByLSHK = async (request, response) => {
    // #swagger.summary = 'Get vocabulary from an LSHK pingyam.'
    // #swagger.description = 'Get a list of vocabulary words that have the specified pingyam in them.'
    // #swagger.tags = ['Vocabulary']

    const result = await Vocabulary.find({
        characters: {
            $elemMatch: {
                lshk: request.params.term,
            },
        },
    });
    if (result) {
        response.status(200).json(
            result.map((model) => {
                return model.toJSON();
            })
        );
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getManyVocabularyByCharacter = async (request, response) => {
    // #swagger.summary = 'Get vocabulary from a character.'
    // #swagger.description = 'Get a list of vocabulary words that have the specified character in them.'
    // #swagger.tags = ['Vocabulary']

    const result = await Vocabulary.find({
        characters: {
            $elemMatch: {
                chinese: request.params.term,
            },
        },
    });
    if (result) {
        response.status(200).json(
            result.map((model) => {
                return model.toJSON();
            })
        );
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

/**
 * Add a vocabulary word to the API
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const postOneVocabulary = async (request, response) => {
    // #swagger.summary = 'Add one Cantonese vocabulary word.'
    // #swagger.description = 'Adds a new word to the API'
    // #swagger.tags = ['Vocabulary']

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Vocabulary word',
      schema: { $ref: '#/definitions/Vocabulary'}
  }
  */

    const result = await Vocabulary.create({
        englishWord: request.body.englishWord,
        englishDescription: request.body.englishDescription,
        characters: request.body.characters,
        synonyms: request.body.synonyms,
    });

    if (result.errors) {
        return response.status(400).json({ errors: result.errors });
    }

    console.dir(result);
    return response.status(200).json({ id: result.id });
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const putOneVocabulary = async (request, response) => {
    // #swagger.summary = 'Modify one Cantonese vocabulary word.'
    // #swagger.description = 'Changes a word in the API'
    // #swagger.tags = ['Vocabulary']

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Vocabulary word',
      schema: { $ref: '#/definitions/Vocabulary'}
  }
  */

    const result = await Vocabulary.findByIdAndUpdate(request.params.id, {
        englishWord: request.body.englishWord,
        englishDescription: request.body.englishDescription,
        characters: request.body.characters,
        synonyms: request.body.synonyms,
    });

    if (result.errors) {
        return response.status(400).json({ errors: result.errors });
    }

    return response.status(200).json({ id: result.id });
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const deleteOneVocabulary = async (request, response) => {
    // #swagger.summary = 'Delete one vocabulary word.'
    // #swagger.description = 'Removes the specified word from the API'
    // #swagger.tags = ['Vocabulary']

    const result = await Vocabulary.findByIdAndDelete(request.params.id);

    //console.dir(result);
    if (result) {
        return response.status(200).json({ deleted: result.id });
    }
    return response
        .status(400)
        .json({ error: `id:${request.params.id} does not exist.` });
};

module.exports = {
    getOneVocabularyById,
    getManyVocabularyByYale,
    getManyVocabularyByRoman,
    getManyVocabularyByLSHK,
    getManyVocabularyByCharacter,
    postOneVocabulary,
    putOneVocabulary,
    deleteOneVocabulary,
};
