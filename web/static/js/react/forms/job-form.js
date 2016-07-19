import _ from "lodash";
import {browserHistory, Link} from 'react-router';


var JobForm = React.createClass({
  getInitialState() {
    return {
      startformopen: false,
      endformopen: false,
      allSelected: true
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    var job = {
      service_id: this.props.serviceID,
      address_id: this.props.locationID,
      start: "2016/05/29 00:00:00",
      start: "2016-05-29T00:00:00Z",
      end: "2016-05-29T00:05:00Z"
    }
    var contacts = [];
    this.props.contacts.forEach(function(contact) {
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
    var selectedLocation = null;
    this.props.locations.forEach((location) => {
      if(location.id == this.props.locationID) {
        selectedLocation = location;
      }
    });
    return selectedLocation;
  },

  getSelectedService() {
    var selectedService = null;
    this.props.services.forEach((service) => {
      if(service.id == this.props.serviceID) {
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
    if(this.props.services.length == 0) {
      this.props.onFormChange("new-type");
    } else {
      this.props.onFormChange("type");
    }
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
    if(this.props.locations == null || this.props.locations.length <= 0) { return <noscript/> }

    var location = this.getSelectedLocation();
    return(
      <div>{location.address}</div>
    );
  },

  renderServiceType() {
    if(this.props.services == null || this.props.services.length == 0) { return <noscript/> }

    var service = this.getSelectedService();
    if(service == null) { return <noscript/>; }

    return(
      <div>{service.name}</div>
    );
  },

  checkTheBox(contactID) {
    var newContactIDs = this.props.selectedContactIDs;
    newContactIDs.push(contactID);
    var allSelected = false;
    if(this.isAllContactIDs(newContactIDs)) {
      allSelected = true;
    }
    this.setState({allSelected: allSelected, selectedContactIDs: newContactIDs})
  },

  uncheckTheBox(contactID) {
    var newContactIDs = this.props.selectedContactIDs;
    newContactIDs.splice(_.indexOf(newContactIDs, contactID), 1);
    var allSelected = false;
    if(this.isAllContactIDs(newContactIDs)) {
      allSelected = true;
    }
    this.setState({allSelected: allSelected, selectedContactIDs: newContactIDs})
  },

  isAllContactIDs(contactIDs) {
    return _.isEqual(this.props.allContactIDs.sort(), contactIDs.sort());
  },

  selectAll() {
   if(this.isAllContactIDs(this.props.selectedContactIDs)) {
     this.setState({allSelected: false, selectedContactIDs: []});
   } else {
     this.setState({allSelected: true, selectedContactIDs: this.props.allContactIDs});
   }
  },

  renderSelectAll() {
    if(this.state.allSelected) {
      return(<input type="checkbox" checked={true} id="selectall" onClick={this.selectAll}/>);
    } else {
      return(<input type="checkbox" id="selectall" onClick={this.selectAll}/>);
    }
  },

  renderContactCB(contactID) {
    if(_.indexOf(this.props.selectedContactIDs, contactID) != -1) {
      return(<input type="checkbox" checked={true} onClick={this.uncheckTheBox.bind(this, contactID)}/>);
    } else {
      return(<input type="checkbox" onClick={this.checkTheBox.bind(this, contactID)}/>);
    }
  },

  renderContacts() {
   if(this.props.contacts == null || this.props.contacts.length == 0){return <noscript/>}

   var filteredContacts = this.props.contacts.map((contact) => {
     if(contact.service_id == this.props.serviceID) {
       return(
          <div className="job-form-contact" key={contact.id}>
            <div className="contact-checkbox">{this.renderContactCB(contact.id)}</div>
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
            <div className="job-form-section-title">3 Start Time</div>
          </div>
          <div id="enterstarttime" className="col-xs-12 col-md-4">
            <div>{this.props.startTime.format('MMMM Do YYYY, h:mm a')}</div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="change" onClick={this.switchToStartFormOpen}>change</div>
          </div>
        </div>
      )
      } else {
        return(
          <div id="starttimediv" className="row">
            <div className="col-xs-12 col-md-4">
              <div className="job-form-section-title">3 Start Time</div>
            </div>
            <div id="enterstarttime" className="col-xs-12 col-md-4">
              <input type="date" defaultValue={this.props.startTime.format("YYYY-MM-DD")} ref="startdate"/>
              <input type="time" defaultValue={this.props.startTime.format("HH:mm")} ref="start_time"/>
            </div>
            <div className="col-xs-12 col-md-4">
              <div className="change" onClick={this.setStartTime}>set</div>
            </div>
          </div>
        )
      }
  },

  renderEndTime() {
    if(this.state.endformopen == false) {
      return(
        <div id="endtimediv" className="row">
          <div className="col-xs-12 col-md-4">
            <div className="job-form-section-title">3 End Time</div>
          </div>
          <div id="enterendtime" className="col-xs-12 col-md-4">
            <div>{this.props.endTime.format('MMMM Do YYYY, h:mm a')}</div>
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="change" onClick={this.switchToEndFormOpen}>change</div>
          </div>
        </div>
      )
      } else {
        return(
          <div id="endtimediv" className="row">
            <div className="col-xs-12 col-md-4">
              <div className="job-form-section-title">3 End Time</div>
            </div>
            <div id="enterendtime" className="col-xs-12 col-md-4">
              <input type="date" defaultValue={this.props.endTime.format("YYYY-MM-DD")} ref="enddate"/>
              <input type="time" defaultValue={this.props.endTime.format("HH:mm")} ref="end_time"/>
            </div>
            <div className="col-xs-12 col-md-4">
              <div className="change" onClick={this.setEndTime}>set</div>
            </div>
          </div>
        )
      }
  },

  render() {
    return(
      <form className="job-form" onSubmit={ this.handleSubmit }>
        <div id="servicediv" className="row">
          <div className="col=xs-12 col-md-4">
            <div className="job-form-section-title">1 Service Type</div>
          </div>
          <div className="col-xs-12 col-md-4">
            { this.renderServiceType() }
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="change" onClick={this.switchToServiceTypeForm}>change</div>
          </div>
        </div>

        <hr/>

        <div id="locationdiv" className="row">
          <div className="col-xs-12 col-md-4">
            <div className="job-form-section-title">2     Location</div>
          </div>
          <div className="col-xs-12 col-md-4">
            { this.renderLocation() }
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="change" onClick={this.switchToLocationForm}>change</div>
          </div>
        </div>

        <hr/>

        {this.renderStartTime() }

        <hr/>

        {this.renderEndTime() }

        <hr/>

        <div id="contactsdiv" className="row">
          <div className="col-xs-12 col-md-4">
            <div className="job-form-section-title">5 Contacts</div>
          </div>
          <div className="col-xs-12 col-md-4">
            {this.renderSelectAll() } Select All
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="change" onClick={this.switchToContactForm}>new contact</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-4">
          </div>
          <div id="contacts-by-service" className="col-xs-12 col-md-8">
            {this.renderContacts() }
          </div>
        </div>

        <hr/>

        <div className="btn btn-primary pull-right" onClick={ this.handleSubmit }>Create Job</div>
      </form>
    );
  }
});

module.exports = JobForm;
