var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var mongoose = require('mongoose');
var usernameG;

var reportSchema = mongoose.Schema({
  Title:String,
  Report:String
});

var Report = mongoose.model('Report', reportSchema);
var db = mongoose.connection;

var users = require('../controllers/users_controller');
console.log("before / Route");

router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      console.log(req.session.username);
      usernameG = req.session.username;
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });

router.get('/report', function(req,res,next) {
  console.log("Report");
  Report.find(function(err, reportList) {
    if(err) return console.error(err);
    else {
      console.log(reportList);
      res.json(reportList);
    }
  });  
});
router.post('/report', function(req, res, next) {
  console.log("Report Post");
  console.log("req.body");
  var newReport = new Report(req.body);
  newReport.save(function(err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});
router.delete('/report', function(req, res, next) {
  console.log("delete")
  Report.remove({}, function(err, removed) {
    if(err) return console.error(err);
    else {
      console.log("Delete worked");
      res.sendStatus(200);
    }
  });
});

router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;
