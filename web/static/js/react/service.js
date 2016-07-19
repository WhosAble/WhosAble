var Service = React.createClass({
  render() {
    return(
      <div className="service">
        {this.props.service.name}
      </div>
    );
  }
});

module.exports = Service;
