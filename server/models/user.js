const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    'name': String
});

let User = mongoose.model('User', UserSchema);

module.exports = User;