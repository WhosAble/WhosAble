var NavBar = require("../nav-bar");
var JobForm = require("../forms/job-form")
var JobType = require("../forms/jobtype")
var NewJobPage = React.createClass({
  getInitialState() {
    return {
      form: "job",
      type: null
    };
  },

  handleFormChange() {
    this.setState({form: "type"})
  },

  handleSaveTypeForm(){
    this.setState({form: "job"})
  },

  renderform() {
    if(this.state.form == "job"){
      return <JobForm onFormChange={this.handleFormChange}/>
    } else {
      return <JobType onFormChange={this.handleSaveTypeForm}/>
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
        {this.renderform()}
      </div>
    );
  }
});

module.exports = NewJobPage;
