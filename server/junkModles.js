// import mongoose
const mongoose = require("mongoose");

// create Schema Class
const Schema = mongoose.Schema;

// create Schema Object (bookSchema)
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  year: { type: Number, required: true },
  fiction: { type: Boolean, required: true },
});

// create a model based on bookSchema Object
const bookList = mongoose.model("bookList", bookSchema);

// export the model
module.exports = bookList;