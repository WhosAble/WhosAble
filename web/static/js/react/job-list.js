var CreateBtn = require("./create-btn");
var Job = require("./job-list-job");
import _ from "lodash";
import {browserHistory} from 'react-router';

var JobList = React.createClass({
  handleCreate() {
    browserHistory.push("/app/jobs/new")
  },

  renderJobs(monthTime) {
    var jobs = [];
    this.props.jobs.forEach(function(job) {
      var startTime = moment(job.start);
      if(startTime.month() == monthTime.month()) {
        jobs.push(
          <Job key={"job" + job.id} job={job}/>
        );
      }
    });
    if(!_.isEmpty(jobs)) {
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

  renderCreateBtn() {
    return(<CreateBtn title="Create a new Job" onCreate={ this.handleCreate }/>);
  },

  render() {
    if(this.props.jobs.length == 0) {
      return this.renderCreateBtn();
    }

    var startMonthTime = moment().startOf('month');
    var thisMonth = this.renderJobs(startMonthTime);
    var nextMonth = this.renderJobs(startMonthTime.add(1, 'month'))
    var twoMonths = this.renderJobs(startMonthTime.add(1, 'month'))
    var threeMonths = this.renderJobs(startMonthTime.add(1, 'month'))
    var fourMonths = this.renderJobs(startMonthTime.add(1, 'month'))

    //show future jobs if there are any
    if(thisMonth != null || nextMonth != null || twoMonths != null || threeMonths != null || fourMonths != null) {
      return(
        <div className="jobs">
          {thisMonth}
          {nextMonth}
          {twoMonths}
          {threeMonths}
          {fourMonths}
        </div>
      );
    } else {
      //no future jobs
      return this.renderCreateBtn();
    }
  },
});

module.exports = JobList;
