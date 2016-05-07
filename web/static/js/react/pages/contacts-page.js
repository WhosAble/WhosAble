var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");
var ContactList = require("../contact-list");
import _ from "lodash";
import {browserHistory} from 'react-router';

var ContactsPage = React.createClass({
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

  handleCreate() {
    browserHistory.push("/app/contacts/new")
  },

  renderBtn() {
    if(this.state.contacts == null || _.isEmpty(this.state.contacts)) {
      return(
        <CreateBtn title="Create a new Contact" onCreate={ this.handleCreate }/>
      );
    }
  },

  renderList() {
    if(this.state.contacts != null && !_.isEmpty(this.state.contacts)) {
      return(
        <div className="row">
          <div className="col-xs-12">
            <div className="contact-list-header">
            </div>
            <ContactList contacts={this.state.contacts} services={this.state.services}/>
          </div>
        </div>
      );
    }
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            { this.renderBtn() }
            { this.renderList() }
          </main>
        </div>
      </div>
    );
  }
});

module.exports = ContactsPage;
