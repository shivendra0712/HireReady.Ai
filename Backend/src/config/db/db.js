const mongoose = require('mongoose');

function connect() {
    mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log('DB is connected Successfully');
        })
        .catch((err) => {
            console.log('error in db -> ', err);
        })
}

module.exports = connect;

