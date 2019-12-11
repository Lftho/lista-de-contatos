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

  clearQuery = () => {
    this.setState({ query: ''})
  }
render() {
  const { contacts, onDeleteContact } = this.props;
  const { query } = this.state;


  // Buscando pela letra inicial no input do contato

  let showingContacts 
  if (query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    showingContacts = contacts.filter((contact) => match.test(contact.name))
  } else {
    showingContacts = contacts
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
          value={query}
          onChange={(event) => this.handleUpdateQuery(event.target.value)}
        />
      </div>

      {showingContacts.length !== contacts.length && (
        <div className="showing-contacts">
          <span>Now showing {showingContacts.length } of {contacts.length} </span>
          <button onClick={this.clearQuery}>Mostra tudo</button>
        </div>
      )}


      <ol className="contact-list">
        {showingContacts.map((contact) => (
          <li key={contact.id} className="contact-list-item">
            <div className='contact-avatar' style={{backgroundImage: `url(${contacts.avatarURL})`}} />
            <div className="contact-details">
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={() => 
              onDeleteContact(contact)} 
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