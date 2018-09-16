
function distance(v1,v2){
    var total = 0;
    for (var i = 0; i < 2; i++) {
       total += Math.pow(v2[i] - v1[i], 2);

    }
    return Math.sqrt(total);
 }

//retorna la posicion en el arreglo al rapitendero mas cercano a la orden
function closestCentroid(order , centroides){

    var min_distance = Infinity;
    var centroid = -1;

    for (var i = 0; i < centroides.length; i++) {
      var tmp = distance(order,centroides[i]);
      if (tmp < min_distance) {
        min_distance =tmp;
        centroid = i;
        console.log(centroides[i], min_distance , tmp);
      }
    }
    return centroid;
}
/*
  Puntos de pruebas

  centroides = [[-0.74,0.36],[-2.64,1.58],[1.6,0.94],[1.36,-1.44],[-1.38,-1.22],[-2.76,-1.66],[-2.86,0.66],[0.96,1.56]];

*/

function kmeans(oreders, rapitenderos){
  //el numero de centroides y listas debe ser el mismo
  centroides = [[-2.64,1.58],[1.6,0.94],[1.36,-1.44],[-0.74,0.36],[-1.38,-1.22],[-2.76,-1.66],[-2.86,0.66],[0.96,1.56]];
  var data = [];
  //se crea un arreglo de arreglos de tamno del total de rapitenderos
  for (var i = 0; i < rapitenderos.length; i++) {
    data.push([]);
  }
  for (var i = 0; i < orders.length; i++) {
    pos = closestCentroid(orders[i],rapitenderos)
    data[i].push(orders[i])
  }

  var a = closestCentroid([0,0,0],centroides);
  return a;
}


function mapPoints(points){
  var arr = []
  for (var i = 0; i < points.length; i++) {
    arr.push(new google.maps.LatLng(points[i][0], points[i][1]));

  }
  new arr;

}







/**/
