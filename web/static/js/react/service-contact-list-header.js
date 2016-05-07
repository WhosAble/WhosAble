import {browserHistory} from 'react-router';

var ServiceContactListHeader = React.createClass({
  handleCreate() {
    if(this.props.service == null) {
      browserHistory.push("/app/contacts/new")
    } else {
      browserHistory.push("/app/contacts/new/services/" + this.props.service.id)
    }
  },

  renderTitle() {
    if(this.props.service == null) {
      return(<h3>No Service Type</h3>);
    } else {
      return(<h3>{this.props.service.name}</h3>);
    }
  },

  render() {
    return(
      <div className="service-contact-list-header">
        <div className="new-contact-btn" onClick={ this.handleCreate }>New Contact</div>
        { this.renderTitle() }
      </div>
    );
  }
});

module.exports = ServiceContactListHeader
