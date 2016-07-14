var CreateBtn = require("../create-btn");
import {browserHistory} from 'react-router';

var DashboardPage = React.createClass({
  handleCreate() {
    browserHistory.push("/app/jobs/new")
  },

  render() {
    return(
      <div>
        <CreateBtn title="Create a new Job" onCreate={ this.handleCreate }/>
      </div>
    );
  }
});

module.exports = DashboardPage;
