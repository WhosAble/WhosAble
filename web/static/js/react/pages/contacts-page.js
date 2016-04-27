var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");
import {browserHistory} from 'react-router';

var ContactsPage = React.createClass({
  handleCreate() {
    browserHistory.push("/app/contacts/new")
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <CreateBtn title="Create a new Contact" onCreate={ this.handleCreate }/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = ContactsPage;
