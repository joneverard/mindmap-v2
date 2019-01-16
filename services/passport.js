const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// Load the users collection from the database.
const User = mongoose.model('users');

// this function is called automatically by passport with our user model that we fetched from the database.
// this generates a piece of identifying information which will be packed into a cookie for future requests.
passport.serializeUser((user, done) => {
	// user is what we pull out of the database from the googlestrat callback below.
	done(null, user.id); // we use the unique id on the record. since people might use facebook instead of google.
});
// done is a function that takes an error object and the user, saying here we go! all complete please carry on.

// cookie is automatically added in new requests
// passport takes info from cookie and places it in this deserialize function.
// this is why it is id, and not user.id. since we only put the id in the cookie.
// we then turn it back into a user model.
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// tell passport to use the google strategy and configure it.
// google strategy config requires API keys and a callback to handle returning data.

// thoughts on creating a default for date... just say default is today?
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: keys.googleRedirectURI, // relative path causes http: not https:. by default googlestrategy doesnt trust the heroku proxy.
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id }); // returns a promise!
			if (existingUser) {
				if (existingUser.emails.length === 0) {
					// patch to capture existing user emails if they come back.
					existingUser.emails = profile.emails;
					const user = await existingUser.save();
					// return done(null, user);
				}
				// need to update the last time the user logged in
				existingUser.lastLogin = new Date();
				existingUser.visits += 1;
				const user = await existingUser.save();
				console.log(user);
				// we already have a record with this id.
				return done(null, existingUser); // first arg is for errors. second arg is whatever to pass back. (err, content)
			}

			const user = await new User({ googleId: profile.id, emails: profile.emails, signUpDate: new Date() }).save();
			return done(null, user);
			// creates and saves a new model instance.
			// user back from db is more up-to-date. need to call done() once async is finished.
		}
	)
);

// everytime we reach out to the db we are using async actions.
// query returns a promise!!

// identify using google strategy
// then go to serialize user. which is defined above
// this takes a function which defines what part of information is being used in the identifying cookie
// when we get a request in, it will automatically contain the cookie header.
// this cookie will be passed into passport (cause its middleware) passport then uses the deserializeUser function
// to turn the cookie back into a user model. (does this by making a db query on the Users collection with the cookie info,
// in this case the user id.)
