var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'cleint/dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use('/', index);
app.use('/api/v1/', todos);



app.listen(3000, function () {
	console.log('server started on port: 3000');
})