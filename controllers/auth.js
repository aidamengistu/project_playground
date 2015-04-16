var express = require("express");
var router = express.Router();
var db = require('../models');
var bcrypt = require('bcrypt');

router.get('/signup',function(req,res){
  res.render('signup');
})


router.post('/signup',function(req,res){
  var userQuery = {email:req.body.email}
  var userData = {email:req.body.email,username:req.body.username,password:req.body.password}

  db.user.findOrCreate({where:userQuery,defaults:userData}).spread(function(user,created){
    if(created){
    res.redirect('/');
    } else {
      res.send('username already exists')
    }
  }).catch(function(error){
    console.log('error',error);
    res.send(error);
  })
})

// router.get('/',function(req,res){
//   res.redirect('index');
// })

// router.post('/',function(req,res){
//   db.user.find({where{email:req.body.email}}).then(function(user){

//   })
// })




module.exports = router;
