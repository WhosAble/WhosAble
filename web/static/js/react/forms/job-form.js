var NavBar = require("../nav-bar");
var ContactList = require("../contact-list");
var LocationForm = require("../forms/location-form");
import _ from "lodash";
import {browserHistory, Link} from 'react-router';


var JobForm = React.createClass({
  getInitialState() {
    return {
      services: null,
      locations: null,
      contacts: null,
      serviceID: null,
      locationID: null
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

  switchtoContactForm() {
    this.props.onFormChange("contacts");
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

  renderContactList() {
    if(this.state.search == "") {
      return(
        <ContactList contacts={this.state.contacts}/>
      );
    }
  },

  renderList() {
    if(this.state.contacts != null && !_.isEmpty(this.state.contacts)) {
      return(
        <div className="row">
          <div className="col-xs-12">
            { this.renderContactList() }
          </div>
        </div>
      );
    }
  },

  render() {
    return(
      <form onSubmit={ this.handleSubmit }>
        <h3>1     Service Type</h3>
        { this.renderServiceType() }
        <div id="servicetypechange" onClick={this.switchToServiceTypeForm}>change</div>
        <br/>
        <hr/>

        <div id="locationdiv">
        <h3>2     Location</h3>
        { this.renderLocation() }
        <div id="locationchange" onClick={this.switchToLocationForm}>change</div>
        <br/>
        <hr/>
        </div>

        <h3>3     Start Time</h3>
        Start Date:
        <input type="date" name="startdate"/>
        <br/>
        <br/>
        Select a start time:
        <input type="time" name="usr_time"/>
        <br/>
        <hr/>

        <h3>4     End Time</h3>
        End Date:
        <input type="date" name="enddate"/>
        <br/>
        <br/>
        Select an end time:
        <input type="time" name="usr_time"/>
        <br/>
        <hr/>

        <h3>5     Contacts</h3>
        <div id="newcontact" onClick={this.switchToContactForm}>new contact</div>
        <br/>
        { this.renderList() }
        <br/>
        <hr/>

        <div id="createjobbutton" className="btn btn-primary" onClick={ this.handleSubmit }>Create Job</div>
      </form>
    );
  }
});

module.exports = JobForm;
