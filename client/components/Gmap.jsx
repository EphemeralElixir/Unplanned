import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from 'react-google-maps';
import actions from '../redux/actions.js';

class Gmap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 37.7835896,
        lng: -122.4092149,
      },
    };
    // this.updateCurrentLocation();
  }

  componentWillMount() {
    this.updateCurrentLocation();
  }

  updateCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ center:
          { lat: position.coords.latitude, lng: position.coords.longitude },
        });
        console.log('updated user location to:====>', this.state.center);
      });
    } else {
      console.log('Navigator is unavailable in your browser.');
    }
  }

  // this is utility function that slightly adjusts a markers lat/lng
  // if it is too close to another marker to avoid the markers falling
  // on top of each other on the map
  adjustMarkerPosition(marker) {
    // iterate over markers
    const users = this.props.users;
    Object.keys(users).forEach((socketId) => {
      const user = marker;
      // compare this markers lat and lng to current marker
      // abs value of difference between lat and convert to feet
      const latDiffInFt = Math.abs(users[socketId].lat - marker.lat) * (3280.4) * (10000 / 90);
      // abs value of difference between lng
      const lngDiffInFt = Math.abs(users[socketId].lng - marker.lng) * (3280.4) * (10000 / 90);
      // if current marker is too close
      if (latDiffInFt < 50 || lngDiffInFt < 50) {
        // adjust both lat and lng by like .00002
        user.lat += 0.00005;
        user.lng += 0.00005;
      }
    });
  }

  handleMeetRequest(socketId) {
    console.log('Sending meeting request from user.');
    // send dispatch to update user1s recipientId
    this.props.dispatch(actions.setRecipient(socketId));
    // emit socket to update user2s requesterId
    window.socket.api.sendMeetingRequest(socketId);
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker, socketId) {
    // send dispatch to set map: openUserUserId to socketId
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
          <button
            className="buttonSendMeetReq"
            onClick={this.handleMeetRequest.bind(this, socketId)}
          >
            Let's Meet
          </button>
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
              width: '600px',
              height: '600px',
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

          {Object.keys(this.props.users).map((socketId) => {
            const marker = this.props.users[socketId];
            const openedUserId = this.props.gmap.openedUserId;
            // this.adjustMarkerPosition(marker);
            return (
              // use the Marker component to render user as a marker on map
              <Marker
                key={`marker_${socketId}`}
                position={{ lat: marker.lat, lng: marker.lng }}
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
