var CreateBtn = require("../create-btn");
var ContactList = require("../contact-list");
var SearchForm = require("../forms/search-contacts-form");
var SearchResults = require("../search-contacts-results");
import _ from "lodash";
import {browserHistory} from 'react-router';

var ContactsPage = React.createClass({
  getInitialState() {
    return {
      contacts: null,
      search: ""
    };
  },

  componentDidMount() {
    window.ContactsStore.subscribe(this.receiveContacts);
  },

  componentWillUnmount() {
    window.ContactsStore.unsubscribe(this.receiveContacts);
  },

  receiveContacts(contacts) {
    this.setState({contacts: contacts});
  },

  handleCreate() {
    browserHistory.push("/app/contacts/new")
  },

  handleSearch() {
  },

  handleSearchChange(val) {
    this.setState({search: val});
    this.handleSearch();
  },

  renderBtn() {
    if(this.state.contacts == null || _.isEmpty(this.state.contacts)) {
      return(
        <CreateBtn title="Create a new Contact" onCreate={ this.handleCreate }/>
      );
    }
  },

  renderContactList() {
    if(this.state.search == "") {
      return(
        <ContactList contacts={this.state.contacts} services={this.state.services}/>
      );
    }
  },

  renderList() {
    if(this.state.contacts != null && !_.isEmpty(this.state.contacts)) {
      return(
        <div className="row">
          <div className="col-xs-12">
            <div className="contact-list-header">
              <SearchForm search={ this.state.search } onSearchChange={ this.handleSearchChange } onSearch={ this.handleSearch }/>
            </div>
            { this.renderContactList() }
            { this.renderSearchResults() }
          </div>
        </div>
      );
    }
  },

  renderSearchResults() {
    if(this.state.search != "") {
      return(
        <SearchResults search={ this.state.search }/>
      );
    }
  },

  render() {
    return(
      <div>
        { this.renderBtn() }
        { this.renderList() }
      </div>
    );
  }
});

module.exports = ContactsPage;
