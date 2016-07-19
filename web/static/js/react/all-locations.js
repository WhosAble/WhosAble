var SearchLocationForm = require("./forms/search-location-form");
var SearchLocationResults = require("./search-location-results");
var LocationList = require("./location-list");
import _ from "lodash";
import {Link} from 'react-router';

var AllLocations = React.createClass({
  getInitialState() {
    return {
      addresses: null,
      search: ""
    };
  },

  componentDidMount() {
    window.AddressStore.subscribe(this.receiveAddresses);
  },

  componentWillUnmount() {
    window.AddressStore.unsubscribe(this.receiveAddresses);
  },

  receiveAddresses(addresses) {
    this.setState({addresses: addresses});
  },

  handleNew() {
    this.props.onNew();
  },

  handleSearch() {
  },

  handleSelect(locationID) {
    this.props.onSelect(locationID);
  },

  handleSearchChange(val) {
    this.setState({search: val});
    this.handleSearch();
  },

  renderLocationList() {
    if(this.state.search == "") {
      return(
        <LocationList addresses={this.state.addresses} onSelect={this.handleSelect}/>
      );
    }
  },

  renderList() {
    if(this.state.addresses != null && !_.isEmpty(this.state.addresses)) {
      return(
        <div className="row">
          <div className="col-xs-12">
            { this.renderLocationList() }
            { this.renderSearchLocationResults() }
          </div>
        </div>
      );
    }
  },

  renderSearchLocationResults() {
    if(this.state.search != "") {
      return(
        <SearchLocationResults search={ this.state.search } onSelect={this.handleSelect}/>
      );
    }
  },

  render() {
    return(
      <div id="LocationsPage">
        <div className="location-list-header">
          <SearchLocationForm search={ this.state.search } onSearchChange={ this.handleSearchChange } onSearch={ this.handleSearch }/>
        </div>
        <div>
          <h4>
            Locations
            <a href="#" onClick={this.handleNew}>Add New Location</a>
          </h4>
          <hr/>
          {this.renderList()}
        </div>
      </div>
    );
  }
});

module.exports = AllLocations;
