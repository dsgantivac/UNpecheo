/*
*/
var init_coord=[4.624335,-74.063644]

/*
test data
*/


/*----*/
function getGeotext(){
    var input = document.getElementById("geohash-input").value;
    console.log
    $.ajax({
      url:'https://maps.googleapis.com/maps/api/geocode/json?address='+input+',Colombia',
      dataType: 'json'
      }).done(function(obj){
       // console.log("data"+i,datus);
        if(obj.status=="OK"){  
          //console.log("obj ",obj);
          //console.log("latlon",[obj.results[0].geometry.location.lat,obj.results[0].geometry.location.lng])
          point = ({"lat": parseFloat(obj.results[0].geometry.location.lat), "lng": parseFloat(obj.results[0].geometry.location.lng)});
          //console.log("point ",point)            
          init_coord=[obj.results[0].geometry.location.lat,obj.results[0].geometry.location.lng]
        
          console.log("coord",init_coord)
          run();
        }
      });
}
/*
Map plot
*/
function myMap() {
    var centermap = new google.maps.LatLng(init_coord[0],init_coord[1]);
        
    map = new google.maps.Map(document.getElementById("googleMap"),{
        center:centermap,
        zoom:12
    });
    
    //Traffic layer 
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    
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