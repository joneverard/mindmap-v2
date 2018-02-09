const mongoose = require('mongoose');
const { Schema } = mongoose;

const PositionSchema = require('./PositionModel');

const AnchorSchema = new Schema({
	position: PositionSchema,
	nodeId: Number
});

module.exports = AnchorSchema;