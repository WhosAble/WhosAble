var Service = React.createClass({
  handleSelect() {
    this.props.onSelect(this.props.service.id);
  },

  render() {
    return(
      <div className="service" onClick={this.handleSelect}>
        {this.props.service.name}
      </div>
    );
  }
});

module.exports = Service;
