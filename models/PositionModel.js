const mongoose = require('mongoose');
const { Schema } = mongoose;

const PositionSchema = new Schema({
	x: {type: Number, default: 100},
	y: {type: Number, default: 100}
});

module.exports = PositionSchema;
