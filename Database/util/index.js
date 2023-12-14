const mongoose = require("mongoose");

module.exports.connection = async () => {
  try {
    mongoose.set("debug", true);
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected succesfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.isValidId = id => {
  return mongoose.Types.ObjectId.isValid(id);
};
