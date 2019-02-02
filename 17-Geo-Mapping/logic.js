// We create the tile layer that will be the background of our map.
console.log("working");

var api_key = "pk.eyJ1Ijoic2FpLWthd2FpaSIsImEiOiJjam9scjZ6a3owZGlpM3FvZXVrNHpoMjMzIn0.0AP4Ih0dS7V2p0CyZNIQqw";

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: api_key
});

// We create the map object with options.
const map = L.map("mapid", {
  center: [
    45.52, -122.67
  ],
  zoom: 13
});

// Then we add our 'graymap' tile layer to the map.
graymap.addTo(map);

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "black",
      radius: getRadius(feature.properties.mag),
    };
  }

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "orange";
    case magnitude > 4:
      return "peach";
    case magnitude > 3:
      return "gold";
    case magnitude > 2:
      return "yellow";
    case magnitude > 1:
      return "green";
    default:
      return "lime-green";
    }
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },

    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

    let grades = [0, 1, 2, 3, 4, 5];
    let colors = [
      "lime-green",
      "green",
      "yellow",
      "gold",
      "peach",
      "orange"
    ];

  // Finally, we our legend to the map.
  legend.addTo(map)
