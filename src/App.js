import React, { Component } from 'react';
import ListContacts from './listContacts/ListContacts';

class App extends Component {
  state ={
    contacts: []
  }
  
  removeContact = (contact) =>{
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id )
    }))
  }

  render() {
    const { contacts } = this.state;
    return (
      <div className="App">
        <ListContacts 
          onDeleteContact={this.removeContact}
          contacts={contacts}
        />
      </div>
    );
  }
}

export default App;