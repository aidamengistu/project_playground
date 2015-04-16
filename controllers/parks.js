var express = require("express");
var router = express.Router();
var db = require('../models');
var async = require('async');

// GET /parks   (optionally ?type=baseball  and/or  ?parkname=green)
router.get('/',function(req,res){

  var type = req.query.type;
  var parkname = req.query.parkname;

  var featureQuery = type ? {id:type} : {};
  var parkQuery = parkname ? {name:{$ilike:'%'+parkname+'%'}} : {};

  db.park.findAll({
    where:parkQuery,
    include:[{
      model:db.parkfeature,
      required: true,
      where: featureQuery
    }]
  }).then(function(parks){

    async.map(parks,function(park,callback){
      park.getParkfeatures().then(function(features){
        park.features=features.map(function(feature){
          return feature.feature;
        });
        callback(null,park);
      })
    },function(err,results){
      res.render("parks/index",{parks:results});
    })
  });
});


// GET /parks/5  (would show the park with an id of 5)
// router.get("/:id", function(req,res){
//   var parkId = req.params.id;
//   db.park.findAll({where: {id:parkId}}).then(function(data){
//     res.render("parks/show",{data:data});
//   })
// })


router.get('/:id',function(req,res){

  var parkId = req.params.id;


  db.park.findAll({
    where:{id:parkId},
    include:[{
      model:db.parkfeature,
      required: true,
    }]
  }).then(function(parks){

    async.map(parks,function(park,callback){
      park.getParkfeatures().then(function(features){
        park.features=features.map(function(feature){
          return feature.feature;
        });
        callback(null,park);
      })
    },function(err,results){
      db.review.findAll({where:{parkId:parkId}}).then(function(comments){
      res.render("parks/show",{parks:results, parkId:parkId, comments:comments});
      })
    })
  });


  // res.send('this is the park page for park with id ' + req.params.id);

  //res.render  show page (full park details of a single park)

  //have to pass "parkId" in res.render for this to work
  //<form action="/parks/<%= parkId %>/reviews" method="post">
})


//create a review
//POST /parks/5/reviews   (creates a review for park # 5)
router.post("/:id/reviews", function(req,res){
    var parkId = req.params.id;
    var comments = req.body.comments;

  db.review.create({comments:comments, parkId:parkId}).then(function(comment){
  res.redirect("/parks/" + parkId);
  })
  })
  //add new review
  //redirect back to park page
// })



module.exports = router;