var express = require('express');
var Order = require('./connection/mongoOrders');
var pool = require('./pg');

var app = express();

app.get('/orders/', function(req, res) {
    Order.find()
//        .limit(10)
        .exec(function(err, orders) {
            if (err)
                res.send(err);
            res.json(orders);
        });
});

app.get('/storekeeper/:date-:date2', function(req, res) {
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

app.post('/zone/', function(req, res) {
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
