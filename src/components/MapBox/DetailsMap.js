/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import marker from "../../components/images/spotMarker.png";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWNvb2w0MTUxIiwiYSI6ImNrZTVwbjJjdzBiNDIyeW41dmc4bmExcTkifQ.gtlBKhY-JUZTQepkMWOAfg";

export default class Application extends React.Component {
  mapRef = React.createRef();
  stateMap = undefined;

  constructor(props) {
    super(props);
    this.state = {
      lng: 78.994186,
      lat: 22.703229,
      zoom: 4,
      map: undefined,
      mapCreated: false,
      eventAssigned: false,
      onHover: null,
      markersLoaded: false,
    };
  }

  loadMarkers = () => {};

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });
    if (this.props.navigation) map.addControl(new mapboxgl.NavigationControl());
    this.setState({ map: map, mapCreated: true }, () => {
      this.state.map.on("load", () => {
        console.log("load markers: ", this.props.markers.length);
        this.state.map.loadImage(marker, (error, image) => {
          if (error) throw error;
          this.state.map.addImage("custom-marker", image);

          let features = [];
          let coordinates = [];

          let item = this.props.markers[0];
          coordinates.push([item.lng, item.lat]);
          features.push({
            type: "Feature",
            id: 0,
            geometry: {
              type: "Point",
              coordinates: [item.lng, item.lat],
            },
          });

          console.log("here");
          this.state.map.addSource("places", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: features,
            },
          });

          this.state.map.flyTo({
            center: coordinates[0],
            zoom: 13,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });

          this.state.map.addLayer({
            id: "places",
            type: "symbol",
            source: "places",
            layout: {
              "icon-image": "custom-marker",
            },
            paint: {
              "text-color": "#ffffff",
            },
          });
          this.setState({ markersLoaded: true }, () => {
            console.log("markersLoaded");
          });
        });
      });
    });
    console.log("mount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    if (
      this.state.mapCreated &&
      !this.state.markersLoaded &&
      this.props.markers.length > 0
    )
      this.loadMarkers();
  }

  render() {
    console.log("render");
    return (
      <div
        style={{
          ...this.props.mapContainerStyles,
        }}
      >
        <div
          ref={this.mapRef}
          style={{
            ...this.props.mapStyles,
          }}
        />
      </div>
    );
  }
}
