var express = require('express');
var bodyParser = require('body-parser');
var parksCtrl = require("./controllers/parks");
var authCtrl = require("./controllers/auth");
var app = express();
var Flickr = require('flickr').Flickr;
var db = require('./models');
var session = require('express-session');
var flash = require('connect-flash');


app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(session({
  secret:'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

//custom middleware for alerts
app.use(function(req,res,next){

  //gets alerts (if any) from flash
  //attach them to res.locals
  //things in res.locals these will be passed
  //to the view (ejs) when you do res.render
  res.locals.alerts=req.flash();

  //trigger next middleware
  next();
})

//custom middleware - is user logged in
app.use(function(req,res,next){
  req.getUser = function(){
    return req.session.user || false;
  }
  //trigger next middleware
  next();
});

app.get('*', function(req,res,next){
  res.locals.currentUser = req.getUser();
  next();
})

app.get("/", function(req,res){

  db.parkfeature.findAll({
    where:{
      $not:{
        id:[8,9]
      }
    }
  }).then(function(features){
    res.render('index',{data:features});
  });

})


app.get("/aboutme", function(req,res){
  res.render("aboutme");
})

var flickr = new Flickr(process.env.FLICKR_KEY, process.env.FLICKR_SECRET);

var flickr_params = {
  text: "Discovery+Park+Seattle",
  media: "photos",
  per_page: 25,
  page: 1,
  extras: "url_q, url_z, url_b, owner_name"
};

flickr.executeAPIRequest("flickr.photos.search", flickr_params, false, function(err, result) {
        // Show the error if we got one
        if(err) {
          console.log("FLICKR ERROR: " + err);

          return;
        }
          // console.log(result.photos);
        });

        // Do something with flicker photos

        // app.listen(3000, function(){
        //     console.log("Server started on port 3000....")
        // })


app.use("/parks",parksCtrl);

app.use("/auth",authCtrl);

app.get ('*', function(req, res, next){
  var err = new Error();
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next){
  if(err.status !== 404){
    return next();
  }
    res.render("error");
  // res.send(err.message||'** Sorry that page does not exist **');
})

app.listen(process.env.PORT || 3000)