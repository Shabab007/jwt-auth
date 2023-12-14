const { tasks, users } = require("../Data/index");
const { combineResolvers } = require("graphql-resolvers");
const Task = require("../Models/task");
const User = require("../Models/user");
const { isAuth, isOwner } = require("./middlewares");
const uuid = require("uuid");

module.exports = {
  Query: {
    greetings: () => {
      return ["HELLO"];
    },
    gettasks: combineResolvers(isAuth, async (_, __, { loggedInUserId }) => {
      try {
        console.log("query", loggedInUserId);
        const tasks = await Task.find({ user: loggedInUserId });
        console.log("tasks", tasks);
        return tasks;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    findTask: combineResolvers(isAuth, isOwner, async (_, { id }) => {
      try {
        const task = await Task.findById(id);
        return task;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  },

  // Mutations
  Mutation: {
    createTask: combineResolvers(isAuth, async (_, { input }, { email }) => {
      try {
        const user = await User.findOne({ email });
        const task = new Task({ ...input, user: user.id });
        const result = await task.save();
        await user.task.push(result.id);
        await user.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),

    updateTask: combineResolvers(isAuth, isOwner, async (_, { id, input }) => {
      try {
        const task = await Task.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return task;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    deleteTask: combineResolvers(
      isAuth,
      isOwner,
      async (_, { id }, { loggedInUserId }) => {
        try {
          const task = await Task.findByIdAndDelete(id);
          await User.updateOne(
            { _id: loggedInUserId },
            { $pull: { task: task.id } }
          );
          return task;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
  },

  // Field level Resolvers

  Task: {
    user: async (parent, _, { loaders }) => {
      try {
        // const user1 = await User.findById(user);
        console.log(loaders.user);
        const user1 = await loaders.user.load(parent.user.toString());
        return user1;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
