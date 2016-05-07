var Contact = require("./contact");
var ServiceContactListHeader = require("./service-contact-list-header");
import _ from "lodash";

var ServiceContactList = React.createClass({
  getInitialState() {
    return {
      contacts: null
    };
  },

  componentDidMount() {
    window.ContactsStore.subscribe(this.receiveContacts);
  },

  componentWillUnmount() {
    window.ContactsStore.unsubscribe(this.receiveContacts);
  },

  receiveContacts(contacts) {
    this.setState({contacts: contacts});
  },

  matchingServiceType(contact) {
    return this.props.service != null && contact.service_id == this.props.service.id;
  },

  noServiceType(contact) {
    return this.props.service == null && contact.service_id == null;
  },

  renderList() {
    var self = this;
    var list = _.compact(this.state.contacts.map(function(contact, index) {
      if(self.noServiceType(contact) || self.matchingServiceType(contact)) {
        return(<Contact key={index} contact={contact}/>);
      }
    }));
    if(_.isEmpty(list)) {
      return(<div className="no-contacts">Sorry, no contacts</div>);
    } else {
      return list;
    }
  },

  render() {
    if(this.state.contacts == null) { return(<noscript/>) }

    return(
      <div>
        <ServiceContactListHeader service={this.props.service}/>
        <div className="contact-list">
          { this.renderList() }
        </div>
      </div>
    );
  }
});

module.exports = ServiceContactList
