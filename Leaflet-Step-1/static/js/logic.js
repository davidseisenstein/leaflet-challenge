// Creating map object
var myMap = L.map("map", {
    center: [39.5, -98.35],
    zoom: 5
});

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


// Load in geojson data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create an array which will store the circles
var quakeCircles = [];

// Grab the data with d3
d3.json(url, function(data) {
    var features = data.features;
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < features.length; i++) {
  
      // Set the data location property to a variable
      var location = features[i].geometry.coordinates;
  
      // Check for location property
      if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        quakeCircles.push(L.circle([location[1],location[0]], {
            color: "red",
            fillcolor: "red",
            radius: features[i].properties.mag * 10000
        }))
      }
  
    }
    
    var quakeLayer = L.layerGroup(quakeCircles)
    // Add our marker cluster layer to the map
    myMap.addLayer(quakeLayer);
  
  });