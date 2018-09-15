var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = requie('graphql').GraphQLInt;
var GraphQLBoolean = requie('graphql').GraphQLBoolean;

module.exports = new GraphQLObjectType({
  name: 'toolkit',
  fields: function () {
    return {
      delivery_kit: {
        type: GraphQLInt
      },
      kit_size: {
        type: GraphQLInt
      },
      terminal:{
        type: GraphQLInt
      },
      know_how:{
        type: GraphQLInt
      },
      trusted:{
        type: GraphQLBoolean
      },
      order_level:{
        type: GraphQLInt
      },
      storekeeper_level:{
        type: GraphQLInt
      },
      vehicle:{
        type: GraphQLInt
      },
      cashless:{
        type: GraphQLBoolean
      },
      exclusive:{
        type: GraphQLBoolean
      }
    };  
  }
});