var Location = React.createClass({
  render() {
    return(
      <div className="location">
        <div className="location-header">
          <div className="location-address">{this.props.addresses.address}</div>
        </div>
        <div className="location-body">
          <div className="location-city">{this.props.addresses.city}</div>
          <div className="location-state">{this.props.addresses.state}</div>
          <div className="location-zip">{this.props.addresses.zip}</div>
        </div>
      </div>
    );
  }
});

module.exports = Location;
