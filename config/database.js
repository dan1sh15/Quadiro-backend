const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log("Connected to the database successfully") })
    .catch((error) => {
        console.log("Cannot connect to the database");
        console.log(error);
        process.exit(1);
    });
};