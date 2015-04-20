var express = require("express");
var router = express.Router();
var db = require('../models');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');

// GET /auth/signup
// display sign up form
router.get('/signup',function(req,res){
  res.render('signup');
})

// GET /auth/signup/thanks
// display thank you page after user signs up
router.get('/signup/thanks',function(req,res){
  res.render('thanks');
})

// POST /auth/signup
// create new user in database
router.post('/signup',function(req,res){
  var userQuery = {email:req.body.email};
  var userData = {
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
  };

  db.user.findOrCreate({where:userQuery,defaults:userData}).spread(function(user,created){
    if(created){
      res.redirect('/auth/signup/thanks');
    } else {
      // res.send('username already exists')
      req.flash('danger', 'Username already exists');
      res.redirect(req.headers.referer);

    }
  }).catch(function(error){
    // console.log('error',error);
    // res.send(error);
    if(error){
      if(Array.isArray(error.errors)){
        error.errors.forEach(function(errorItem){
          req.flash('danger',errorItem.message);
        });
      }else{
        req.flash('danger','unknown error');
        console.log('unknown error',error);
      }
    }else{
      req.flash('danger','unknown error');
      console.log('error, but no error...');
    }
    res.redirect(req.headers.referer);
  })
})

router.get('/',function(req,res){
  res.redirect('/');
})

router.post('/',function(req,res){

  db.user.find({where:{email:req.body.email}}).then(function(user){
   if(user){
    // check password
    bcrypt.compare(req.body.password, user.password, function(err,result){
     if(err) throw err;

     if(result){
          // store user to session
          req.session.user = {
           id:user.id,
           email:user.email,
           username:user.username
         };
       // this redirects the user to whichever page they're on(for eg if you want to stay on current page after you log in):
       res.redirect(req.headers.referer);

     }else{
       // res.send("Invalid password")
       req.flash('danger','Invalid password')
       res.redirect(req.headers.referer);

     }
   })
  }else{
   res.flash('danger','Unknown user.  Please sign up.')
   res.redirect(req.headers.referer);
 }
   // res.redirect('/');
   // console.log(req.headers);
 });
})

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
  delete req.session.user;
    // req.flash('info','You have been logged out.')
    res.redirect(req.headers.referer);
  });
   // user is logged in forward them to the home page
 // });
//GET /auth/logout
//logout logged in user




module.exports = router;
