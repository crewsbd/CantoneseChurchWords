require('dotenv').config();
require('./swagger/autogen');

const app = require('express')();
const cors = require('cors');
const router = require('./routes');
const bodyParser = require('body-parser');

app.use(cors({ methods: 'GET,POST,PUT,DELETE' }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`API server listening on localhost:${process.env.PORT}`);
});
