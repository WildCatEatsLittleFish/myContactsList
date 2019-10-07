import React from 'react';
import PopupWindow from './components/PopupWindow'
import ContactsList from './components/ContactsList'
import './App.css';

export default class App extends React.Component {

  state = {
    showPopup_Add: false,
    showPopup_Edit: false,
    edit_index: 0,
    contacts: []
  };

  constructor(props) {
    super(props);


    if (localStorage.getItem('myContacts')) {
      this.state.contacts = JSON.parse(localStorage.getItem('myContacts'));
    }
    else
    {
      this.sendToLocal(this.state.contacts);
    }
  }

  sendToLocal = (newContacts) => (localStorage.setItem('myContacts', JSON.stringify(newContacts)))

  togglePopupAdd() {
    this.setState({
      showPopup_Add: !this.state.showPopup_Add
    });
  }

  togglePopupEdit() {
    this.setState({
      showPopup_Edit: !this.state.showPopup_Edit
    });
  }



  handleSubmit = contact => {
    const newContacts = this.state.contacts.concat(contact);
    this.setState({
      contacts: newContacts
    });

    this.sendToLocal(newContacts)
  }

  handleEdit = index => {
    this.setState({
      edit_index: index
    });

    this.togglePopupEdit();


  }

  removeContact = index => {
    const newContacts = this.state.contacts.filter((contact, i) => {
        return i !== index;
    });

    this.setState({
      contacts: newContacts
    });
    this.sendToLocal(newContacts);
  }

  updateContact = contact => {
    var arr = this.state.contacts;
    arr[this.state.edit_index] = contact;
    this.setState({ contacts: arr});
    this.sendToLocal(arr);
  }


  render() {
    return (
      <div className='container'>
        <div className='title_row'>
          <h1 className='title'>My Contacts</h1>
          <a href="#" className="open" onClick={this.togglePopupAdd.bind(this)}/>
          <hr className='divider'/>
        </div>
        {this.state.showPopup_Add ?
          <PopupWindow
            text='Adding'
            handleSubmit={this.handleSubmit}
            closePopup={this.togglePopupAdd.bind(this)}
          />
          : null
        }
        {this.state.showPopup_Edit ?
          <PopupWindow
            text='Editing'
            contact_toEdit={this.state.contacts[this.state.edit_index]}
            handleSubmit={this.handleSubmit.bind(this)}
            handleUpdate={this.updateContact.bind(this)}
            closePopup={this.togglePopupEdit.bind(this)}
          />
          : null
        }
        <ContactsList
          contactsData={this.state.contacts}
          editContact={this.handleEdit.bind(this)}
          removeContact={this.removeContact.bind(this)}
        />
      </div>
    );
  }

}
