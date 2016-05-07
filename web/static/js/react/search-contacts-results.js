var Contact = require("./contact");
import _ from "lodash";

var SearchContactsResults = React.createClass({
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

  matchesField(field) {
    var searchOn = this.props.search.split(" ");
    var found = false;
    if(searchOn.length > 0) {
      searchOn.forEach(function(search) {
        if(search != "" && field.search(new RegExp(search, "i")) != -1) {
          found = true;
        }
      });
    }
    return found;
  },

  matchesContact(contact) {
    return this.matchesField(contact.first_name) || this.matchesField(contact.last_name) || this.matchesField(contact.email);
  },

  renderList() {
    var self = this;
    var list = _.compact(this.state.contacts.map(function(contact, index) {
      if(self.matchesContact(contact)) {
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
      <div className="contact-list">
        { this.renderList() }
      </div>
    );
  }
});

module.exports = SearchContactsResults;
