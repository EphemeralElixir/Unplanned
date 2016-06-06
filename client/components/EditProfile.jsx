import React, { Component } from 'react';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.user = window.socket.api.user;
    this.state = {
      shouldRender: window.editProfile,
      bio: this.user.bio,
      phoneNumber: this.user.phoneNumber,
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

  handleSubmit(e) {
    e.preventDefault();
    this.user.bio = e.target.bio.value;
    this.user.phoneNumber = e.target.phoneNumber.value;
    window.socket.api.updateBio();
  }

  handleChange() {
    this.setState(this.state);
  }

  render() {
    let editProfilePage;
    if (this.state.shouldRender) {
      editProfilePage = (
        <div className="overlay">
          <div className="popup">
            <div>Edit Your Profile</div>
            <img alt="" src={this.user.image} />
            <div>{this.user.name}</div>
            <form
              className="pure-form pure-form-stacked"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <fieldset className="pure-group">
                <textarea
                  name="bio" defaultValue={this.state.bio} className="pure-input-1-2"
                  placeholder={`About ${this.user.name}`}
                />
                <input
                  name="phoneNumber" defaultValue={this.state.phoneNumber}
                  className="pure-input-1-2" type="text" placeholder="Phone Number"
                />
              </fieldset>
              <button
                className="pure-button" type="submit"
              >Save</button>{' '}
              <button className="pure-button" onClick={this.hideProfile.bind(this)}>Close</button>
            </form>
          </div>
        </div>
      );
    } else {
      editProfilePage = (<div></div>);
    }

    return (editProfilePage);
  }
}

export default EditProfile;
