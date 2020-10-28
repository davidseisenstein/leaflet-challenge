// Creating map object
var myMap = L.map("map", {
    center: [39.5, -98.35],
    zoom: 8
});

// adding tile layer
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

// Grab data with d3
d3.json(url, function(data) {
    // isolate the features from the geojson
    var features = data.features;
    // Create a new marker layer
    var markers = L.markerClusterGroup();

    // loop through the data
    for (var i = 0; i < features.length; i++) {
        // select the specific quake
        var quake = features[i];
        // set the data location property to a variable
        var location = quake.geometry.coordinates;
        // check for location property
        if (location) {
            // add a new marker to the group and bind a popup
            markers.addLayer(L.marker([location[1], location[0]])
                .bindPopup(quake.properties.title));
        }

    }

    myMap.addLayer(markers);

});
