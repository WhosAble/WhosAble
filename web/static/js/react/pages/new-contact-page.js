var ContactForm = require("../forms/contact-form");
import {browserHistory} from 'react-router'

var NewContactPage = React.createClass({
  handleCreate(contactID) {
    browserHistory.push("/app/contacts");
  },

  render() {
    return(
      <div>
        <h1>Create a Contact</h1>
        <ContactForm serviceID={this.props.params.serviceID} onCreate={this.handleCreate}/>
      </div>
    );
  }
});

module.exports = NewContactPage;
