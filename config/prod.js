// production keys go here.
// export an object from here whcih brings in keys from evironment variables.

module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	// stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	// stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	// sendGridKey: process.env.SEND_GRID_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN,
	googleRedirectURI: process.env.GOOGLE_REDIRECT_URI
};