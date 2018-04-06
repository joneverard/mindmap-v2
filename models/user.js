const mongoose = require('mongoose');
const { Schema } = mongoose;
const EmailSchema = require('./EmailModel');
// schema,,,?

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	maximumMaps: {type: Number, default: 5},
	emails: [EmailSchema]
});

mongoose.model('users', userSchema);
