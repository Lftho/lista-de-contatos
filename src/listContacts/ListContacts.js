import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: '',
  }

  handleUpdateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

render() {
  // Buscando pela letra inicial no input do contato

  let showingContacts 
  if (this.state.query) {
    const match = new RegExp(escapeRegExp(this.state.query), 'i')
    showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
  } else {
    showingContacts = this.props.contacts
  }

  // Organizando o array para buscar pela ordem do alfabeto o nome ( abc )
  showingContacts.sort(sortBy('name'));


  return (
    <div className="lis-contacts">

      <div className="list-contacts-top">
        <input 
          type="text" 
          className="serch-contacts"
          placeholder="Buscar o seu contato"
          value={this.state.query}
          onChange={(event) => this.handleUpdateQuery(event.target.value)}
        />
      </div>

      <ol className="contact-list">
        {showingContacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div className='contact-avatar'>
            </div>
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={() => 
              this.props.onDeleteContact(contact)} 
              className="contact-remove"
              >
              Remove
            </button>
          </li>
        ))}
      </ol>
    </div>
    )    
  }
}

export default ListContacts;