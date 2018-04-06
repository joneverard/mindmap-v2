const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailSchema = new Schema({
	value: {type: String, default: ''},
	type: {type: String, default: ''}
});

module.exports = EmailSchema;