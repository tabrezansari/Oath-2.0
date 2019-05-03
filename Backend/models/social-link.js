const Joi = require("joi");
const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 500
	},
	provider: {
		type: String,
		required: true,
		maxlength: 255,
		unique: true
	},
	token: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 1025,
	},
	email: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 100,
	},

});



const SocialLink = mongoose.model('socialink', socialLinkSchema);


exports.SocialLink = SocialLink;
