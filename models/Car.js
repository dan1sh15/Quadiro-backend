const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carName: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: String,
    },
    price: {
        type: String,
    },
});

module.exports = mongoose.model("Car", carSchema);