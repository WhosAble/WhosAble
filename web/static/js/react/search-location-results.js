var Location = require("./location");
import _ from "lodash";

var SearchLocationResults = React.createClass({
  getInitialState() {
    return {
      addresses: null
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

  matchesLocation(addresses) {
    return this.matchesField(addresses.address) || this.matchesField(addresses.city) || this.matchesField(addresses.state) || this.matchesField(addresses.zip);
  },

  renderList() {
    var self = this;
    var list = _.compact(this.state.addresses.map(function(location, index) {
      if(self.matchesLocation(location)) {
        return(<Location key={index} addresses={location}/>);
      }
    }));
    if(_.isEmpty(list)) {
      return(<div className="no-locations">Sorry, no locations</div>);
    } else {
      return list;
    }
  },

  render() {
    if(this.state.addresses == null) { return(<noscript/>) }

    return(
      <div className="location-list">
        { this.renderList() }
      </div>
    );
  }
});

module.exports = SearchLocationResults;
