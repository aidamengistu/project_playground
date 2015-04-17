var express = require("express");
var router = express.Router();
var db = require('../models');
var bcrypt = require('bcrypt');

router.get('/signup',function(req,res){
  res.render('signup');
})

router.get('/signup/thanks',function(req,res){
  res.render('thanks');
})


router.post('/signup',function(req,res){
  var userQuery = {email:req.body.email}
  var userData = {email:req.body.email,username:req.body.username,password:req.body.password}

  db.user.findOrCreate({where:userQuery,defaults:userData}).spread(function(user,created){
    if(created){
      res.redirect('/auth/signup/thanks');
    } else {
      res.send('username already exists')
    }
  }).catch(function(error){
    console.log('error',error);
    res.send(error);
  })
})

router.get('/',function(req,res){
  res.redirect('/');
})

router.post('/',function(req,res){

  db.user.find({where:{email:req.body.email}}).then(function(user){
   if(user){
     bcrypt.compare(req.body.password, user.password, function(err,result){
       if(err) throw err;

       if(result){

         req.session.user = {
           id:user.id,
           email:user.email,
           username:user.username
         }


       // this redirects the user to whatever page they're on(for eg if you want to stay on current page after you log in):
       res.redirect(req.headers.referer);

     }else{
       res.send("Invalid password")
     }
   })

   }else{
     res.send('Unknown username')
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
