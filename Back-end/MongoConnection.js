var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://hackathonmongo:hackathon2018rappimongodb@mongo-hackathon.eastus2.cloudapp.azure.com:27017/orders", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }else{
    console.log(err);
    
  }
});


