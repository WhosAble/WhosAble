var CreateBtn = require("./create-btn");
var Job = require("./job-list-job");
import _ from "lodash";

var JobList = React.createClass({
  handleCreate() {
    browserHistory.push("/app/jobs/new")
  },

  renderJobs(monthTime) {
    var self = this;
    var jobs = [];
    this.props.jobs.forEach(function(job) {
      var startTime = moment(job.start);
      if(startTime.month() == monthTime.month()) {
        jobs.push(
          <Job key={"job" + job.id} job={job}/>
        );
      }
    });
    if(_.isEmpty(jobs)) {
      return(<noscript/>);
    } else {
      return(
        <div>
          <div className="month-header">
            <div className="month-header-text">{monthTime.format("MMMM")}</div>
          </div>
          {jobs}
        </div>
      );
    }
  },

  render() {
    if(this.props.jobs == null || this.props.jobs.length == 0) {
      return <CreateBtn title="Create a new Job" onCreate={ this.handleCreate }/>
    }

    var startMonthTime = moment().startOf('month');

    return(
      <div className="jobs">
        {this.renderJobs(startMonthTime)}
        {this.renderJobs(startMonthTime.add(1, 'month'))}
        {this.renderJobs(startMonthTime.add(1, 'month'))}
        {this.renderJobs(startMonthTime.add(1, 'month'))}
        {this.renderJobs(startMonthTime.add(1, 'month'))}
      </div>
    );
  },
});

module.exports = JobList;
