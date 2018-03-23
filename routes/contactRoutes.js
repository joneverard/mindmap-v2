const mongoose = require('mongoose');
const Message = mongoose.model('messages');

module.exports = app => {
	app.post('/api/contactform/', async (req, res) => {
		console.log(req.body);
		const { email, reason, content } = req.body;
		const msg = new Message({
			email, reason, content
		});
		try {
			await msg.save();
			res.redirect('../../thankyou/');
		} catch (err) {
			res.send(500).send(err);
		}
	});
}


	// app.post('/api/maps', requireLogin, async (req, res) => {
	// 		const { title } = req.body;
	// 		const map = new NoteMap({
	// 			title,
	// 			_user: req.user.id
	// 		});

	// 		try {
	// 			await map.save();
	// 			const user = await req.user.save(); // super up to date!

	// 			res.send({map, user, msg: ''});
	// 		} catch (err) {
	// 			res.send(422).send(err);
	// 		}
	// 	}
	// });