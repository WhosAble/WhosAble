var PhoneField = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    errors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  },

  areaCode() {
    return this.props.value.split("-")[0];
  },

  prefix() {
    return this.props.value.split("-")[1];
  },

  line() {
    return this.props.value.split("-")[2];
  },

  handleChange() {
    var areaCode = this.refs["area-code"].value.substring(0, 3);
    var prefix = this.refs["prefix"].value.substring(0, 3);
    var line = this.refs["line"].value.substring(0, 4);
    var phone = areaCode + "-" + prefix + "-" + line;
    console.log(phone);
    this.props.onChange(phone);
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
      <div className="form-group phone-form-group">
        <div>
          <label className="control-label">{ this.props.label }</label>
        </div>
        <div>
          <span className="phone-format">(</span>
          <input type="text" ref="area-code" className="area-code form-control" value={ this.areaCode() } onChange={ this.handleChange }/>
          <span className="phone-format">)</span>
          <input type="text" ref="prefix" className="prefix form-control" value={ this.prefix() } onChange={ this.handleChange }/>
          <span className="phone-format">-</span>
          <input type="text" ref="line" className="line form-control" value={ this.line() } onChange={ this.handleChange }/>
        </div>
        <div className="errors">{ this.renderErrors() }</div>
      </div>
    );
  }
});

module.exports = PhoneField;
