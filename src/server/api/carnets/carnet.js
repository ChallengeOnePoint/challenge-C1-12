var loki     = require('lokijs');
var db       = new loki('carnets.json');
var carnets = db.addCollection('carnets');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

carnets.insert({
	  id : guid(),
	  createDate : new Date().getTime(),
		first_name : 'first_name',
		last_name : 'last_name',
		address : 'address',
		email : 'newlight77@gmail.com',
		phone : '0659400000'
});

exports.find =  function(callback) {
	  console.log('model.find');
		console.log(carnets.data);
	  var err = '';
	  callback(err, carnets.data);
		return carnets;
};

exports.create = function(carnet, callback) {
	  console.log('model.create');
	  console.log(carnet);
		var err = '';
		carnets.insert({
			id : guid(),
			createDate : new Date().getTime(),
			first_name : cartnet.first_name,
			last_name : carnet.last_name,
			address : carnet.address,
			email : carnet.email,
			phone : cartnet.phone
		});
		db.saveDatabase();
		callback(err, carnets.data);
};

exports.remove = function(id, callback) {
	  console.log('model.remove');
		console.log(id);
	  var err = '';
	  carnets.remove(id);
		db.saveDatabase();
		callback(err, carnets.data);
};
