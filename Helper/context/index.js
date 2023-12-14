const jwt = require("jsonwebtoken");
const User = require("../../Models/user");
module.exports.verifyUser = async req => {
  try {
    req.email = null;
    req.loggedInUserId = null;

    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      const payload = jwt.verify(
        token,
        process.env.SECRET_KEY || "mysecretkey"
      );
      req.email = payload.email;
      const user = await User.findOne({ email: payload.email });

      return user.id;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
