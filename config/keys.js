// keys.js, this is where we figure out what credentials to return. 
// are we development or production environment?

if (process.env.NODE_ENV === 'production') {
	// production
	module.exports = require('./prod');
} else {
	// development
	module.exports = require('./dev');
}

// everything imports keys, so set the export for this file to the correct key for the environment
