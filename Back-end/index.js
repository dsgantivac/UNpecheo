var express = require('express');
var Order = require('./schema/orders');
var Storekeeper = require('./schema/storekeepers');
var pool = require('./connection/pg');
var mongo = require('./connection/mongo');

var app = express();

<<<<<<< HEAD
app.get('/orders/', function(req, res) {
    Order.find()
        .limit(10)
=======
var contain = require("@turf/boolean-contains");

app.get('/orders/:date/:date2', function(req, res) {

    Order.find(/*{ 
        "timestamp" : { 
          $lt: req.params.date2.replace('_', ' '), 
          $gte: req.params.date.replace('_', ' ')
        }   
      }*/)
//        .limit(10)
>>>>>>> 6a1d707a7025ae1e8a49b14bee3000ed8207d1a4
        .exec(function(err, orders) {
            console.log(err);
            if (err)
                res.send(err);
            var t = new Date(order.timestamp);
            var a = new Date(req.params.date)//req.params.date.replace('_', ' '));
            var d = new Date(req.params.date2)//req.params.date2.replace('_', ' '));
            
            orders = orders.filter(function(order){           
                if( t >= a && t <= d){
                    return true;
                }
                return false;
            })
            res.json(orders);
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
