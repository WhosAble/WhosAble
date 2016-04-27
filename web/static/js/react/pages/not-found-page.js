var NavBar = require("../nav-bar");

var NotFoundPage = React.createClass({
  propTypes: {
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <h1>404- Page Not Found</h1>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = NotFoundPage;
