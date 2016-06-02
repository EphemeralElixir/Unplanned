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
    };
    this.updateCurrentLocation();
  }

  // componentDidMount() {
  //   this.updateCurrentLocation();
  // }

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

  // a function to center the map
  centerMap(position) {
    this.setState({ center: position });
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
      <div>
        <button onClick={this.centerMap}>Center Map</button>
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
      </div>
    );
  }
}

Gmap.propTypes = {
  users: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  gmap: React.PropTypes.object,
};

export default Gmap;
