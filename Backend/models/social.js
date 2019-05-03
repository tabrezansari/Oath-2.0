const Joi = require("joi");
const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({

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
        name: {
			type: String,
			required: true,
			minlength: 4,
			maxlength: 50,
        },
        email: {
			type: String,
			required: true,
			minlength: 4,
			maxlength: 100,
        },
        
});



const Social = mongoose.model('social', socialSchema);


exports.Social = Social;
