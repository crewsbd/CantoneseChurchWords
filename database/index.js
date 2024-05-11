const mongoose = require('mongoose');

async function connect() {

    if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
        console.log('Mongoose already connected');
      } else {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connecting to mongoose');
        console.log(mongoose.connection.readyState);
      }
}
connect();


module.exports = mongoose;
