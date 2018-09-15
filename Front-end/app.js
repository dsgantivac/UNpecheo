const init_coord=[4.624335,-74.063644]

function htmlbodyHeightUpdate(){
	var height3 = $( window ).height()
	var height1 = $('.nav').height()+50
	height2 = $('.main').height()
	if(height2 > height3){
		$('html').height(Math.max(height1,height3,height2)+10);
		$('body').height(Math.max(height1,height3,height2)+10);
	}
	else
	{
		$('html').height(Math.max(height1,height3,height2));
		$('body').height(Math.max(height1,height3,height2));
	}
	
}

function myMap() {
    var centermap = new google.maps.LatLng(init_coord[0],init_coord[1]);
        
    map = new google.maps.Map(document.getElementById("googleMap"),{
        center:centermap,
        zoom:14,
        styles: [
                {"featureType": "poi",
                  "stylers": [{"visibility": "off"}]},
                {"featureType": "poi.attraction",
                  "elementType": "labels",
                  "stylers": [{"visibility": "off"}]},
                {"featureType": "poi.government",
                  "elementType": "labels",
                  "stylers": [{"visibility": "off"}]},
                {"featureType": "poi.park",
                  "stylers": [{"visibility": "on"}]}
              ]
    });
    try{
    }
    catch(err){
        console.log(err)
    }
}
window.onload = function(){
  run();
}
function run(){
  myMap();
}
$(document).ready(function() {
  //run(); 
  $("#showall").on("click", myMap);
  
    htmlbodyHeightUpdate()
    $( window ).resize(function() {
    	htmlbodyHeightUpdate()
    });
    $( window ).scroll(function() {
    	height2 = $('.main').height()
      	htmlbodyHeightUpdate()
    });
})