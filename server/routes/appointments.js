const router = require("express").Router();
let Appointment = require("../models/appointmentlist.model");

router.route("/").get((req, res) => {
  Appointment.find()
    .then((Appointments) => res.json(Appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

/*
{
    "title": "appointment2",
    "doctor": "Liam Wang",
    "patient": "Olivia Doe",
    "date": "04/04/2023",
    "time": "10:00",
    "type": "check",
    "office": "123 Main St",
    "room": "02",
    "insurance": "false"
}
*/

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const doctor = req.body.doctor;
  const patient = req.body.patient;
  const date = req.body.date;
  const time = req.body.time;
  const type = req.body.type;
  const office = req.body.office;
  const room = req.body.room;
  const insurance = req.body.insurance;
  // create a new Appointment object 
  const newAppointment = new Appointment({
    title,
    doctor,
    patient,
    date,
    time,
    type,
    office,
    room,
    insurance
  });

  console.log("checkpoint");

  // save the new object (newAppointment)
  newAppointment
    .save()
    .then(() => res.json("Appointment added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Appointment.findById(req.params.id)
    .then((Appointments) => res.json(Appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  console.log("try delete " + req.params.id)
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Appointment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Appointment.findById(req.params.id)
    .then((Appointments) => {
      Appointments.title = req.body.title;
      Appointments.dotor = req.body.doctor;
      Appointments.patient = req.body.patient;
      Appointments.office = req.body.office;
      Appointments.date = req.body.date;
      Appointments.time = req.body.time;
      Appointments.type = req.body.type;
      Appointments.office = req.body.office;
      Appointments.insurance = req.body.insurance;
      Appointments
        .save()
        .then(() => res.json("Appointment updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/complete/:id").post((req, res) => {
  Appointment.findById(req.params.id)
    .then((Appointments) => {
      Appointments.completed = true;
      Appointments
        .save()
        .then(() => res.json("Appointment updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
