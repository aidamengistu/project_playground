var drawMap = function(markers) {

  L.mapbox.accessToken = 'pk.eyJ1IjoiYWlkYW1lbmdpc3R1IiwiYSI6ImZXX096a1kifQ.6nKBGs41b-GQoi8rSn6FPg';

  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/aidamengistu.1dd0b6b1/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });

  var map = L.map('map').addLayer(mapboxTiles)

   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      map.setView([position.coords.latitude, position.coords.longitude], 10);
    })
   }

   markers.forEach(function(marker) {
    console.log(marker);
    L.marker([marker.latitude, marker.longitude]).addTo(map).bindPopup(marker.name)
   })

   map.scrollWheelZoom.disable();

}