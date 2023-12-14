const taskResolvers = require("./task");
const userResolvers = require("./user");
const { GraphQLDateTime } = require("graphql-iso-date");

const cusDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [taskResolvers, userResolvers, cusDateScalarResolver];
