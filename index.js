var express = require('express');
var bodyParser = require('body-parser');
var parksCtrl = require("./controllers/parks");
var authCtrl = require("./controllers/auth");
var app = express();
var Flickr = require('flickr').Flickr;
var db = require('./models');
var flash = require('connect-flash');
var session = require('express-session');


app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(session({
  secret:'dsalkfjasdflkjgdfblknbadiadsnkl',
  resave: false,
  saveUninitialized: true
}));

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
    // db.feature.findAll({attributes:['feature'],group:'feature'}).then(function(data){
    //     res.render("index", {data:data});
    // })

    // db.parkfeature.findAll().then(function(features){
    //     res.render('index',{data:features});
    // })

db.parkfeature.findAll({
  where:{
    $not:{
      id:[8,9]
  }
}
}).then(function(features){
    res.render('index',{data:features});
});

//   var parkId = req.query.id;

// db.park.findAll({where:{id:parkId}}).then(function(park){
//   res.send('index',{park:park})
// });
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

app.listen(process.env.PORT || 3000)