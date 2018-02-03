const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // default with node.
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		// include the requireLogin middleware.
		// need to be careful about how much data we are sending.
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
		});

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		// colon : says this is a wildcard
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		// extract the data that we are interested in.
		const p = new Path('/api/surveys/:surveyId/:choice'); // :thing declares this as a variable.

		// Chain is a lodash helper that allows you to streamline multiple operations.
		// you pass in the initial object or array, and then 'chain' on multiple operations.
		// you don't need to pass in the array each time, as this is done automatically.
		// see end of file for the original code.
		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				// for each event, send a mongo update query.
				Survey.updateOne(
					{
						_id: surveyId, // dont forget the _ for mongo
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec(); // updateOne constructs a query, still need to execute it
			})
			.value(); // need to call this to get the end result out at the end.
		res.send({});
		// don't need to send anything back to sendgrid, but don't leave them hanging
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		// wire up m
		// going to be quite large!
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			// only makes an instance in memory. must call .save() to save to db.
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id, // the id that is provided by mongoose automatically.
			dateSent: Date.now()
		});

		// send an email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send(); // make sure its done.
			await survey.save();

			req.user.credits -= 1;
			const user = await req.user.save(); // super up to date!

			res.send(user);
		} catch (err) {
			res.send(422).send(err);
		}
	});
};
// when we pass in an array of objects to the recipients property, mongoose turns them into subdocuments
// for us. this is because it is expecting an array of recipientschemas, but needs to make them from an input.
// thus, all we have to do is pass in an array of objects, each one containing an email. since all other propeties
// are given defaults.
// remember that we pass in an object to new Survey(). this is like a config file that sets the data for each field.
// names must match! duh.

// create survey
// create and send email based on survey object
// if it sends, save the survey
// end route handler

// BEFORE THE CHAIN REFACTOR
// const events = _.map(req.body, ({ email, url }) => {
// 	// path name is the bit after the domainname.
// 	const match = p.test(new URL(url).pathname);
// 	// p.test() returns null if it couldn't find anything.
// 	// this also means that we can't do any destructuring off of this match object.
// 	if (match) {
// 		return { email, surveyId: match.surveyId, choice: match.choice };
// 	}
// });

// // the _.map will return undefined if we do not return anything, so we need to remove these elements.
// const compactEvents = _.compact(events);

// // now remove duplicates
// const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
// // this checks if BOTH the email and surveyId already exist.

// --------mongo updating notes----------
// updateOne, part of CRUD?
// pass in two args, first is to identify the record to update,
// second is to describe how to update it.
// Survey.updateOne({
// 	id: surveyId,
// 	recipients: {
// 		$elemMatch: { email: email, responded: false }
// 	}
// }, {
// 	$inc: { [choice]: 1},
// 	$set: { 'recipients.$.responded': true }
// });

// $ allows you to use intelligent queries with mongo.
// $inc tells mongo to increment something by one. [choice] means it can be either yes or no.
// it needs to interpolate / inject the value in to find out
// 'increment yes or no by one'

// $set means set a thing to a value.
// using recipients.$.responded: $ says use the document that corresponds with the one that we found
// when using foundOne.

// updating responded field
// need to keep as much query stuff on the mongo side as possible. otherwise we have
// to send the entire database backwards and forwards for every single update.
// if we write a query which finds the survey, email and false responded, we can perform all the
// logic on the mongo instance.

// mongo queries are async, but we don't need to worry about that since we are not
// sending anything back to sendgrid.
// plus they send everything in one big go.
