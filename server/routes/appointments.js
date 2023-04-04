const router = require("express").Router();
let Appointment = require("../models/appointmentlist.model");

router.route("/").get((req, res) => {
  Appointment.find()
    .then((Appointments) => res.json(Appointments))
    .catch((err) => res.status(400).json("Error: " + err));
});

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
  Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Appointment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Appointment.findById(req.params.id)
    .then((Appointments) => {
      Appointments.title = req.body.title;
      Appointments.author = req.body.author;

      Appointments
        .save()
        .then(() => res.json("Appointment updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
