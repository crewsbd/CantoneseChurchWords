const swaggerAutogen = require('swagger-autogen');

const document = {
    info: {
        title: 'Cantonese Church Words',
        description:
            'API to retrieve and store Cantonese vocabulary for the Church of Jesus Christ of Latter-day Saints.',
    },
    definitions: {
        Vocabulary: {
            englishWord: 'Romanisation',
            englishDescription: 'description',
            characters: [
                {
                    chinese: '拼',
                    roman: ['ping'],
                    yale: ['ping1', 'ping3'],
                    lshk: ['ping3'],
                },
                {
                    chinese: '音',
                    roman: ['yam'],
                    yale: ['yam1'],
                    lshk: ['jam1'],
                },
            ],
            synonyms: ['663ddf614f79af2b81fffaf9'],
        },
    },
    host: 'localhost:3000',
};

console.log('Generating Swagger');
console.log(__dirname);
swaggerAutogen('./api_document.json', ['../routes/index.js'], document);
