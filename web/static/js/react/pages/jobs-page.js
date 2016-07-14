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
    if(this.state.jobs == null) {
      return(<div>Loading</div>);
    } else {
      return(
        <div>
          <div style={{float: "right", cursor: "pointer"}} onClick={this.handleCreate}>Create a Job</div>
          <h3>Jobs</h3>
          <JobList jobs={this.state.jobs}/>
        </div>
      );
    }
  }
});

module.exports = JobsPage;