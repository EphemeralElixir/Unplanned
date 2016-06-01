import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from 'react-google-maps';
import actions from '../redux/actions.js';

class Gmap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 37.784817,
        lng: -122.406358,
      },
    };
  }

  componentWillReceiveProps() {
    console.log('Received new props!');
  }

  handleMeetRequest() {
    console.log('Sending meeting request from user.');
    // send dispatch to update user1s recipientID
    // emit socket to update user2s requestorID
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker, socketId) {
    // send dispatch to set map: openUserUserId to socketId
    this.props.dispatch(actions.updateOpenedUserId(socketId));
  }

  handleMarkerClose() {
    this.props.dispatch(actions.updateOpenedUserId(undefined));
  }

  renderInfoWindow(marker) {
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
          <button className="buttonSendMeetReq" onClick={this.handleMeetRequest.bind(this, marker)}>
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
            // ref is used to reference the marker for positioning the infoWindow
            // const ref = `marker_${socketId}`;
            return (
              // use the Marker component to render user as a marker on map
              <Marker
                key={socketId}
                // ref={ref}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={this.handleMarkerClick.bind(this, marker, socketId)}
              >
                {/* render infoWindow only if marker has been clicked */}
                {socketId === openedUserId ? this.renderInfoWindow(marker) : null}
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
