// render the google map DONE
  // given an array of users lats/longs

var users = {
  1234: {
    name: 'Sepehr',
    bio: 'This is Sepehr',
    lat: 37.2,
    lng: -122.1
  },
  4523: {
    name: 'Leo',
    bio: 'This is Leo',
    lat: 37.5,
    lng: -122.5
  }

}

  // display on the map each user at some lat and long position, also need to have their user id

// when click on user render a request meetup view passing the user id into that view
  // populate that view with the user info


// pull data from jsonServer onto the map
// display the data on the map based on the location lat and long


// would info window have to be part of the google maps component
  // or will a separate view open up?
  // how would we get it to open up a separate component view?

import { default as React, Component } from "react";
import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from "react-google-maps";

// var React = require('react');
// import { GoogleMapLoader, GoogleMap, InfoWindow, Marker } from 'react-google-maps';

class Gmap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 37.774929,
        lng: -122.419416
      },
      
      //array of objects of markers
      markers: [
        {
          position: new google.maps.LatLng(37, -122),
          showInfo: false
        },
        {
          position: new google.maps.LatLng(37.5, -122.5),
          showInfo: false  
        }
      ]
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
        
        {ref === 'marker_1' ? 
        
        <div>Marker 1</div>  
        :
        <div>Marker 2</div>
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
              height: '300px',
              width: '300px'
            }} >
          </div>
        }
        googleMapElement={
          <GoogleMap 
            center={this.state.center}
            defaultZoom={4}
            ref='map'>
            
            {this.state.markers.map((marker, index) => 
              
              {
              
              const ref = `marker_${index}`;
              
              return ( <Marker 
                key={index}
                ref={ref}
                position={marker.position}
                onClick={this.handleMarkerClick.bind(this, marker)} >
                
                {/* 
                  Show info window only if the 'showInfo' key of the marker is true. 
                  That is, when the Marker pin has been clicked and 'handleMarkerClick' has been
                  Successfully fired.
                */}
                {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
                
              </Marker>
              );
                
              }) 
            } 
          
          </GoogleMap>
        }
      
      /> //end of GoogleMapLoader
        
    );

  }
}

export default Gmap;











