import React, {Component, useState} from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default class AddAppointement extends Component {
    constructor(props) {
        super(props)
        //this.onChangeActivity = this.onChangeActivity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);  
        this.state = {
            title: "",
            doctor: "",
            patient: "",
            datepicker: new Date(),
            date: new Date(),
            time: "09:00",
            type: "General",
            office: "",
            insurance: true,
            clinics:[]
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;
        this.setState({
          [name]: value
        });
      }

      handleDateChange(date) {  
        const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
        this.setState({  
            datepicker: date,
            date: date.toLocaleDateString(undefined, options),
            time: date.toTimeString().substring(0,5)
        })
      }  

    onSubmit(e) {
        e.preventDefault();
        const appointment = {
            title: this.state.title,
            doctor: this.state.doctor,
            patient: this.state.patient,
            date: this.state.date,
            time: this.state.time,
            type: this.state.type,
            office: this.state.office,
            room: "01",
            insurance: this.state.insurance,
        }
        console.log(appointment)
        axios.post("https://appointmentapi-lm5l.onrender.com/appointments/add", appointment).then((res) => { 
            console.log(res)
            window.location = "/";
        });
    }

    componentDidMount() {
        axios.get('https://opendata.vancouver.ca/api/records/1.0/search/?dataset=business-licences&q=clinic&start=2022&facet=folderyear&facet=licencerevisionnumber&facet=status&facet=issueddate&facet=businesstype&facet=businesssubtype&facet=city&facet=province&facet=localarea&facet=numberofemployees')
            .then(response => {
                this.setState({ clinics: response.data.records, office:response.data.records[0].fields.businessname})
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    ClinicsList() {
        return this.state.clinics.map(currentClinic => {
            return <option>{currentClinic.fields.businessname}</option>;
        })
    }
    

    render() {
        return(
            <div>
                <h3>Add An Appointment</h3>
                <form onSubmit={this.onSubmit}>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" value={this.state.title} onChange={this.handleInputChange} aria-describedby="emailHelp" placeholder="Enter Title"/>
                </div>
                <div class="form-group">
                    <label for="doctor">Doctor</label>
                    <input type="text" class="form-control" id="doctor" value={this.state.doctor} onChange={this.handleInputChange} placeholder="Doctor Name"/>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="patient" value={this.state.patient} onChange={this.handleInputChange} placeholder="Name"/>
                </div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <DatePicker
                    showTimeSelect
                    selected={this.state.datepicker}
                    onChange={this.handleDateChange}
                    />
                </div>
                <div class="form-group">
                    <label for="type">Appointment type</label>
                    <select class="form-control" id="type" value={this.state.type} onChange={this.handleInputChange}>
                    <option>General</option>
                    <option>Mental Health</option>
                    <option>Naturopathic Medicine</option>
                    <option>Prescriptions</option>
                    <option>Skin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="office">Location</label>
                    <select class="form-control" id="office" value={this.state.office} onChange={this.handleInputChange}>
                    {this.ClinicsList()}
                    </select>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="insurance" checked={this.state.insurance} onChange={this.handleInputChange}/>
                    <label class="form-check-label" for="insurance">I have health card</label>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}