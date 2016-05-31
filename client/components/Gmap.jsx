import { default as React, Component } from "react";
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from "react-google-maps";

class Gmap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // specify the center of the map
      center: {
        lat: 37.784817,
        lng: -122.406358
      }

    }
  }

  componentWillReceiveProps() {
    console.log('Received new props!');
  }

  // this will close all other infoWindows except the user clicked on
  closeOtherInfoWindows(socketIdToKeepOpen) {
    // iterate all the users markers
    {Object.keys(this.props.users).map((socketId, index) => {
      let marker = this.props.users[socketId];
      // if userIdToKeepOpen is not current marker
      if ( marker.showInfo && socketId !== socketIdToKeepOpen ) {
        // close the marker window 
        console.log('Closing info window of:', socketId);
        this.handleMarkerClose(marker);
      }
      
    }); //end the map over users object

    }
  }

  handleMeetRequest(receiverId) {
    console.log('Sending meeting request from user.');
    // change state here for request sent 
  }

  //Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
    console.log('Inside handleMarkerClick');
    this.closeOtherInfoWindows(marker.socketId);
    marker.showInfo = true;
    this.setState(this.state);
  }
  
  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }
  
  renderInfoWindow(ref, marker) {
    return (

      //You can nest components inside of InfoWindow!
      <InfoWindow 
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >

        {
        <div className="markerInfoWindow">
          <div className="markerProfilePic">
            <img src={marker.image} />
          </div>
          <div className="markerName">{marker.name}</div>
          <div className="markerBio">{marker.bio}</div>
          <button className="buttonSendMeetReq" onClick={this.handleMeetRequest.bind(this, marker)}>Let's Meet</button>
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
              height: '600px'
            }} >
          </div>
        }
        googleMapElement={
          <GoogleMap 
            // google map options:
            center={this.state.center}
            // higher zoom level will reduce the area covered
            defaultZoom={14}
            ref='map'>

            {Object.keys(this.props.users).map((socketId, index) => 
              {
                const marker = this.props.users[socketId];
                // used to reference the marker to for positioning the infowindow
                const ref = `marker_${socketId}`;
                return (
                  // use the Marker component to render user as a marker on map
                  <Marker
                    key={socketId}
                    ref={ref}
                    position={{lat: marker.lat, lng: marker.lng}}
                    onClick={this.handleMarkerClick.bind(this, marker)} >

                    {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
                  </Marker>
                  );

              }) // end map over users here
            }

          </GoogleMap>
        }

      /> //end of GoogleMapLoader

    );

  }
}

export default Gmap;











