const mongoose = require('mongoose');
const { Schema } = mongoose;

const PositionSchema = require('./PositionModel');

const ConnectionModel = new Schema({
	start: PositionSchema,
	end: PositionSchema,
	tempId: Number
});

module.exports = ConnectionModel;