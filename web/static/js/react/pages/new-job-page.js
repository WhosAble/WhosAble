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
handleformchange() {
  this.setState({form: "type"})
},
handlesavetypeform(){
  this.setState({form: "job"})
},
renderform() {
if(this.state.form == "job"){
  return <JobForm onformchange={this.handleformchange}/>
} else {
  return <JobType onformchange={this.handlesavetypeform}/>
}
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
