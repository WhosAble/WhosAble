var Location = React.createClass({
  render() {
    return(
      <div className="location">
          <div className="location-address">{this.props.addresses.address}</div>
          <div className="location-citythruzip">{this.props.addresses.city},{this.props.addresses.state} {this.props.addresses.zip}</div>
      </div>
    );
  }
});

module.exports = Location;
