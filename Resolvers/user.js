const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");
const { tasks, users } = require("../Data/index");
const User = require("../Models/user");
const { isAuth } = require("./middlewares");
const Task = require("../Models/task");

module.exports = {
  Query: {
    findUser: combineResolvers(isAuth, async (_, __, { email }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("user not found");
        }
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
      console.log("===", email);
    }),
  },

  // Mutations

  Mutation: {
    signUp: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error("Email exists");
        }
        const hashedPass = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPass });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("user not found");
        }
        const isvalidpass = await bcrypt.compare(input.password, user.password);
        if (!isvalidpass) {
          throw new Error("password not found");
        }
        const secretKey = process.env.SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secretKey, {
          expiresIn: "1d",
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },

  // Fied level Resolvers

  User: {
    task: async ({ id }) => {
      try {
        const task = await Task.find({ user: id });
        return task;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
