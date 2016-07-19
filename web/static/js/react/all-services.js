var SearchServiceForm = require("./forms/search-service-form");
var SearchServiceResults = require("./search-service-results");
var ServicesList = require("./services-list");
import _ from "lodash";

var AllServices = React.createClass({
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

  handleNew() {
    this.props.onNew();
  },

  handleSearch() {
  },

  handleSelect(serviceID) {
    this.props.onSelect(serviceID);
  },

  handleSearchChange(val) {
    this.setState({search: val});
    this.handleSearch();
  },

  renderServicesList() {
    if(this.state.search == "") {
      return(
        <ServicesList services={this.state.services} onSelect={this.handleSelect}/>
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
        <SearchServiceResults search={ this.state.search } onSelect={this.handleSelect}/>
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
            <a href="#" onClick={this.handleNew}>Add New Service</a>
          </h4>
          <hr/>
          {this.renderList()}
        </div>
      </div>
    );
  }
});

module.exports = AllServices;
