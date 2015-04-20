var express = require("express");
var router = express.Router();
var db = require('../models');
var async = require('async');
var Flickr = require('flickr').Flickr;
var flash = require('connect-flash');


// GET /parks   to show all parks by search feature
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



// GET to show one particular park:
router.get('/:id',function(req,res){

  var parkId = req.params.id;


  db.park.find({
    where:{id:parkId},
    include:[{
      model:db.parkfeature
    }]
  }).then(function(park){

    db.review.findAll({where:{parkId:parkId}}).then(function(comments){

      var flickr = new Flickr(process.env.FLICKR_KEY, process.env.FLICKR_SECRET);

      var flickr_params = {
        text: park.name+' Seattle',
        media: "photos",
        per_page: 25,
        page: 1,
        extras: "url_q, url_z, url_b, owner_name"
      };

      flickr.executeAPIRequest("flickr.photos.search", flickr_params, false, function(err, result) {
            // Show the error if we got one

            if(err) {
              res.send('flickr error');
              console.log("FLICKR ERROR: ", err);
            }else{
              // res.send(result);
              res.render("parks/show",{park:park, parkId:parkId, comments:comments, result:result});
            }
              // console.log(result.photos);
            });
    })
  });
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





module.exports = router;