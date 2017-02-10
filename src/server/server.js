var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var UserModel = require('./userModel.js');

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://test:test@ds149998.mlab.com:49998/demo');

var db = mongoose.connection;
console.log(db);
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
	console.log('Connected to MongoDB');
});

app.post('/user', function (req, res) {
	console.log('hiii');
	var userModel = new UserModel(req.body);
	console.log(userModel);
	userModel.save(function (err, userModel) {
		if (err) return console.error(err);
		res.status(200).json(userModel);
	});
});

app.post('/userLogin', function (req, res) {
	UserModel.find({}, function(err, doc){
		console.log(doc[0].email);
		if (doc[0].email == req.body.email && doc[0].password == req.body.password) {
			res.status(200).json(doc);
		} else {
			if (err) return console.error(err);
		}
	});
});

app.get('/registeredUser', function (req, res) {
    UserModel.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
});

app.put('/updateProfile/:id', function(req, res) {
    UserModel.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      console.log("User Profile Updated Successfully");
      res.sendStatus(200);

    })
});

app.delete('/deleteProfile/:id', function(req, res) {
    UserModel.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
});



 app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../dist/index.html'));
  });

app.listen(app.get('port'), function(){
	console.log('Angular 2 Full Stack listening on port '+app.get('port'));
});

module.exports = app;