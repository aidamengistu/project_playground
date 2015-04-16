var db = require('./models');
var async = require('async');

  // var type=[1,2];

  // db.parkfeature.findAll({
  //   where:{id:type},
  //   include:[db.park]
  // }).then(function(features){

  // });


  // db.park.findAll({
  //   include:[{
  //     model:db.parkfeature,
  //     required: true,
  //     where: {id: type}
  //   }]
  // }).then(function(parks){
  //   console.log(parks.length);

  // });


// To find all the features:

// db.parkfeature.findAll({
//   where:{
//     $not:{
//       id:[6,8,9]
//     }
//   }
// }).then(function(features){
//   console.log(features.length);
// });



// To find all the parks with a specific feature:

// db.parkfeature.find(5).then(function(feature){
//   console.log(feature.feature);
//   feature.getParks().then(function(parks){
//     parks.forEach(function(park){
//       console.log(park.name);
//     })
//   })
// });




// db.parkfeature.findAll().then(function(parks){
//   console.log(parks.get());
// })



// To find all the features of a particular park:

// db.park.find({
//   where:{id:314},
//   include:[db.parkfeature]
// }).then(function(park){
//   console.log(park.get());
//   park.parkfeatures.forEach(function(f){
//       console.log(f.feature);
//   })
// })


// To find all the features of a particular park:
// db.park.find(314).then(function(park){
//   console.log(park.get());
//   park.getParkfeatures().then(function(pf){
//     pf.forEach(function(f){
//       console.log(f.feature);
//     })
//   })
// })



// db.feature.findAll({where:{feature:['Basketball Courts','Beaches']}}).then(function(data){
//   console.log(data);
// })

// db.park.create({name:'test'}).then(function(park){
//   console.log(park.get());
// });



// CODE TO MIGRATE DATA
// db.feature.findAll().then(function(features){
//   async.eachSeries(features,function(feature,callback){
//     db.park.findOrCreate({
//       where:{
//         name:feature.name
//       },
//       defaults:{
//         name:feature.name,
//         address:feature.address,
//         latitude:feature.latitude,
//         longitude:feature.longitude,
//         website:feature.website
//       }
//     }).spread(function(park,created){
//       console.log('PARK CREATED');
//       db.parkfeature.findOrCreate({
//         where:{feature:feature.feature}
//       }).spread(function(newFeature,created){
//         park.addParkfeature(newFeature).then(function(){
//           console.log('...added feature.');
//           callback();
//         })
//       });
//     });
//   });
//   console.log('done.');
// });


// db.park.find(1).then(function(park){
//   park.createParkfeature({feature:'test'}).then(function(pf){
//     console.log(pf);
//   })
// })


// to group by feature
// db.feature.findAll({attributes:['feature'],group:'feature'}).then(function(data){
//   data.forEach(function(item){
//     console.log(item.feature);
//   })
// });
// console.log(item.feature);


// <input type="checkbox" name="type" value="<%= item.feature %>">


// data.forEach(function(item){
//     console.log(item.feature);
//   })


