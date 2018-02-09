const mongoose = require('mongoose');
const { Schema } = mongoose;

const PositionSchema = require('./PositionModel');

const NodeModel = new Schema({
	anchor: PositionSchema,
	content: {type: String, default: ''},
	display: Boolean,
	edit: {type: Boolean, default: false},
	position: PositionSchema,
	selected: {type: Boolean, default: false},
	title: String,
	nodeId: Number
});

module.exports = NodeModel;
