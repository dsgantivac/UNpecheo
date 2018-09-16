/*
*/
const rt_icon = "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/bike-512.png"
const order_icon = "https://cdn4.iconfinder.com/data/icons/ios-web-user-interface-multi-circle-flat-vol-6/512/Food_fork_kitchen_knife_meanns_restaurant-512.png"
var map=null
var init_coord=[4.624335,-74.063644]
var zoom_map = 14
var trafico_chk = true
  
var barrios_chk = true
/*
test data
*/
var rtmarkers = []
var ordersmarkers = []

var rapitenderos = [[10,4.618258,-74.20226,1],[12,4.619329,-74.197598,0.8],[12,4.621649,-74.169974,2]]
var orders = [[10,4.61574,-74.20326,1.2],[12,4.61129,-74.20008,1.5],[12,4.617629,-74.191974,1]]


/*----*/
function getGeotext(){
    var input = document.getElementById("geohash-input").value;
    console.log
    $.ajax({
      url:'https://maps.googleapis.com/maps/api/geocode/json?address='+input+' Bogota,Colombia',
      dataType: 'json'
      }).done(function(obj){
        if(obj.status=="OK"){  
          point = ({"lat": parseFloat(obj.results[0].geometry.location.lat), "lng": parseFloat(obj.results[0].geometry.location.lng)});
          var pt = new google.maps.LatLng(obj.results[0].geometry.location.lat,obj.results[0].geometry.location.lng);
          map.setCenter(pt);
          map.setZoom(15);
        }
      });
}

function getTipovehiculo(){
    var x = document.getElementById("vehiculo-sel").value;
    console.log("vehiculo", x)
}

function getTipoorden(selection) {
    var order = selection.getAttribute("data-val");
    console.log("orden",order)
}

function toggleTrafico() {
    var x = document.getElementById("trafico-chk");
    console.log("togg",x.checked)
    if(trafico_chk){
      trafico_chk=false
      x.checked = false
    }else{
      trafico_chk=true
      x.checked = true
    }
    run()
}

/*temp function*/
function toggleBarrios(){
    var x = document.getElementById("barrios-chk");
    if(barrios_chk){
      barrios_chk = false 
      x.checked = false
      map.data.setStyle(function(feature) {
      return ({
          visible: false
        });
      });
    }else{
      barrios_chk=true
      x.checked = true
      map.data.setStyle(function(feature) {
      return ({
          fillColor: 'gray',
          strokeColor:  'gray',
          strokeWeight: 1,
          visible: true
        });
      });
    }
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
    
    //Trafico 
    if (trafico_chk){
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    }
    //Barrios Bogotá
    if (barrios_chk){
      addBarrios()
    }
    //Marcadores
    addMarkersOrder()
    addMarkersRT()
    console.log("mark", ordersmarkers)
  
}

function addBarrios(){
    map.data.loadGeoJson(
      'https://gist.githubusercontent.com/john-guerra/ee93225ca2c671b3550d62614f4978f3/raw/b1d556c39f3d7b6e495bf26b7fda815765ac110a/bogota_cadastral.json');

    map.data.setStyle(function(feature) {
      var color = 'grey';
      if (feature.getProperty('isColorful')) {
        color = feature.getProperty('color');
      }
      return ({
        fillColor: color,
        strokeColor: color,
        strokeWeight: 1
      });
    });
    
    var infobarrios = new google.maps.InfoWindow();

    map.data.addListener('click', function(event) {
      var barrio_name = event.feature.getProperty("scanombre");
      var geo = event.feature.getGeometry()
      infobarrios.setContent("<div style='width:150px; text-align: center;'>Barrio: "+barrio_name+"</div>");
      infobarrios.setPosition(event.latLng)
      infobarrios.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      infobarrios.open(map);
    });
}

function addMarker(marker,image,listMarkers){  //Params: Information, icon image, markers location, saturation
    var category = 'order category';
    var title = 'order';
    var pos = new google.maps.LatLng(marker[1], marker[2]);
    var icon = {
        url: image, // url
        size: new google.maps.Size(25, 25),
        scaledSize: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0,0), 
        anchor: new google.maps.Point(10,10) 
    };
    
    gmarker = new google.maps.Marker({
        title: title,
        position: pos,
        category: category,
        map: map,
        visible: true,
        icon: icon
    });
    
    var sat = marker[3] 
    var colorcir = '#FF0000' 
    if (sat < 1){
      colorcir = '#35D09C'
    }else if(sat >=1 && sat<2){
      colorcir = '#FFAE77'  
    }
    var circleOrder = new google.maps.Circle({
      strokeColor: colorcir,
      strokeOpacity: sat-0.5,
      strokeWeight: 2,
      fillColor: colorcir,
      fillOpacity: 0.4,
      map: map,
      center: pos,
      radius: sat*250,
      title: title
    });
    
    var infoWindow= new google.maps.InfoWindow({
        content: "orderinfowindow"
        });
    
    //add a click event to the circle
    google.maps.event.addListener(circleOrder, 'click', function(){
      infoWindow.setContent(circleOrder.title)
      infoWindow.setPosition(circleOrder.getCenter());
      infoWindow.open(map);
    }); 
    
    gmarker.setMap(map);
    /*
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(gmarker, 'click', function () {
        infowindow.setContent(this.title)
        infowindow.open(map, this);
    });*/
    
    listMarkers.push(gmarker);
}

function addMarkersOrder(){
    for (i = 0; i < orders.length; i++) {
      addMarker(orders[i], order_icon , ordersmarkers) 
    }
}

function addMarkersRT(){
    for (i = 0; i < orders.length; i++) {
      addMarker(rapitenderos[i], rt_icon , rtmarkers)
    }
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