var express = require('express');
var Order = require('./schema/orders');
var Storekeeper = require('./schema/storekeepers');
var pool = require('./connection/pg');
var mongo = require('./connection/mongo');

var app = express();
var contain = require("@turf/boolean-contains");
var barrios;

const https = require('https');

https.get('https://gist.githubusercontent.com/john-guerra/ee93225ca2c671b3550d62614f4978f3/raw/b1d556c39f3d7b6e495bf26b7fda815765ac110a/bogota_cadastral.json', (resp) => {
  var data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    barrios = JSON.parse(data);
    console.log(data);
    
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

app.get('/orders/:date/:date2', function(req, res) {
    Order.find(/*{ 
        "timestamp" : { 
          $lt: req.params.date2.replace('_', ' '), 
          $gte: req.params.date.replace('_', ' ')
        }   
      }*/)
//        .limit(10)
        .exec(function(err, orders) {
            console.log(err);
            if (err)
                res.send(err);
           
            orders = orders.filter(function(order){           
                var t = new Date(order.timestamp); 
                var a = new Date(req.params.date)//req.params.date.replace('_', ' '));
                var d = new Date(req.params.date2)//req.params.date2.replace('_', ' '));
                console.log(t);
                
                if( t >= a && t <= d){
                    return true;
                }
                return false;
            })

            var o = {
                
            }
            console.log(orders);
            
            for(var i=0; i<orders.length; i++){
                if(!o[orders[i].type]){
                    o[orders[i].type] = [];
                }
                o[orders[i].type].push(orders[i]);
            }
            res.json(o);
        });
});

app.get('/orders/zone/:date/:date2', function(req, res) {
    Order.find()
        .exec(function(err, orders) {
            console.log(err);
            if (err)
                res.send(err);
           
            orders = orders.filter(function(order){           
                var t = new Date(order.timestamp); 
                var a = new Date(req.params.date)//req.params.date.replace('_', ' '));
                var d = new Date(req.params.date2)//req.params.date2.replace('_', ' '));
                console.log(t);
                
                if( t >= a && t <= d){
                    return true;
                }
                return false;
            })

            var o = {
                
            }
            console.log(orders);
            var f = barrios.objects.bta_barrios.geometries;
            for(var i=0; i<orders.length; i++){
                for(var j=0; j<f.length;j++){
                    if(contain(f[j],{
                        "type": "Point",
                        "coordinates": [orders[i].lng, orders[i].lat ]
                      })){
                          if(o[j.properties.NOMB_BARR]){
                            o[j.properties.NOMB_BARR] = []
                          }
                          o[j.properties.NOMB_BARR].push(orders[i]) 
                      }
                }
                
            }
            res.json(o);
        });
});

app.get('/storekeeper/:date/:date2', function(req, res) {
    pool.query("select * from storekeepers where timestamp between '" + req.params.date.replace('_', ' ') + "' and '" + req.params.date2.replace('_', ' ') + "'"
        , (err, sk) => {
            if(err){
                console.log(err);
                pool.end();
                return;
            }
            console.log("SQL\n", sk);
            res.json(sk.rows);
            
            pool.end();  
    }) 
});

app.post('/storekeeper/zone/:date-:date2', function(req, res) {
    pool.query("select * from storekeepers where timestamp between '" + req.params.date.replace('_', ' ') + "' and '" + req.params.date2.replace('_', ' ') + "'"
        , (err, sk) => {
            if(err){
                console.log(err);
                pool.end();
                return;
            }
            console.log("SQL\n", sk);
            res.json(sk);

            pool.end();
    })
});

app.listen(4000, () => console.log('Now browse to localhost:4000'));
