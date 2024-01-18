const Mongoose = require("mongoose");

const uri="mongodb+srv://saif03:iamsaif03@my-project.qblybzj.mongodb.net/TaskManager?retryWrites=true&w=majority"
const connectDb = () => {
  Mongoose.connect(uri)
    .then(() => {
      console.log("Connected to Db");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
