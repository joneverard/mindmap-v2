const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnchorSchema = require('./AnchorSchema');

const ConnectionModel = new Schema({
	start: AnchorSchema,
	end: AnchorSchema,
	appId: Number
});

module.exports = ConnectionModel;