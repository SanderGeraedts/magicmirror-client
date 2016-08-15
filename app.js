var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var config = require('./config.json');

//create the application
var app = express();

//set handlebars as view engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')))

//executes when the root is requested
app.get('/', function(req, res) {
	
	res.render('home', {config: JSON.stringify(config)});
});

//Listen for interaction on port 3000
var port = Number(process.env.PORT || config.port);

console.log('Listening on port ' + port + '...');
app.listen(port);