var Location = React.createClass({
  render() {
    return(
      <div className="location">
          <div className="location-address">{this.props.addresses.address}</div>
          <div className="location-city">{this.props.addresses.city}</div>
          <div className="location-state">{this.props.addresses.state}</div>
          <div className="location-zip">{this.props.addresses.zip}</div>
      </div>
    );
  }
});

module.exports = Location;
