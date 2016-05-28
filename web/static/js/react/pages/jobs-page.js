var NavBar = require("../nav-bar");
var JobList = require("../job-list");
import {browserHistory} from 'react-router';

var JobsPage = React.createClass({
  getInitialState() {
    return {
      jobs: null
    };
  },

  componentDidMount() {
    window.JobsStore.subscribe(this.receiveJobs);
  },

  componentWillUnmount() {
    window.JobsStore.unsubscribe(this.receiveJobs);
  },

  receiveJobs(jobs) {
    this.setState({jobs: jobs});
  },

  handleCreate() {
    browserHistory.push("/app/jobs/new")
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <div style={{float: "right", cursor: "pointer"}} onClick={this.handleCreate}>Create a Job</div>
            <h3>Jobs</h3>
            <JobList jobs={this.state.jobs}/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = JobsPage;