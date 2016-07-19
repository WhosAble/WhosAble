var Service = require("./service");
import _ from "lodash";

var SearchServiceResults = React.createClass({
  getInitialState() {
    return {
      services: null
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

  matchesField(field) {
    var searchOn = this.props.search.split(" ");
    var found = false;
    if(searchOn.length > 0) {
      searchOn.forEach(function(search) {
        if(search != "" && field.search(new RegExp(search, "i")) != -1) {
          found = true;
        }
      });
    }
    return found;
  },

  matchesService(service) {
    return this.matchesField(service.name);
  },

  handleSelect(serviceID) {
    this.props.onSelect(serviceID);
  },

  renderList() {
    var self = this;
    var list = _.compact(this.state.services.map((service, index) => {
      if(self.matchesService(service)) {
        return(<Service key={index} service={service} onSelect={this.handleSelect}/>);
      }
    }));
    if(_.isEmpty(list)) {
      return(<div className="no-services">Sorry, no services</div>);
    } else {
      return list;
    }
  },

  render() {
    if(this.state.services == null) { return(<noscript/>) }

    return(
      <div className="services">
        { this.renderList() }
      </div>
    );
  }
});

module.exports = SearchServiceResults;
