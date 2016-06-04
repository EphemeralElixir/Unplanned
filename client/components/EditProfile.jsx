import React, { Component } from 'react';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.user = window.socket.api.user;
    this.state = {
      shouldRender: window.editProfile,
      bio: this.user.bio,
    };
  }

  componentWillMount() {
    window.showProfile = (e) => {
      e.preventDefault();
      this.setState({ shouldRender: true });
    };
  }

  hideProfile(e) {
    e.preventDefault();
    this.state.shouldRender = false;
  }

  render() {
    let editProfilePage;
    if (this.state.shouldRender) {
      editProfilePage = (
        <div className="editProfileContainer">
          <div>Edit Your Profile</div>
          <img alt="" src={this.user.image} />
          <div>{this.user.name}</div>
          <form className="pure-form pure-form-stacked">
            <fieldset className="pure-group">
              <textarea
                name="bio" value={this.state.bio} className="pure-input-1-2"
                placeholder={`About ${this.user.name}`}
              />
              <input
                name="phoneNumber" className="pure-input-1-2"
                type="text" placeholder="Phone Number"
              />
            </fieldset>
            <button className="pure-button" type="submit">Submit</button>{' '}
            <button className="pure-button" onClick={this.hideProfile.bind(this)}>Close</button>
          </form>
        </div>
      );
    } else {
      editProfilePage = (<div></div>);
    }

    return (editProfilePage);
  }
}

export default EditProfile;
