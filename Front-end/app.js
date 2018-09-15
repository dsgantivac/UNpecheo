/*
*/
var init_coord=[4.624335,-74.063644]
var zoom_map = 14
var trafico_chk = true
/*
test data
*/


/*----*/
function getGeotext(){
    var input = document.getElementById("geohash-input").value;
    console.log
    $.ajax({
      url:'https://maps.googleapis.com/maps/api/geocode/json?address='+input+' Bogota,Colombia',
      dataType: 'json'
      }).done(function(obj){
       // console.log("data"+i,datus);
        if(obj.status=="OK"){  
          //console.log("obj ",obj);
          point = ({"lat": parseFloat(obj.results[0].geometry.location.lat), "lng": parseFloat(obj.results[0].geometry.location.lng)});
          //console.log("point ",point)            
          init_coord=[obj.results[0].geometry.location.lat,obj.results[0].geometry.location.lng]
          console.log("coord",init_coord)
          run();
        }
      });
}

function toggleTrafico() {
    var x = document.getElementById("trafico-chk");
    x.checked = true;
    console.log("togg",x.checked)
    if(trafico_chk){
      trafico_chk=false
    }else{
      trafico_chk=true
    }
    console.log("trafico_chk",trafico_chk)
    run()
}
/*
Map plot
*/
function myMap() {
    var centermap = new google.maps.LatLng(init_coord[0],init_coord[1]);
        
    map = new google.maps.Map(document.getElementById("googleMap"),{
        center:centermap,
        zoom:zoom_map
    });
    
    //Traffic layer 
    if (trafico_chk){
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
    
    map.data.loadGeoJson(
      'https://gist.githubusercontent.com/john-guerra/ee93225ca2c671b3550d62614f4978f3/raw/b1d556c39f3d7b6e495bf26b7fda815765ac110a/bogota_cadastral.json');

    map.data.setStyle(function(feature) {
      var color = 'gray';
      if (feature.getProperty('isColorful')) {
        color = feature.getProperty('color');
      }
      return /** @type {!google.maps.Data.StyleOptions} */({
        fillColor: color,
        strokeColor: color,
        strokeWeight: 2
      });
    });
}

/*-----*/
window.onload = function(){
  run();
}
function run(){
  myMap();
}

$(document).ready(function() {
  //run(); 
})