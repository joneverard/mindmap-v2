const mongoose = require('mongoose');
const { Schema } = mongoose;

const EditorSizeSchema = new Schema({
	width: {type: Number, default: null},
	height: {type: Number, default: null}
});

module.exports = EditorSizeSchema;
