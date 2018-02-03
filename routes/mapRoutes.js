const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // default with node.
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
// const requireCredits = require('../middlewares/requireCredits');
// const Mailer = require('../services/Mailer');
// const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// const Survey = mongoose.model('surveys');
const NoteMap = mongoose.model('Maps');

module.exports = app => {
	app.get('/api/maps/:mapid', requireLogin, async (req, res) => {
		const map = await NoteMap.findOne({_user: req.user.id, _id: req.params.mapid}, (err, doc) => {
			if (err) {
				res.send(422).send(err);
			}
			res.send(doc);
		})
	});

	app.get('/api/maps', requireLogin, async (req, res) => {
		// need to return a list of map objects, WITHOUT the node and connection arrays.
		const maps = await NoteMap.find({ _user: req.user.id }).select({
			nodes: false,
			connections: false
		});
		res.send(maps);
	});

	// two options here... post or put. 
	app.post('/api/maps/:mapid', requireLogin, async (req, res) => {
		const nodes = req.body.nodes.map(node => {
			return {
				anchor: node.anchor,
				content: node.content,
				display: node.display,
				edit: false,
				position: node.position,
				selected: false,
				title: node.title
			}
		});
		// console.log(nodes);
		const connections = req.body.connections.map(conn => {
			return {
				start: conn.start,
				end: conn.end
			}
		});


		const map = await NoteMap.findOneAndUpdate({
			_id: req.params.mapid,
			_user: req.user
		}, {
			$set: {'nodes': nodes, 'connections': connections}
			
		}, {new: true}, (err, doc) => {
			if(err) {
				res.send(422).send(err);
			}
			res.send(doc);
		})
		
//$set: {'connections': connections}
		// need to turn the request body into a Map schema to update the database.
		// do this by mapping over both the nodes and connections, creating NodeModel and ConnectionModel for each.
		// NodeModels = nodes.map((node) => {new NodeModel(node)})
		// ConnectionModels = Connections.map((conn) => {new ConnectionModel(conn)});
		// Map = new MapModel({ node: NodeModels, Connections: ConnectionModels})
	});

	// create a new map
	app.post('/api/maps', requireLogin, async (req, res) => {
		const { title } = req.body;
		const map = new NoteMap({
			title,
			_user: req.user.id
		});

		try {
			await map.save();
			const user = await req.user.save(); // super up to date!

			res.send({map, user});
		} catch (err) {
			res.send(422).send(err);
		}
		
	});
};
