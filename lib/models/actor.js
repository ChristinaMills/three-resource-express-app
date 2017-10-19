const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: Number,
    difficult: Boolean,

});

module.exports = mongoose.model('actor', actorSchema);
