var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");
var SearchLocationForm = require("../forms/search-location-form");
var SearchLocationResults = require("../search-location-results");
var LocationList = require("../location-list");
import _ from "lodash";
import {browserHistory} from 'react-router';
import {Link} from 'react-router'
var LocationForm = require("../forms/location-form");

var LocationsPage = React.createClass({
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

  handleCreate() {
    browserHistory.push("/app/newlocationspage")
  },

  handleSearch() {
  },

  handleSearchChange(val) {
    this.setState({search: val});
    this.handleSearch();
  },

  renderLocationList() {
    if(this.state.search == "") {
      return(
        <LocationList addresses={this.state.addresses} services={this.state.services}/>
      );
    }
  },

  renderList() {
    if(this.state.addresses != null && !_.isEmpty(this.state.addresses)) {
      return(
        <div className="row">
          <div className="col-xs-12">
            <div className="location-list-header">
              <SearchLocationForm search={ this.state.search } onSearchChange={ this.handleSearchChange } onSearch={ this.handleSearch }/>
            </div>
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
        <SearchResults search={ this.state.search }/>
      );
    }
  },

  render() {
    return(
      <div id="LocationsPage">
      <NavBar/>
      <h4>Locations
      <Link to="/app/newlocationspage">Add New Location
      </Link>
      </h4>
      <hr/>
      {this.renderList()}
      </div>
    );
  }
});
module.exports = LocationsPage;
