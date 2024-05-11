const romanisation = require('cantonese-romanisation');
const mongoose = require('../database');

const utilities = require('../utilities');
const Vocabulary = require('../models/vocabulary');

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getOneVocabularyById = async (request, response) => {
    console.log(`Connection State: ${mongoose.connection.readyState}`);

    const result = await Vocabulary.findById(request.params.id);

    //const result = await Vocabulary.findOne({});
    console.dir(result);

    if (result) {
        response.status(200).json(result.toJSON());
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getOneVocabularyByYale = async (request, response) => {
    const result = await Vocabulary.findOne({
        characters: {
            $elemMatch: {
                yale: request.params.term,
            },
        },
    });

    if (result) {
        response.status(200).json(result.toJSON());
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

const getOneVocabularyByRoman = (request, response) => {
    //stub
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getOneVocabularyByLSHK = async (request, response) => {
    const result = await Vocabulary.findOne({
        characters: {
            $elemMatch: {
                lshk: request.params.term,
            },
        },
    });

    if (result) {
        response.status(200).json(result.toJSON());
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getOneVocabularyByCharacter = async (request, response) => {
    const result = await Vocabulary.findOne({
        characters: {
            $elemMatch: {
                chinese: request.params.term,
            },
        },
    });

    if (result) {
        response.status(200).json(result.toJSON());
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const postOneVocabulary = async (request, response) => {
    // console.dir(request.body)
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
const putOneVocabulary = (request, response) => {
    //stub
    utilities.stubResponse(response);
};

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const deleteOneVocabulary = (request, response) => {
    //stub
    utilities.stubResponse(response);
};

module.exports = {
    getOneVocabularyById,
    getOneVocabularyByYale,
    getOneVocabularyByRoman,
    getOneVocabularyByLSHK,
    getOneVocabularyByCharacter,
    postOneVocabulary,
    putOneVocabulary,
    deleteOneVocabulary,
};
