var SearchServiceForm = require("../forms/search-service-form");
var SearchServiceResults = require("../search-service-results");
var ServicesList = require("../services-list");
import _ from "lodash";
import {browserHistory, Link} from 'react-router';

var ServicesPage = React.createClass({
  getInitialState() {
    return {
      services: null,
      search: ""
    };
  },

  componentDidMount() {
    window.ServiceStore.subscribe(this.receiveServices);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveServices);
  },

  receiveServices(services) {
    this.setState({services: services});
  },

  handleCreate() {
    browserHistory.push("/app/services/new")
  },

  handleSearch() {
  },

  handleSearchChange(val) {
    this.setState({search: val});
    this.handleSearch();
  },

  renderServicesList() {
    if(this.state.search == "") {
      return(
        <ServicesList services={this.state.services}/>
      );
    }
  },

  renderList() {
    if(this.state.services != null && !_.isEmpty(this.state.services)) {
      return(
        <div className="row">
          <div className="col-xs-12">
            { this.renderServicesList() }
            { this.renderSearchServiceResults() }
          </div>
        </div>
      );
    }
  },

  renderSearchServiceResults() {
    if(this.state.search != "") {
      return(
        <SearchServiceResults search={ this.state.search }/>
      );
    }
  },

  render() {
    return(
      <div id="ServicesPage">
        <div className="service-list-header">
          <SearchServiceForm search={ this.state.search } onSearchChange={ this.handleSearchChange } onSearch={ this.handleSearch }/>
        </div>
        <div>
          <h4>
            Services
            <Link to="/app/services/new">Add New Service</Link>
          </h4>
          <hr/>
          {this.renderList()}
        </div>
      </div>
    );
  }
});

module.exports = ServicesPage;
