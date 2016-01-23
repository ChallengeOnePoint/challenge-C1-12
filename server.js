var express  = require('express');
var app      = express();
var port  	 = 3000;

app.configure(function() {
	app.use(express.static(__dirname + 'src/front'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

require('./src/server/api/carnets/carnets.js')(app);

app.listen(port);
console.log("App listening on port " + port);
