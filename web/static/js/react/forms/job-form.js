var NavBar = require("../nav-bar");
var ContactList = require("../contact-list");
var LocationForm = require("../forms/location-form");
var ContactForm = require("../forms/contact-form");
import _ from "lodash";
import {browserHistory, Link} from 'react-router';


var JobForm = React.createClass({
  getInitialState() {
    return {
      services: null,
      locations: null,
      contacts: null,
      serviceID: null,
      locationID: null,
      startTime: moment().add(1, 'day'),
      endTime: moment().add(2, 'day'),
      startformopen: false,
      endformopen: false,
      selectedContactIDs: []
    };
  },

  componentDidMount() {
    window.ServiceStore.subscribe(this.receiveServices);
    window.AddressStore.subscribe(this.receiveLocations);
    window.ContactsStore.subscribe(this.receiveContacts);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveServices);
    window.AddressStore.unsubscribe(this.receiveLocations);
    window.ContactsStore.unsubscribe(this.receiveContacts);
  },

  receiveContacts(contacts) {
    var newState = {contacts: contacts};
    this.setState(newState);
  },

  receiveLocations(locations) {
    var newState = {locations: locations};
    if(this.state.locationID == null && locations.length > 0) {
      newState.locationID = locations[0].id;
    }
    this.setState(newState);
  },

  receiveServices(services) {
    var newState = {services: services};
    if(this.state.serviceID == null && services.length > 0) {
      newState.serviceID = services[0].id;
    }
    this.setState(newState);
  },

  handleSubmit(e) {
    e.preventDefault();
    var job = {
      service_id: this.state.serviceID,
      address_id: this.state.locationID,
      start: "2016/05/29 00:00:00",
      start: "2016-05-29T00:00:00Z",
      end: "2016-05-29T00:05:00Z"
    }
    var contacts = [];
    this.state.contacts.forEach(function(contact) {
      contacts.push(contact.id);
    });
    window.Dispatcher.createJob(job, contacts)
      .receive("ok", (resp) => {
        this.props.onCreate("job", resp.job_id);
      }).receive("error", (resp) => {
        this.setState({errors: resp.errors});
      });
  },

  getSelectedLocation() {
    var self = this;
    var selectedLocation = null;
    this.state.locations.forEach(function(location) {
      if(location.id == self.state.locationID) {
        selectedLocation = location;
      }
    });
    return selectedLocation;
  },

  getSelectedService() {
    var self = this;
    var selectedService = null;
    this.state.services.forEach(function(service) {
      if(service.id == self.state.serviceID) {
        selectedService = service;
      }
    });
    return selectedService;
  },

  handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },

  parseErrors(field) {
    if(this.state.errors.length == 0) { return []; }

    return this.state.errors.map(function(error) {
      if(error.field == field) { return error; }
    });
  },

  switchToLocationForm() {
    this.props.onFormChange("location");
  },

  switchToServiceTypeForm() {
    this.props.onFormChange("type");
  },

  switchToContactForm() {
    this.props.onFormChange("contacts");
  },

  switchToStartFormOpen() {
    this.setState({startformopen: true});
  },

  switchToEndFormOpen() {
    this.setState({endformopen: true});
  },

  renderLocation() {
    if(this.state.locations == null || this.state.locations.length <= 0) { return <noscript/> }

    var location = this.getSelectedLocation();
    return(
      <div>{location.address}</div>
    );
  },

  renderServiceType() {
    if(this.state.services == null || this.state.services.length == 0) { return <noscript/> }

    var service = this.getSelectedService();
    return(
      <div>{service.name}</div>
    );
  },

  checkTheBox(contactID) {
    var newContactIDs = this.state.selectedContactIDs;
    newContactIDs.push(contactID);
    this.setState({selectedContactIDs: newContactIDs})
  },
  uncheckTheBox(contactID) {
    var newContactIDs = this.state.selectedContactIDs;
    newContactIDs.splice(_.indexOf(newContactIDs, 1));
    this.setState({selectedContactIDs: newContactIDs})
  },

  renderSelectAll() {
    return(<input type="checkbox" id="selectall" onClick="selectAll"/>);
  },

  renderContactCB(contactID) {
   if(_.indexOf(this.state.selectedContactIDs, contactID) != -1) {
     return(<input type="checkbox" checked={true} onClick={this.uncheckTheBox.bind(this, contactID)}/>);
   } else {
      return(<input type="checkbox" onClick={this.checkTheBox.bind(this, contactID)}/>);
   }
 },

  renderContacts() {
   if(this.state.contacts == null || this.state.contacts.length == 0){return <noscript/>}

   var filteredContacts = this.state.contacts.map((contact) => {
     if(contact.service_id == this.state.serviceID) {
       return(
          <div key={contact.id}><div className="contact-checkbox">{this.renderContactCB(contact.id)}</div>
          <div className="contact-name">{contact.first_name} {contact.last_name}</div>
          <div className="contact-email">{contact.email}</div>
          <div className="contact-phone">{contact.phone}</div>
          </div>
       );
     }
   });
   return _.compact(filteredContacts);
 },

  setStartTime() {
    this.setState({
      startTime: moment(this.refs["startdate"].value + " " + this.refs["start_time"].value),
      startformopen: false
    });
  },

  setEndTime() {
    this.setState({
      endTime: moment(this.refs["enddate"].value + " " + this.refs["end_time"].value),
      endformopen: false
    });
  },

  renderStartTime() {
    if(this.state.startformopen == false) {
      return(
        <div id="starttimediv" className="row">
        <div className="col-xs-12 col-md-4">
        <div id="header">3     Start Time</div>
        </div>
        <div id="enterstarttime" className="col-xs-12 col-md-4">
        <div>{this.state.startTime.format('MMMM Do YYYY, h:mm a')}</div>
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="change" onClick={this.switchToStartFormOpen}>change</div>
        </div>
        <br/>
        </div>
      )
      } else {
        return(
          <div id="starttimediv" className="row">
          <div className="col-xs-12 col-md-4">
          <div id="header">3     Start Time</div>
          </div>
          <div id="enterstarttime" className="col-xs-12 col-md-4">
          <input type="date" defaultValue={this.state.startTime.format("YYYY-MM-DD")} ref="startdate"/>
          <input type="time" defaultValue={this.state.startTime.format("HH:mm")} ref="start_time"/>
          </div>
          <div className="col-xs-12 col-md-4">
          <div id="change" onClick={this.setStartTime}>set</div>
          </div>
          <br/>
          </div>
        )
      }
  },

  renderEndTime() {
    if(this.state.endformopen == false) {
      return(
        <div id="endtimediv" className="row">
        <div className="col-xs-12 col-md-4">
        <div id="header">3     End Time</div>
        </div>
        <div id="enterendtime" className="col-xs-12 col-md-4">
        <div>{this.state.endTime.format('MMMM Do YYYY, h:mm a')}</div>
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="change" onClick={this.switchToEndFormOpen}>change</div>
        </div>
        <br/>
        </div>
      )
      } else {
        return(
          <div id="endtimediv" className="row">
          <div className="col-xs-12 col-md-4">
          <div id="header">3     End Time</div>
          </div>
          <div id="enterendtime" className="col-xs-12 col-md-4">
          <input type="date" defaultValue={this.state.endTime.format("YYYY-MM-DD")} ref="enddate"/>
          <input type="time" defaultValue={this.state.endTime.format("HH:mm")} ref="end_time"/>
          </div>
          <div className="col-xs-12 col-md-4">
          <div id="change" onClick={this.setEndTime}>set</div>
          </div>
          <br/>
          </div>
        )
      }
  },

  render() {
    return(
      <form onSubmit={ this.handleSubmit }>

        <div id="servicediv" className="row">
        <div className="col=xs-12 col-md-4">
        <div id="header">1     Service Type</div>
        </div>
        <div className="col-xs-12 col-md-4">
        { this.renderServiceType() }
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="change" onClick={this.switchToServiceTypeForm}>change</div>
        </div>
        <br/>
        </div>
        <hr/>

        <div id="locationdiv" className="row">
        <div className="col-xs-12 col-md-4">
        <div id="header">2     Location</div>
        </div>
        <div className="col-xs-12 col-md-4">
        { this.renderLocation() }
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="change" onClick={this.switchToLocationForm}>change</div>
        </div>
        <br/>
        </div>
        <hr/>


        {this.renderStartTime() }
        <hr/>


        {this.renderEndTime() }
        <hr/>


        <div id="contactsdiv" className="row">
        <div className="col-xs-12 col-md-4">
        <div id="header">5     Contacts</div>
        </div>
        <div className="col-xs-12 col-md-4">
        {this.renderSelectAll() } Select All
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="change" onClick={this.switchToContactForm}>new contact</div>
        </div>
        <br/>
        <br/>
        </div>
        <div className="row">
        <div className="col-xs-12 col-md-4">
        </div>
        <div id="contactsbyservice" className="col-xs-12 col-md-8">
        {this.renderContacts() }
        </div>
        </div>
        <hr/>

        <div id="createjobbutton" className="btn btn-primary" onClick={ this.handleSubmit }>Create Job</div>
      </form>
    );
  }
});

module.exports = JobForm;
