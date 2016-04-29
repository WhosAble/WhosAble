var NavBar = require("../nav-bar");
var JobForm = require("../forms/job-form")
var NewJobPage = React.createClass({
  render() {
    return(
      <div>
        <NavBar/>
        <JobForm/>

        New Job Form here
      </div>
    );
  }
});

module.exports = NewJobPage;
