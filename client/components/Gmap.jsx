import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from 'react-google-maps';
import actions from '../redux/actions.js';

class Gmap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Initial map center is set to SF
      center: {
        lat: 37.7835896,
        lng: -122.4092149,
      },
      // Used to test 4 user's fixed position for testing.
      // See where markers are set ~ line 130 if you'd like to use real locations
      fixedPos: [
        { lat: 37.7832718, lng: -122.4035935 },
        { lat: 37.7778119, lng: -122.4148293 },
        { lat: 37.773109, lng: -122.4159813 },
        { lat: 37.767617, lng: -122.4094637 },
      ],
    };
    this.user = window.socket.api.user;
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
    // send dispatch to update sender recipientId
    this.props.dispatch(actions.setRecipient(socketId));
    // emit socket to update recipients requesterId
    window.socket.api.sendMeetingRequest(socketId);
  }

  handleMarkerClick(marker, socketId) {
    // send dispatch to set map: openedUserId to socketId
    // this prop is used to indicate which Info Window to keep open
    this.props.dispatch(actions.updateOpenedUserId(socketId));
  }

  handleMarkerClose() {
    this.props.dispatch(actions.updateOpenedUserId(undefined));
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
          {// Don't show the Let's Meet button on a users's own InfoWindow
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
              width: '100%',
              height: '100%',
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
                position={{ lat: this.state.fixedPos[index].lat,
                  lng: this.state.fixedPos[index].lng }}
                onClick={this.handleMarkerClick.bind(this, marker, socketId)}
              >
                {/* render InfoWindow only if marker has been clicked */}
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
