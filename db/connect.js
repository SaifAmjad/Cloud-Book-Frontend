const Mongoose = require("mongoose");

const connectDB = (connection) => {
  Mongoose.connect(connection)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};

module.exports=connectDB
