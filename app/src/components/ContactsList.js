import React from 'react';
import './ContactsList.css';


class ContactsList extends React.Component {
    render() {
        const rows = this.props.contactsData.map((row, index) => {

            return (
              <div class="contact">
                  <div class="photo_col">
                    {row.imagePreviewUrl==='' ?
                      <div class="photoCircle">
                        <span class="photoFL">{row.first_name[0] + row.last_name[0]}</span>
                      </div>
                      :
                      <img class="photoImage" src={row.imagePreviewUrl}/>
                    }
                  </div>

                  <div class="info_col">
                    <p id="contactName">{row.first_name + ' ' + row.last_name}</p>
                    <p id="contactEmail">{row.email}</p>
                  </div>

                  <div class="button_col">
                    <i id="edit" class="fa fa-edit" onClick={() => this.props.editContact(index)}></i>
                    <a class="delete" onClick={() => this.props.removeContact(index)}/>
                  </div>
              </div>

            );
        });

        return (
          <div className="contacts_list">{rows}</div>
        );
    };
}

export default ContactsList
