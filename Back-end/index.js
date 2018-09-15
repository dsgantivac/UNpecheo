var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var Order = require('./mongo');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);




var root = { hello: () => {
    var o;
    Order.findOne({id:8779887},function (err, order) {
        if(err){
            console.log(err);
            return;
        }
        o = order;
    });
    console.log(o);
    
    return o;
} };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));