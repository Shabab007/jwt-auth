const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    findUser: User
  }

  extend type Mutation {
    signUp(input: signUpInput): User
    login(input: loginInput): Token
  }
  input loginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  input signUpInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    task: [Task!]
    createdAt: Date!
    updatedAt: Date!
  }
`;
