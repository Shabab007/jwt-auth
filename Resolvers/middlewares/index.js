const { skip } = require("graphql-resolvers");
const Task = require("../../Models/task");
const { isValidId } = require("../../Database/util");

module.exports.isAuth = (_, __, { email }) => {
  if (!email) {
    throw new Error("access denied! please Log in");
  }
  return skip;
};

module.exports.isOwner = async (_, { id }, { loggedInUserId }) => {
  try {
    if (!isValidId(id)) {
      throw new Error("Invalid Task Id");
    }
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not Found");
    } else if (task.user.toString() !== loggedInUserId) {
      throw new Error("Not authorized as task owner");
    }
    return skip;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
