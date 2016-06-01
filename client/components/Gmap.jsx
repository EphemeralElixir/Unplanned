import { default as React, Component } from 'react';
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from 'react-google-maps';

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

  // Close all other infoWindows except the user clicked on
  closeOtherInfoWindows(socketIdToKeepOpen) {
    Object.keys(this.props.users).forEach((socketId) => {
      const marker = this.props.users[socketId];
      if (marker.showInfo && socketId !== socketIdToKeepOpen) {
        console.log('Closing info window of:', socketId);
        this.handleMarkerClose(marker);
      }
    });
  }

  handleMeetRequest() {
    console.log('Sending meeting request from user.');
    // change state here for request sent
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
    console.log('Inside handleMarkerClick');
    this.closeOtherInfoWindows(marker.socketId);
    const user = marker;
    user.showInfo = true;
    this.setState(this.state);
  }

  handleMarkerClose(marker) {
    const user = marker;
    user.showInfo = false;
    this.setState(this.state);
  }

  renderInfoWindow(ref, marker) {
    return (
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)}
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
            center={this.state.center}
            defaultZoom={14}
            ref="map"
          >

          {Object.keys(this.props.users).map((socketId) => {
            const marker = this.props.users[socketId];
            // used to reference the marker for positioning the infowindow
            const ref = `marker_${socketId}`;
            return (
              // use the Marker component to render user as a marker on map
              <Marker
                key={socketId}
                ref={ref}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={this.handleMarkerClick.bind(this, marker)}
              >
                {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
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
};

export default Gmap;
