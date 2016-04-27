var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");
import {browserHistory} from 'react-router';

var JobsPage = React.createClass({
  handleCreate() {
    browserHistory.push("/app/jobs/new")
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <CreateBtn title="Create a new Job" onCreate={ this.handleCreate }/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = JobsPage;