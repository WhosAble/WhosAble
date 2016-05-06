var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");
var Contact = require("../contact");
import _ from "lodash";

import {browserHistory} from 'react-router';

var ContactsPage = React.createClass({
  getInitialState() {
    return {
      contacts: null
    };
  },

  componentDidMount() {
    window.ContactsStore.subscribe(this.receiveState);
  },

  componentWillUnmount() {
    window.ContactsStore.unsubscribe(this.receiveState);
  },

  receiveState(contacts) {
    this.setState({contacts: contacts});
  },

  handleCreate() {
    browserHistory.push("/app/contacts/new")
  },

  renderBtn() {
    if(this.state.contacts == null || this.state.contacts.length == 0) {
      return(
        <CreateBtn title="Create a new Contact" onCreate={ this.handleCreate }/>
      );
    } else {
      return(
        <div className="btn btn-primary" onClick={ this.handleCreate }>New Contact</div>
      );
    }
  },

  renderList() {
    if(this.state.contacts == null || this.state.contacts.length == 0) {
      return(
        <CreateBtn title="Create a new Contact" onCreate={ this.handleCreate }/>
      );
    } else {
      var list = _.values(this.state.contacts).map(function(contact, index) {
        return(<Contact key={index} contact={contact}/>);
      });
      return(<div className="contact-list">{ list }</div>);
    }
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <div className="row">
              <div className="col-xs-12">
                <div className="contact-list-header">
                  <div className="row">
                    <div className="col-xs-12 col-md-10">
                    </div>
                    <div className="col-xs-12 col-md-2">
                      { this.renderBtn() }
                    </div>
                  </div>
                </div>
                { this.renderList() }
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = ContactsPage;
