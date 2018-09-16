var mongoose = require('mongoose');

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