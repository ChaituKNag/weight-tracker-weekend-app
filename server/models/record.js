const mongoose = require('mongoose');

let RecordSchema = mongoose.Schema({
    "name": String,
    "userId": String,
    "date": Date,
    "weight": Number
});

let Record = mongoose.model('Record', RecordSchema);
module.exports = Record;