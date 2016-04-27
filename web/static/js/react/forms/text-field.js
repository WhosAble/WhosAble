var TextField = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    errors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange(e) {
    this.props.onChange(e.target.value);
  },

  render() {
    if(this.props.errors) {
      var errors = this.props.errors.map(function(error, index) {
        if(typeof error != "undefined") {
          return(<div key={ index } className="error">{ error.message }</div>);
        }
      });
    }
    return(
      <div className="form-group">
        <label className="control-label">{ this.props.label }</label>
        <input type={ this.props.type } className="form-control" value={ this.props.value } onChange={ this.handleChange }/>
        <div>{ errors }</div>
      </div>
    );
  }
});

module.exports = TextField;
