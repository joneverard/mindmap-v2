const mongoose = require('mongoose');
const { Schema } = mongoose;

const NodeModel = require('./NodeModel');
const ConnectionModel = require('./ConnectionModel');

const MapModel = new Schema({
	title: String,
	_user: {type: Schema.Types.ObjectId, ref: 'user'},
	nodes: [NodeModel],
	connections: [ConnectionModel],
	created: {type: Date, default: Date.now },
	lastModified: {type: Date, default: Date.now }
});

// convention says _ is a relationship.


mongoose.model('Maps', MapModel);
