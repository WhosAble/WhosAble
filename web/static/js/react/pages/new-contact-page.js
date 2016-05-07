import {browserHistory} from 'react-router'
var NavBar = require("../nav-bar");
var ContactForm = require("../forms/contact-form");

var NewContactPage = React.createClass({
  handleCreate(contactID) {
    browserHistory.push("/app/contacts");
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <h1>Create a Contact</h1>
            <ContactForm serviceID={this.props.params.serviceID} onCreate={this.handleCreate}/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = NewContactPage;
