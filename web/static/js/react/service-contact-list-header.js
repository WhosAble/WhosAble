import {browserHistory} from 'react-router';

var ServiceContactListHeader = React.createClass({
  handleCreate() {
    browserHistory.push("/app/contacts/new")
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
