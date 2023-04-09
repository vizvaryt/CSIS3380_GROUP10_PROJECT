import React, { Component } from "react";

import axios from 'axios';

const Appointment = props => (
    <div class="appointmentBox">
        {props.appointment.title}<br></br>
        Doctor: {props.appointment.doctor}<br></br>
        Patient: {props.appointment.patient}<br></br>
        Date: {props.appointment.date.substring(0, 10)} <br></br>
        Time:{props.appointment.time} <br></br>
        
        <button class="button" onClick={() => { props.deleteAppointment(props.appointment._id)}}>
            Delete Appointment
        </button>
    </div>
)

export default class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.deleteAppointment = this.deleteAppointment.bind(this)
        this.state = {appointments: []};
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
        axios.delete('https://appointmentapi-lm5l.onrender.com/appointments/delete/' + id)
            .then(response => console.log(response.data));
        this.setState({
            appointments: this.state.appointments.filter(el => el._id !== id)
        })
    }

    AppointmentList() {
        return this.state.appointments.map(currentAppointment => {
            return <Appointment appointment={currentAppointment} 
            deleteAppointment = {this.deleteAppointment}
            />;
        })
    }

    render() {
        return (
          <div class="appointmentList">
            {this.AppointmentList()}
          </div>
        );
      }
}