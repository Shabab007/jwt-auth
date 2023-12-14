const User = require("../Models/user");
const user = require("../Models/user");

module.exports.batchUsers = async userIds => {
  console.log(userIds);
  const users = await User.find({ _id: { $in: userIds } });
  return userIds.map(id => users.find(user => user.id === id));
};
