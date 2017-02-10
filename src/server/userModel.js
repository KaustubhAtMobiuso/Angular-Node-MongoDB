var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	number: String
});

var UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;