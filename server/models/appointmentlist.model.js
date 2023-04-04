const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const todoSchema = new Schema({
  title: { type: String, required: true },
  doctor: { type: String, required: true },
  patient:  { type: String, required: true },
  date:  { type: Date, required: true },
  time:  { type: String, required: true },
  type:  { type: String, required: true },
  office:  { type: String, required: true },
  room:  { type: String, required: true },
  insurance:   { type: Boolean, required: true },
  deleted: { type: Boolean, default: false  },
  completed: { type: Boolean, default: false },
});

const Appointment = mongoose.model("Appointment", todoSchema);
module.exports = Appointment;