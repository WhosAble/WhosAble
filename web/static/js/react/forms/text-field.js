var TextField = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    errors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange(e) {
    this.props.onChange(e.target.value);
  },

  renderErrors() {
    if(this.props.errors) {
      return this.props.errors.map(function(error, index) {
        if(typeof error != "undefined") {
          return(<div key={ index } className="error">{ error.message }</div>);
        }
      });
    }
  },

  render() {

    return(
      <div className="form-group">
        <label className="control-label">{ this.props.label }</label>
        <input type="text" className="form-control" value={ this.props.value } onChange={ this.handleChange }/>
        <div className="errors">{ this.renderErrors() }</div>
      </div>
    );
  }
});

module.exports = TextField;
