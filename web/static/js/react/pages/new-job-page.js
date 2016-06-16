var NavBar = require("../nav-bar");
var JobForm = require("../forms/job-form")
var JobType = require("../forms/jobtype")
var LocationForm = require("../forms/location-form")
import {browserHistory} from 'react-router';

var NewJobPage = React.createClass({
  getInitialState() {
    return {
      form: "job",
      type: null
    };
  },

  handleFormChange(form, ID) {
    // TODO: Do something with the ID
    this.setState({form: form})
  },

  renderform() {
    if(this.state.form == "job") {
      return <JobForm onFormChange={this.handleFormChange}/>
    } else if(this.state.form == "type") {
      return <JobType onCreate={this.handleFormChange.bind(this, "job")}/>
    } else if(this.state.form == "contacts") {
      return <ContactForm onCreate={this.handleFormChange.bind(this, "job")}/>
    } else {
      return <LocationForm onCreate={this.handleFormChange.bind(this, "job")}/>
    }
  },

  componentDidMount() {
    window.ServiceStore.subscribe(this.receiveState);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveState);
  },

  receiveState(services) {
    this.setState({services: services});
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            {this.renderform()}
          </main>
        </div>
      </div>
    );
  }
});

module.exports = NewJobPage;
