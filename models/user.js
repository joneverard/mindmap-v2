const mongoose = require('mongoose');
const { Schema } = mongoose;
const EmailSchema = require('./EmailModel');
// schema,,,?

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	maximumMaps: {type: Number, default: 5},
	emails: [EmailSchema],
	signUpDate: {type: Date, default: new Date('April 7, 2018 00:00:00')},
	lastLogin: {type: Date, default: new Date().now},
	visits: {type: Number, default: 0}
});

mongoose.model('users', userSchema);
