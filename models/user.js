const mongoose = require('mongoose');
const { Schema } = mongoose;
// schema,,,?

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
	maximumMaps: {type: Number, default: 5}
});

mongoose.model('users', userSchema);
