var Location = React.createClass({
  handleSelect() {
    this.props.onSelect(this.props.addresses.id);
  },

  render() {
    return(
      <div className="location" onClick={this.handleSelect}>
          <div className="location-address">{this.props.addresses.address}</div>
          <div className="location-citythruzip">{this.props.addresses.city}, {this.props.addresses.state} {this.props.addresses.zip}</div>
      </div>
    );
  }
});

module.exports = Location;
