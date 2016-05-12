var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");
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

  renderContacts(job) {
    if(job.contacts.length == 0) { return <noscript/> }

    var contacts = job.contacts.map(function(contact) {
      return(
        <div key={"contact" + contact.id}>
          <div>First Name: {contact.first_name}</div>
          <div>Last Name: {contact.last_name}</div>
          <div>Response: {contact.response}</div>
          <br/>
        </div>
      );
    });
    return(
      <div className="contacts">
        {contacts}
      </div>
    );
  },

  renderJobs() {
    if(this.state.jobs == null || this.state.jobs.length == 0) { return <noscript/> }
    var self = this;

    return this.state.jobs.map(function(job) {
      return(
        <div key={"job" + job.id}>
          <div>Job ID: {job.id}</div>
          <div>Service: {job.service_name}</div>
          <div>Address: {job.address.address}, {job.address.city}, {job.address.state} {job.address.zip}</div>
          <div>Time: {job.start} - {job.end}</div>
          <br/>
          {self.renderContacts(job)}
        </div>
      );
    });
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <CreateBtn title="Create a new Job" onCreate={ this.handleCreate }/>
            { this.renderJobs() }
          </main>
        </div>
      </div>
    );
  }
});

module.exports = JobsPage;