const romanisation = require('cantonese-romanisation');

const utilities = require('../utilities');

/**
 *
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 */
const getOneCharacterByCharacter = async (request, response) => {
    const result = romanisation.getYale(request.params.character);
    console.dir(result);

    // Set up blank object
    const characterObject = {
        chinese: request.params.character,
        roman: [],
        yale: [],
        lshk: [],
    };

    const roman = romanisation.getRoman(request.params.character);
    for (let index in roman[0]) {
        characterObject.roman.push(roman[0][index])
    }

    const yale = romanisation.getYale(request.params.character);
    for (let index in yale[0]) {
        characterObject.yale.push(yale[0][index])
    }

    const lshk = romanisation.getLshk(request.params.character);
    for (let index in lshk[0]) {
        characterObject.lshk.push(lshk[0][index])
    }

    console.dir(characterObject);

    //utilities.stubResponse(response);
    if (characterObject) {
        response.status(200).json(characterObject);
    } else {
        response.status(404).json({ MESSAGE: 'No Matching Document' });
    }
};

module.exports = {
    getOneCharacterByCharacter,
};
