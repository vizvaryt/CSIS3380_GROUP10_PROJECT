import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Modal from 'react-modal';



Modal.setAppElement('#root');
function Appointment(props) {

  let subtitle, patient, doctor, date, time, type, office, room, insurance;
  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement('#root');
  function openModal() {
    setIsOpen(true);
  }
  const customStyles = {
    content: {
      padding: '60px',
      width: '60%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.innerText = props.appointment.title;
    patient.innerText = 'Patient Name: '+props.appointment.patient;
    doctor.innerText = 'Doctor Name: '+props.appointment.doctor;
    date.innerText = 'Date: '+props.appointment.date.substring(0, 10);
    time.innerText = 'Time: '+props.appointment.time;
    type.innerText = 'Appointment Type: '+props.appointment.type;
    office.innerText = 'Office Location: '+props.appointment.office;
    room.innerText = 'Room Number: '+props.appointment.room;
    insurance.innerText = 'Covered by Insurance? ' + (props.appointment.insurance ? "Yes" : "No");
  }

  function closeModal() {
    setIsOpen(false);
   //window.location = "/";
  }

    const [isFadingOut, setIsFadingOut] = useState(false);
    const fadeOut = (cb) => {
        setIsFadingOut(true);
        //cb();
    };
    const handleRemoveCard = (id) => {
        props.deleteAppointment(id)
        setIsFadingOut(false);
    };

    function updateAppointment(id) {
        window.location = "/update?id=" + id;
    }
    return(
        
    <div className={isFadingOut ? 'card-fadeout' : 'appointmentBox'} >
        <div onClick={openModal}>
            <b>{props.appointment.title}</b><br></br>
            Doctor: {props.appointment.doctor}<br></br>
            Patient: {props.appointment.patient}<br></br>
            Date: {props.appointment.date.substring(0, 10)} <br></br>
            Time: {props.appointment.time} <br></br>
            Appointment Type: {props.appointment.type} <br></br>
            Office Location: {props.appointment.office} <br></br>
            Room Number: {props.appointment.room} <br></br>
            Covered by Insurance? {" "}
            {props.appointment.insurance ? "Yes" : "No"}<br></br>
        </div>
            <button class="button" onClick={() => { fadeOut(setTimeout(() => handleRemoveCard(props.appointment._id), 300))}}>
                Delete Appointment
            </button>
            <button class="button" onClick={() => { props.completeAppointment(props.appointment._id)}}>
                Complete Appointment
            </button>
        
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div class="modal-content">
      <div class="modal-header">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Title</h2>
        <button type="button" class="close" onClick={closeModal} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <hr></hr>
        <h5 ref={(_doctor) => (doctor = _doctor)}>Doctor Name</h5>
        <h5 ref={(_patient) => (patient = _patient)}>Patient Name</h5>
        <h5 ref={(_date) => (date = _date)}>Date</h5>
        <h5 ref={(_time) => (time = _time)}>Time</h5>
        <h5 ref={(_type) => (type = _type)}>type</h5>
        <h5 ref={(_office) => (office = _office)}>office</h5>
        <h5 ref={(_room) => (room = _room)}>room</h5>
        <h5 ref={(_insurance) => (insurance = _insurance)}>insurance</h5>
      </div>
      <div class="modal-footer">
        <button onClick={() => { props.deleteAppointment(props.appointment._id)}} type="button" class="btn btn-danger mx-2"><i class="bi bi-trash"></i>Delete Appointment</button>
        <button onClick={() => { props.completeAppointment(props.appointment._id)}} type="button" class="btn btn-primary mx-2" data-dismiss="modal"><i class="bi bi-check2-square"></i>Complete Appointment</button>
        <button onClick={() => { updateAppointment(props.appointment._id)}} type="button" class="btn btn-secondary mx-2" data-dismiss="modal"><i class="bi bi-pencil-square"></i>Reschedule</button>
      </div>
    </div>
        
      </Modal>
    </div>
    )
    
}

export default class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.deleteAppointment = this.deleteAppointment.bind(this)
        this.state = {
            appointments: [],
            date: new Date()
        };
    }

    componentDidMount() {
        axios.get('https://appointmentapi-lm5l.onrender.com/appointments/')
            .then(response => {
                this.setState({ appointments: response.data})
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    deleteAppointment(id) {
        /*axios.delete('https://appointmentapi-lm5l.onrender.com/appointments/delete/' + id)
            .then(response => console.log(response.data));*/
        this.setState({
            appointments: this.state.appointments.filter(el => el._id !== id)
        })
    }

    completeAppointment(id) {
        axios.post("https://appointmentapi-lm5l.onrender.com/appointments/complete/" + id).then((res) => { 
            console.log(res)
            window.location = "/";
        });
    }


    AppointmentList() {
        return this.state.appointments.map(currentAppointment => {
            return <Appointment appointment={currentAppointment} 
            deleteAppointment = {this.deleteAppointment}
            completeAppointment = {this.completeAppointment}
            />;
        })
    }

    render() {
        const AppointmentList = () => {
            const [searchTerm, setSearchTerm] = useState("");
            const [selectedDate, setSelectedDate] = useState(null);
            var parsedDate = null
            if (selectedDate != null) {
                parsedDate = selectedDate.toISOString().substring(0,10)
            }
            const filteredAppointments = this.state.appointments.filter(
                appointment => {
                    // Filter the appointments based on the search term and selected date
                    return (
                        (appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        appointment.patient.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (selectedDate === null || appointment.date?.substring(0, 10) === parsedDate) && appointment.completed === false
                    );
                }
            );
    
            return (
                <div className="appointmentList">
                    <div className="filters">
                        <input
                            type="text"
                            placeholder="Search"
                            class="Search"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <DatePicker
                            className="Search"
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            placeholderText="Select date"
                            dateFormat="yyyy-MM-dd"
                            isClearable
                        />
                    </div>
                    {filteredAppointments.map(currentAppointment => {
                        return (
                            <Appointment
                                appointment = {currentAppointment}
                                deleteAppointment = {this.deleteAppointment}
                                completeAppointment = {this.completeAppointment}
                            />
                        );
                    })}
                </div>
            );
        };
        return <AppointmentList />;
      }
}