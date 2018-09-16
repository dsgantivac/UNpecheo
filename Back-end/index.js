var express = require('express');
var Order = require('./mongo');
var pool = require('./pg');

var app = express();

app.get('/orders/', function(req, res) {
    Order.find()
        .limit(10)
        .exec(function(err, orders) {
            if (err)
                res.send(err);

            res.json(orders);
        });
});

app.get('/storekeeper/', function(req, res) {
    Order.find(function(err, orders) {
        if (err)
            res.send(err);

        pool.query('select * from storekeepers limit 5', (err, sk) => {
            console.log("SQL\n", err, sk);
            res.json(sk.row);
            
            pool.end();
        })
        
    }); 
});

app.listen(4000, () => console.log('Now browse to localhost:4000'));