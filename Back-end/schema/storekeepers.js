var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var storekeeperSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: Number,
    lat: Number,
    lng: Number,
    timestamp: Date,
    storekeeper_id: Number,
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
}, {collection:"storekeeper"});

var Storekeeper = mongoose.model('storekeeper', storekeeperSchema);

module.exports = Storekeeper;