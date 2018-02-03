module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({error: 'you must log in!'});
	}

	next();
}

// a middle ware is a function that takes a request and has the ability to modify it in some way.
// next is what we use to tell express that this piece of middleware is complete.
// 'pass the request to the next middlewrae in the chain'
// you only want to call next if you want to continue. if there is an error, next is not needed. acts as a failsafe!
