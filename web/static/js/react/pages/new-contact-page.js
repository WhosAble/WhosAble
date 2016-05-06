var NavBar = require("../nav-bar");
var ContactForm = require("../forms/contact-form");

var NewContactPage = React.createClass({
  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <h1>Create a Contact</h1>
            <ContactForm/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = NewContactPage;
