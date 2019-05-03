const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
		minlength: 5,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: false,
		minlength: 4,
		maxlength: 1025,
	},
	provider: {
		type: String,
		required: false,
		minlength: 5,
		maxlength: 50
	},
	token: {
		type: String,
		required: false,
		minlength: 5,
		maxlength: 500
	},
	ac_type: {
		type: Number,
		required: false,
		minlength: 1,
		maxlength: 2
	},
});



const User = mongoose.model('User', userSchema);


exports.User = User;
