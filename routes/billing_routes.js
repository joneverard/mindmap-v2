// set up a function that gets called with our app object, (setting routes on the app instance)
// then set up the routes within. then export using modules.export.
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
// call stripe with the stripe secret key.


// supply express with a function that defines middleware.
// only requirement of express is that one of the functions in the args** does something with the response.
module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		if (!req.user) {
			return res.status(401).send({error: 'you must log in!'})
		}

		// token is given via req object.
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '5 dollars for 5 credits',
			source: req.body.id
		});
		
		// take user model, add 5 credits to the model, then send them back to the application.
		// when using passport we an access the user using req.user (automatically included with every request)
		// our middleware that is set up will turn the cookie into a MODEL, which can be used to call methods on,
		// and even simple operations like this one:
		req.user.credits += 5;
		const user = await req.user.save();

		// need to make sure that the user is logged in before trying to assign credits to the user.

		res.send(user);
	});
};
// when you make post requests with express, doesn't automatically make the body available to the application.
// so... middleware to the rescue!

// get body.id value -> the token that stripe requires!
