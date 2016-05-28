var JobListJob = React.createClass({
  renderContacts(job) {
    if(job.contacts.length == 0) { return <noscript/> }

    var contacts = job.contacts.map(function(contact) {
      return(
        <div key={"contact" + contact.id}>{contact.first_name} {contact.last_name}</div>
      );
    });
    return(
      <div className="contacts">
        {contacts}
      </div>
    );
  },

  render() {
    var startTime = moment(this.props.job.start);
    var startTimeFormatted = startTime.format("Mo h:mm A");
    var endTime = moment(this.props.job.end);
    var endTimeFormatted = endTime.format("Mo h:mm A");
    var now = moment();
    if(startTime.isSame(endTime, 'd')) {
      endTimeFormatted = endTime.format("h:mm A");
    }
    var jobClasses = "job";
    var daysTillJob = startTime.diff(now, 'days');
    if(daysTillJob < 14) {
      jobClasses += " green-job";
    } else if(daysTillJob >= 14 && daysTillJob < 42) {
      jobClasses += " yellow-job";
    } else {
      jobClasses += " gray-job";
    }

    return(
      <div className={jobClasses}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="service-type">{this.props.job.service_name}</div>
            {this.renderContacts(this.props.job)}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="job-address">{this.props.job.address.address}</div>
            <div className="job-city">{this.props.job.address.city}, {this.props.job.address.state} {this.props.job.address.zip}</div>
            <div className="start-time">{startTimeFormatted}</div>
            <div className="end-time">{endTimeFormatted}</div>
          </div>
        </div>
      </div>
      );
  }
});

module.exports = JobListJob;
