// const _ = require('lodash');
// const Path = require('path-parser');
// const { URL } = require('url'); // default with node.
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const default_map = require('./default_map');

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
		// console.log('body of request', req.body.nodeData)
		const nodes = req.body.nodeData.map(node => {
			return {
				anchor: node.anchor,
				content: node.content,
				display: node.display,
				edit: false,
				position: node.position,
				selected: false,
				title: node.title,
				rank: (node.rank ? node.rank : 0),
				nodeId: node.id,
				editorSize: node.editorSize
			}
		});
		// console.log('nodes', nodes);
		const connections = req.body.connections.map(conn => {
			return {
				start: {nodeId: conn.start.id, position: conn.start.position},
				end: {nodeId: conn.end.id, position: conn.end.position}
			}
		});

		const map = await NoteMap.findOneAndUpdate({
			_id: req.params.mapid,
			_user: req.user
		}, {
			$set: {'nodes': nodes, 'connections': connections}
			
		}, {new: true}, (err, doc) => {
			if(err) {
				console.log(err);
				res.send(422).send(err);
			}
			res.send(doc);
		})

	});


	app.put('/api/maps/:mapid', requireLogin, async (req, res) => {
		// should probably use a different route not just a different request...
		const map = await NoteMap.findOneAndUpdate({
			_id: req.params.mapid,
		}, {
			$set: {'title': req.body.title}
		}, (err, doc) => {
			if(err) {
				console.log(err);
				res.send(422).send(err);
			}
			res.send(doc);
		}) 
	});

	app.delete('/api/maps/:mapid', requireLogin, async (req, res) => {
		const removed = await NoteMap.remove({_id: req.params.mapid, _user: req.user}, (err, doc) => {
			if(err) {
				res.send(422).send(err);
			}
		});
		const maps = await NoteMap.find({_user: req.user.id}).select({
			nodes: false,
			connections: false
		});
		res.send(maps);
	});

	// create a new map
	app.post('/api/maps', requireLogin, async (req, res) => {
		// need to check that the user has permission to create a map.
		// use middleware...? or just check here?
		var msg
		const maps = await NoteMap.find({ _user: req.user.id }).select({
			nodes: false,
			connections: false
		});
		console.log(req.user);
		if (maps.length >= req.user.maximumMaps) {
			// big mess here... currently trying to get it to return a useful response when the user has reached its limit.
			res.send({map: false, user: req.user, msg: `You can only create a maximum of ${req.user.maximumMaps} maps.`});
		} else {
		// if (maps.length >= req.user.maximumMaps) {
		// 	msg = 'You do not have permission to create more than 5 maps.';
		// 	return res.send({maps, user, msg});
			const { title, tutorial } = req.body;
			// const map;
			// if (tutorial) {
			const map = new NoteMap({
				title,
				_user: req.user.id,
				nodes: tutorial ? default_map.nodes : [],
				connections: tutorial ? default_map.connections : []
			})
			// } else {
				// const map = new NoteMap({
				// 	title,
				// 	_user: req.user.id
				// });
			
			// console.log(map);
				

			try {
				await map.save();
				const user = await req.user.save(); // super up to date!

				res.send({map, user, msg: ''});
			} catch (err) {
				res.send(422).send(err);
			}
		}
	});
};

// have a default map in the database.
// have a separate route handler /api/maps/default
// make a call to this api to retrieve the default map
// 



		
//$set: {'connections': connections}
		// need to turn the request body into a Map schema to update the database.
		// do this by mapping over both the nodes and connections, creating NodeModel and ConnectionModel for each.
		// NodeModels = nodes.map((node) => {new NodeModel(node)})
		// ConnectionModels = Connections.map((conn) => {new ConnectionModel(conn)});
		// Map = new MapModel({ node: NodeModels, Connections: ConnectionModels})