import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from 'react-google-maps';
import actions from '../redux/actions.js';
// import ReactDOM from 'react-dom';

class Gmap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 37.7835896,
        lng: -122.4092149,
      },
      // used to test 4 user's fixed position for testing
      fixedPos: [
        { lat: 37.7832718, lng: -122.4035935 },
        { lat: 37.7778119, lng: -122.4148293 },
        { lat: 37.773109, lng: -122.4159813 },
        { lat: 37.767617, lng: -122.4094637 },
      ],
    };
    this.user = window.socket.api.user;
    this.updateCurrentLocation();
  }

  // This function will filter users object down to users
  // who match the user options of the current user.
  // It also filters out any users that are unavailable.
  // This returns an array of user socketIds that can later
  // be used to display users as markers on map
  getMatchedUsers() {
    const doesUserMatch = (socketId) => {
      // get all users:
      const users = this.props.users[socketId];
      // return only users that match this.user
      return (
          users.available && (
            users.coffee && this.user.coffee ||
            users.food && this.user.food ||
            users.beer && this.user.beer
          )
        );
    };
    const matchedUsers = Object.keys(this.props.users).filter(doesUserMatch);
    return matchedUsers;
  }

  handleMeetRequest(socketId) {
    // send dispatch to update user1s recipientId
    this.props.dispatch(actions.setRecipient(socketId));
    // emit socket to update user2s requesterId
    window.socket.api.sendMeetingRequest(socketId);
  }

  handleMarkerClick(marker, socketId) {
    // send dispatch to set map: openUserUserId to socketId
    this.props.dispatch(actions.updateOpenedUserId(socketId));
  }

  handleMarkerClose() {
    this.props.dispatch(actions.updateOpenedUserId(undefined));
  }

  // a function to center the map
  centerMap(position) {
    this.setState({ center: position });
  }

  updateCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  }

  renderInfoWindow(marker, socketId) {
    return (
      <InfoWindow
        key={`${marker.userID}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this)}
      >

        {<div className="markerInfoWindow">
          <div className="markerProfilePic">
            <img alt="" src={marker.image} />
          </div>
          <div className="markerName">{marker.name}</div>
          <div className="markerBio">{marker.bio}</div>
          {// Don't show the Let's Meet button for myself
          marker.userID !== this.user.userID ?
            <button
              className="buttonSendMeetReq"
              onClick={this.handleMeetRequest.bind(this, socketId)}
            >
              Let's Meet
            </button> :
            null
          }
        </div>
        }

      </InfoWindow>
    );
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              margin: 'auto',
              width: '800px',
              height: '800px',
            }}
          >
          </div>
        }
        googleMapElement={
          <GoogleMap
            // google map options:
            defaultCenter={this.state.center}
            defaultZoom={14}
            ref="map"
          >
          {/* get matched users for the current users to display on map */}
          {this.getMatchedUsers().map((socketId, index) => {
            const marker = this.props.users[socketId];
            const openedUserId = this.props.gmap.openedUserId;
            return (
              // use the Marker component to render user as a marker on map
              <Marker
                key={`marker_${socketId}`}
                position={
                  { lat: this.state.fixedPos[index].lat, lng: this.state.fixedPos[index].lng }
                }
                onClick={this.handleMarkerClick.bind(this, marker, socketId)}
              >
                {/* render infoWindow only if marker has been clicked */}
                {socketId === openedUserId ? this.renderInfoWindow(marker, socketId) : null}
              </Marker>
            );
          }) // end map over users here
          }
          </GoogleMap>
        }
      /> // end of GoogleMapLoader
    );
  }
}

Gmap.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
};

export default Gmap;
