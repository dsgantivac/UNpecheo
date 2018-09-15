var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = requie('graphql').GraphQLInt;

// User Type
exports.userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
        
      id: {
        type: GraphQLInt
      },
      type: {
        type: GraphQLString
      },
      lat:{
        type: GraphQLInt
      },
      lng:{
        type: GraphQLInt
      },
      timestamp:{
        type: GraphQLString
      },
      created_at:{
        type: GraphQLString
      }
      
/*

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
        exclusive: Boolean*/
    };
  }
});