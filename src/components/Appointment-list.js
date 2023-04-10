import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const Appointment = props => (
    <div class="appointmentBox">
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
        
        <button class="button" onClick={() => { props.deleteAppointment(props.appointment._id)}}>
            Delete Appointment
        </button>
        <button class="button">
            Complete Appointment
        </button>
    </div>
)

export default class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.deleteAppointment = this.deleteAppointment.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this);
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

    onChangeDate(date) {
        this.setState({
          date: date
        });
      }

    render() {
        const AppointmentList = () => {
            const [searchTerm, setSearchTerm] = useState("");
            const [selectedDate, setSelectedDate] = useState(null);
            const filteredAppointments = this.state.appointments.filter(
                appointment => {
                    // Filter the appointments based on the search term and selected date
                    return (
                        (appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        appointment.patient.toLowerCase().includes(searchTerm.toLowerCase())) &&
                        (selectedDate === null || appointment.date?.substring(0, 10) === selectedDate)
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
                                appointment={currentAppointment}
                                deleteAppointment={this.deleteAppointment}
                            />
                        );
                    })}
                </div>
            );
        };

        return <AppointmentList />;
      }
}