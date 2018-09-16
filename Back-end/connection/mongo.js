var mongoose = require('mongoose');

mongoose.connect("mongodb://hackathonmongo:hackathon2018rappimongodb@mongo-hackathon.eastus2.cloudapp.azure.com:27017/orders");

var db = mongoose.connection;

db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', function() {
        console.log("Mongo connected");
});
