var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var Order = require('/mongo.js');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => {
    Order.findOne({},function (err, order) {
        console.log(order);
        return order.type;
    })
} };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));