
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})


let eq_layer = new L.LayerGroup();
let eq_layer2 = new L.LayerGroup();

var baseMaps = {
    Street: street
  };

  var overlayMaps = {
    Earthquakes_Past_Week: eq_layer,
    Earthquakes_Past_Day: eq_layer2
  };

  var myMap = L.map("map", {
    center: [35.4925,-99.9018],
    zoom: 5,
    layers: [street, eq_layer]
  });

  street.addTo(myMap)

  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          colorList = ["#6efa96","#9ac959","#a59939","#9a6d30","#7f472f","#582a2a"];
  
        div.innerHTML = [
            "<h1 style=\'background-color: white'>Depth Range<h1>" +
            "<li style=\"background-color: " + colorList[0] + "\">-10 to 10</li>" +
            "<li style=\"background-color: " + colorList[1] + "\">10 to 30</li>" + 
            "<li style=\"background-color: " + colorList[2] + "\">30 to 50</li>" + 
            "<li style=\"background-color: " + colorList[3] + "\">50 to 70</li>" + 
            "<li style=\"background-color: " + colorList[4] + "\">70 to 90</li>" + 
            "<li style=\"background-color: " + colorList[5] + "\">90+</li>"
        ]
  
      return div;
  };
  
  legend.addTo(myMap);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
console.log(data)

    // color is based off depth
    function choose_color(depth){
        if(depth > -10 & depth <= 10){
            return "#6efa96"
        }
        else if(depth > 10 & depth <= 30){
            return "#9ac959"
        }
        else if(depth > 30 & depth <= 50){
            return "#a59939"
        }
        else if(depth > 50 & depth <= 70){
            return "#9a6d30"
        }
        else if(depth > 70 & depth <= 90){
            return "#7f472f"
        }
        else if(depth > 90){
            return "#582a2a"
        }
    }
    // radius is based off magnitude
    function choose_radius(magnitude){
        if(magnitude > 0 & magnitude < 1){
            return 2
        }
        else if(magnitude > 1 & magnitude < 2){
            return 6
        }
        else if(magnitude > 2 & magnitude < 3){
            return 10
        }
        else if(magnitude > 3 & magnitude < 4){
            return 14
        }
        else if(magnitude > 4 & magnitude < 5){
            return 18
        }

    }

    function geojsonMarkerOptions(feature) {
        return {
            radius: choose_radius(feature.properties.mag),
            fillColor: choose_color(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
      }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
    
        style: geojsonMarkerOptions,

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr>" + "Magnitude: " + feature.properties.mag + "<br>" + "Depth: " + feature.geometry.coordinates[2] + 
            "<br><a href=" + feature.properties.url + " target='_blank'>Link</a>" + "<br>");
          }

    }).addTo(eq_layer);


});



d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(function(data) {
console.log(data)

    // color is based off depth
    function choose_color(depth){
        if(depth > -10 & depth <= 10){
            return "#6efa96"
        }
        else if(depth > 10 & depth <= 30){
            return "#9ac959"
        }
        else if(depth > 30 & depth <= 50){
            return "#a59939"
        }
        else if(depth > 50 & depth <= 70){
            return "#9a6d30"
        }
        else if(depth > 70 & depth <= 90){
            return "#7f472f"
        }
        else if(depth > 90){
            return "#582a2a"
        }
    }
    // radius is based off magnitude
    function choose_radius(magnitude){
        if(magnitude > 0 & magnitude < 1){
            return 2
        }
        else if(magnitude > 1 & magnitude < 2){
            return 6
        }
        else if(magnitude > 2 & magnitude < 3){
            return 10
        }
        else if(magnitude > 3 & magnitude < 4){
            return 14
        }
        else if(magnitude > 4 & magnitude < 5){
            return 18
        }

    }

    function geojsonMarkerOptions(feature) {
        return {
            radius: choose_radius(feature.properties.mag),
            fillColor: choose_color(feature.geometry.coordinates[2]),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
      }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
    
        style: geojsonMarkerOptions,

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr>" + "Magnitude: " + feature.properties.mag + "<br>" + "Depth: " + feature.geometry.coordinates[2] + 
            "<br><a href=" + feature.properties.url + " target='_blank'>Link</a>" + "<br>");
          }

    }).addTo(eq_layer2);


});