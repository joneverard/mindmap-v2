const mongoose = require('mongoose');
const { Schema } = mongoose;

const Message = new Schema({
	email: String,
	sent: {type: Date, default: Date.now },
	content: String,
	reason: String
});

// convention says _ is a relationship.


mongoose.model('messages', Message);
