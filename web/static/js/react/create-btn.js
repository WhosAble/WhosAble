var CreateBtn = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    onCreate: React.PropTypes.func.isRequired
  },

  render() {
    return(
      <div id="createbutton" onClick={ this.props.onCreate }>
        <i className="fa fa-plus"></i>
        <div id="button-label">{ this.props.title }</div>
      </div>
    );
  }
});

module.exports = CreateBtn;
