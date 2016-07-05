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
      endformopen: false
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
    if(this.state.contactID == null && contacts.length > 0) {
      newState.contactID = contacts[0].id;
    }
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

  getSelectedContact() {
    var self = this;
    var selectedContact = null;
    this.state.contacts.forEach(function(contact) {
      if(contact.id == self.state.contactID) {
        selectedContact = contact;
      }
    });
    return selectedContact;
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

  renderContacts() {
    if(this.state.contacts == null || this.state.contacts.length == 0) {return <noscript/> }

    var contact = this.getSelectedContact();
    return(
      <div>{contact.first_name} {contact.last_name}</div>
    );
  },

  renderOldContactList() {
      return(
        <ContactList contacts={this.state.contacts}/>
      );
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
        <div id="timechange" onclick={this.switchToStartFormOpen}>change</div>
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
          <input type="date" name="startdate"/>
          <input type="time" name="usr_time"/>
          </div>
          <div className="col-xs-12 col-md-4">
          <div id="timechange">set</div>
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
        <div id="servicetypechange" onClick={this.switchToServiceTypeForm}>change</div>
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
        <div id="locationchange" onClick={this.switchToLocationForm}>change</div>
        </div>
        <br/>
        </div>
        <hr/>


        {this.renderStartTime() }
        <hr/>


        <div id="endtimediv" className="row">
        <div className="col-xs-12 col-md-4">
        <div id="header">4     End Time</div>
        </div>
        <div className="col-xs-12 col-md-4">
        <div>{this.state.endTime.format('MMMM Do YYYY, h:mm a')}</div>
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="timechange">change</div>
        </div>
        <br/>
        </div>
        <hr/>


        <div id="contactsdiv" className="row">
        <div className="col-xs-12 col-md-4">
        <div id="header">5     Contacts</div>
        </div>
        <div className="col-xs-12 col-md-4">
        contacts list
        </div>
        <div className="col-xs-12 col-md-4">
        <div id="newcontact" onClick={this.switchToContactForm}>new contact</div>
        </div>
        <br/>
        <br/>
        </div>
        <hr/>

        <div id="createjobbutton" className="btn btn-primary" onClick={ this.handleSubmit }>Create Job</div>
      </form>
    );
  }
});

module.exports = JobForm;
