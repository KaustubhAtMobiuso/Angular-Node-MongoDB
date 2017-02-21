var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var email   = require('nodemailer');

var app = express();
var UserModel = require('./userModel.js');

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://test:test@ds149998.mlab.com:49998/demo');

var db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
	console.log('Connected to MongoDB');
});

var send = email.createTransport({
	service: 'gmail',
    auth: {
        user: 'kmkaustubh11@gmail.com',
        pass: 'i love u'
    }
});

app.post('/user', function (req, res) {
	console.log('hiii');
	var userModel = new UserModel(req.body);
	console.log(userModel);
	userModel.save(function (err, userModel) {
		if (err) return console.error(err);
		res.json({success: true, msg: 'Registration done Successfully.', userModel: userModel});
	});
});

app.post('/api/login', function (req, res) {
	UserModel.findOne({
		email: req.body.email
	}, function(err, user){
		if(user == null ){
			res.json({success: false, msg: 'User not Found'});
		}
		else if(req.body.email == user.email && req.body.password == user.password) {
			res.json({success: true, user: user});
		}
		else {
			res.json({success: false, msg: 'Email and Password is invalid'});
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
      res.json({success: true, msg: 'User Profile Updated Successfully'});

    })
});

app.delete('/deleteProfile/:id', function(req, res) {
    UserModel.findOneAndRemove({_id: req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
});

app.post('/reset', function(req, res) {
	UserModel.findOne({
		email: req.body.email
	}, function(err, user){
		console.log(user);
		if(user == null ){
			res.json({success: false, msg: 'Email not Found'});
		}
		else {
			res.json({success: true, msg: 'Email found', user: user});
		}
	});
});

app.put('/updatePassword', function(req, res) {
    UserModel.findOneAndUpdate({email: req.body.email}, req.body, function(err) {
      if(err) return console.error(err);
      console.log("User Profile Updated Successfully");
      res.json({success: true, msg: 'Password Updated Successfully Log In Now'});
    })
});

app.get('/sendMail/:email', function(req, res){
	console.log(req.params.email);
	var message = {
		from:    "mean@gmail.com",
		to:      req.params.email,
		subject: "Welcome Mail",
		//text: "Welcome to my site",
		html: '<b>Thank you for contacting us we will respond you within 24hr.</b>'
	};

	send.sendMail(message, function (err, info) {
		if(err) console.error(err);
		else {
			console.log('mail sent', info.messageId, info.response);
			res.json({success: true, msg: 'Mail Sent Successfully'});
		}
	});
	
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname,'/../../dist/index.html'));
});

app.listen(app.get('port'), function(){
	console.log('Angular 2 Full Stack listening on port '+app.get('port'));
});

module.exports = app;