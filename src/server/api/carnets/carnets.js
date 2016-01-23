var model = require('./carnet');

module.exports = function(app) {

	app.get('/api/carnets', function(req, res) {
		console.log('get all');
		model.find(function(err, carnets) {
			if (err) {
				res.send(err);
			}
			res.json(carnets);
		});
	});

	app.post('/api/carnets', function(req, res) {
		console.log('get');
		model.create({
			first_name : req.body.first_name,
			last_name : req.body.last_name,
			address : req.body.address,
			email : req.body.email,
			phone : req.body.phone
			}, function(err, carnet) {
				if (err) {
					res.send(err);
				}

				model.find(function(err, carnets) {
					if (err) {
						res.send(err);
					}
					res.json(carnets);
				});
		});
	});

	app.delete('/api/carnets/:carnet_id', function(req, res) {
		console.log('remove');
		model.remove({
			_id : req.params.carnet_id
		}, function(err, carnet) {
			if (err) {
				res.send(err);
			}

			model.find(function(err, carnets) {
				if (err) {
					res.send(err);
				}
				res.json(carnets);
			});
		});
	});

};
