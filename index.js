const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
var sslRedirect = require('heroku-ssl-redirect');

// import these files, upon importing they get 'executed' in this 'namespace'
// this is a bit like importing in parts of a big old html file in php. 
require('./models/user');
require('./models/MapModel');
require('./models/MessageModel');
// require('./models/Survey');
require('./services/passport');

// connect to mongo db
mongoose.connect(keys.mongoURI);

// instantiate express
const app = express();
/* Helmet
-----------------------------*/
var helmet = require('helmet')
app.use(helmet())

// enable ssl redirect
app.use(sslRedirect(['development','production'], 301));



/* Body Parser
-----------------------------*/
// parse incoming post requests and add the contents to req.body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Authentication
-----------------------------*/
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		keys: [keys.cookieKey] // can give multiple, which it will pick from randomly. uses these to encrypt the cookies.
	})
);
app.use(passport.initialize());
app.use(passport.session());
// app.use wires up middleware inside the application. 
// middleware modifies incoming requests before they are sent to route handlers.
// all three of these middlewares will take each request, and modify it.
// cookiesession -> extracts cookie data (decrypts for example.)
// avoids having to extract all the data on each request.
// can wire them up so they only apply to some routes. 
// request -> app() -> middleware 1 -> middleware 2 -> route handlers -> response


/* Routes
-----------------------------*/
// import the function which sets the routes from auth_routes, and call it with our app object.
require('./routes/auth_routes')(app);
require('./routes/mapRoutes')(app);
require('./routes/contactRoutes')(app);
// require('./routes/billing_routes')(app);
// require('./routes/surveyRoutes')(app);


/* Handling Production Assets and Passing off React Router requests
-----------------------------*/
app.use(express.static('public'));
if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets like main.js and main.css


	// Express will serve up index.html if it does not recognise the route. (this passes off to react router,
	// which is contained in main.js, which is in index.html)
	// this is needed to avoid 404 errors, which will occur if you do not serve index.html 
	const path = require('path');
	app.get('/app*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'public', 'app', 'index.html'));
	});
	// this is a fall back route, a catch all!
} 
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send('Something went wrong. Please try again later.')
})

app.use((req, res, next) => {
	res.status(404).send('Error 404: File not found.');
})

// listen for traffic on port... this essentially starts the server.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
