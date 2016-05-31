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
  componentDidMount() {
  // if current user exists on global e.g. user is logged in
    if ( user ) {
      // set the maps center to their lat lng
      this.setState({
        center: {
          user.lat,
          user.lng
        }
      })
    }
  }

  componentWillReceiveProps() {
    console.log('received new props!');

  }
  // this will close all other infoWindows except the user clicked on
  closeOtherInfoWindows(socketIdToKeepOpen) {
    // iterate all the users markers
    {Object.keys(this.props.users).map((socketId, index) => {
      let marker = this.props.users[socketId];
      // if userIdToKeepOpen is not current marker
      if ( marker.showInfo && socketId !== socketIdToKeepOpen ) {
        // close the marker window 
        console.log('closing window for: ', socketId);
        this.handleMarkerClose(marker);
      }
      
    }); //end the map over users object

    }
  }

  //Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
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
        <div>
          <div>{marker.name}</div>
          <div><button>Meet!</button></div>
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
              height: '500px',
              width: '500px'
            }} >
          </div>
        }
        googleMapElement={
          <GoogleMap 
            // google map options:
            center={this.state.center}
            // higher zoom level will reduce the area covered
            // lower zoom level will cover a greater area
            defaultZoom={14}
            // set google map controls:
            zoomControl={false}
            panControl={false}
            mapTypeControl={false}
            scaleControl={false}
            streetViewControl={false}
            rotateControl={false}
            overviewMapControl={false}
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

              }) // end map paren over userObj here
            }

          </GoogleMap>
        }

      /> //end of GoogleMapLoader

    );

  }
}

export default Gmap;











