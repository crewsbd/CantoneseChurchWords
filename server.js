require('dotenv').config();
require('./swagger/autogen');

const app = require('express')();
const cors = require('cors');
const router = require('./routes');
const bodyParser = require('body-parser');

process.on('uncaughtException', (error, origin) => {
    console.log(`${process.stderr.fd}`);
});

process.on('unhandledRejection', (error, origin) => {
    console.log(`Handled rejection`);
});

app.use(cors({ methods: 'GET,POST,PUT,DELETE', origin: ['HTTPS'] }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`API server listening on localhost:${process.env.PORT}`);
});
