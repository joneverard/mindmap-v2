const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// handle call back traffic from google authentication.
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/app');
		}
	);
	// pass request through passport to turn it into a user, then specify a place to redirect once finished.

	app.get('/api/logout', (req, res) => {
		req.logout(); // function that is attached by passport automatically.
		res.redirect('/');
	});
	// calling this function will destroy the cookie

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	// we use this endpoint to determine if there is a user signed in when we first boot up the application.
};
// send user to google for auth
