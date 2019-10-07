import React from 'react';
import './PopupWindow.css';

class PopupWindow extends React.Component {
  constructor(props) {
      super(props);

      this.initialState = {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          imagePreviewUrl: '',
      };

      if(this.props.text === 'Editing')
      {
        this.state = this.props.contact_toEdit;
      }
      else {
        this.state = this.initialState;
      }
  }

  handleChange = event => {
    this.setState({
        [event.target.name] : event.target.value
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if(this.props.text === 'Adding') {
      if(this.state.first_name !== '' || this.state.last_name !== '')
      {
        this.props.handleSubmit(this.state);
      }
    }
    else {
      this.props.handleUpdate(this.state);
    }

    this.setState(this.initialState);
  }

  imageUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)

    this.sendRequest(file);
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("load", event => {
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  }

  render() {
    const { first_name, last_name, phone, email, imagePreviewUrl} = this.state;

    return (
      <div className='popupWindow'>
        <div className='contactForm'>
          <div className='content'>
            <button  id='cancel' onClick={this.props.closePopup}>Cancel</button>
            <form onSubmit={this.onFormSubmit}>
                <button id='save' type="submit">
                  Save
                </button>

                <div class="photo_name_row">
                  <div class="photo">

                    {imagePreviewUrl==='' ?
                      <div class="circle"><span class="addphoto">Add Photo</span></div>
                      :
                      <img class="image" src={imagePreviewUrl}/>
                    }
                    <input type="file" id="file-input" onChange={this.imageUpload}/>

                  </div>
                  <div class='name'>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={first_name}
                        onChange={this.handleChange}
                    />
                    <hr />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={this.handleChange}
                    />
                    <hr />
                  </div>
                </div>
                <div class='phone_email'>
                  <label>phone:</label>
                  <input
                      type="text"
                      name="phone"
                      placeholder="+1 917 000 00 00"
                      value={phone}
                      onChange={this.handleChange}
                  />
                  <hr />
                  <label>email:</label>
                  <input
                      type="text"
                      name="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={this.handleChange}
                  />
                  <hr />
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupWindow
