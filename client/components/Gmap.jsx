import { default as React, Component } from "react";
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from "react-google-maps";

// var React = require('react');
// import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from 'react-google-maps';

class Gmap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // specify the center of the map
      center: {
        lat: 37.784817,
        lng: -122.406358
      },
      
      usersObj: {
        1234: {
          name: 'Sepehr',
          bio: 'This is Sepehr',
          lat: 37.782917,
          lng: -122.406350
        },
        4523: {
          name: 'Leo',
          bio: 'This is Leo',
          lat: 37.784617,
          lng: -122.416645
        }
      }

    }
  }
  
  //Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
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

            {Object.keys(this.state.usersObj).map((key, index) => 
              {
                const marker = this.state.usersObj[key];
                // used to reference the marker to for positioning the infowindow
                const ref = `marker_${key}`;
                return (
                  // use the Marker component to render user as a marker on map
                  <Marker
                    key={key}
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











