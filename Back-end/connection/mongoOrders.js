var mongoose = require('mongoose');

mongoose.connect("mongodb://hackathonmongo:hackathon2018rappimongodb@mongo-hackathon.eastus2.cloudapp.azure.com:27017/orders");

var db = mongoose.connection;

db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', function() {
        console.log("Mongo connected");
});

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: Number,
    lat: Number,
    lng: Number,
    timestamp: Date,
    created_at: Date,
    type: String,
    toolkit:{
        delivery_kit: Number,
        kit_size: Number,
        terminal: Number,
        know_how: Number,
        trusted: Boolean,
        order_level: Number,
        storekeeper_level: Number,
        vehicle: Number,
        cashless: Boolean,
        exclusive: Boolean
    } 
}, {collection:"orders"});

var Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;