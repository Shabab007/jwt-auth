const userDefs = require("./user");
const taskDefs = require("./task");
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userDefs, taskDefs];
