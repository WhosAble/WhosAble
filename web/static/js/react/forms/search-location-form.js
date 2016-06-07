var TextField = require("./text-field");

var SearchLocationForm = React.createClass({
  search(e) {
    e.preventDefault();
    this.props.onSearch();
  },

  render() {
    return(
      <form onSubmit={ this.search }>
        <TextField placeholder="Search" value={ this.props.search } errors={ [] } onChange={ this.props.onSearchChange }/>
      </form>
    );
  }
});

module.exports = SearchLocationForm;
