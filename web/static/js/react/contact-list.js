var ServiceContactList = require("./service-contact-list");

var ContactList = React.createClass({
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

  render() {
    if(this.state.services == null) { return(<noscript/>) }

    var services = this.state.services.map(function(service, index) {
      return(<ServiceContactList key={index} service={service}/>);
    });

    return(
      <div className="service-contact-list">
        { services }
        <ServiceContactList service={null}/>
      </div>
    );
  }
});

module.exports = ContactList
