var Contact = React.createClass({
  render() {
    return(
      <div className="contact">
        <div className="contact-header">
          <div className="contact-name">{this.props.contact.first_name} {this.props.contact.last_name}</div>
        </div>
        <div className="contact-body">
          <div className="contact-email">{this.props.contact.email}</div>
          <div className="contact-phone">{this.props.contact.phone}</div>
        </div>
      </div>
    );
  }
});

module.exports = Contact;
