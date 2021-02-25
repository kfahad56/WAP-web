/* eslint-disable */
import React from "react";
import mapboxgl from "mapbox-gl";
import marker from "../../components/images/marker.png";
import $ from "jquery";

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
      loadedMarkers: false,
    };
  }

  hoverMarkerEffect = (bool) => {
    this.state.map.setFeatureState(
      { source: "places", id: this.state.onHover },
      { hover: bool }
    );
  };

  loadMarkers = () => {
    console.log("loadmarkers");
    if (this.props.markers.length > 0) {
      this.state?.map?.loadImage(marker, (error, image) => {
        if (error) throw error;
        this.state.map.addImage("custom-marker", image);

        let features = [];
        let coordinates = [];

        this.props.markers.map((item, index) => {
          coordinates.push([item.lng, item.lat]);

          features.push({
            type: "Feature",
            id: index,
            geometry: {
              type: "Point",
              coordinates: [item.lng, item.lat],
            },
            properties: {
              title: index + 1,
            },
          });
        });
        this.state.map.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: features,
          },
        });

        // if (coordinates.length === 1) {
        //   this.state.map.flyTo({
        //     center: [coordinates[0][0], coordinates[0][1]],
        //     zoom: 13,
        //     essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        //   });
        // } else {
        // this.state.map.setMaxZoom(14);
        // console.log(this.state.map.getCenter());
        if (this.props.mobile) {
          let latitude = 0;
          let longitude = 0;
          const n = coordinates.length;
          console.log(coordinates);
          coordinates.map((item, index) => {
            longitude += item[0];
            latitude += item[1];
          });
          // this.state.map.setCenter([latitude / n, longitude / n]);
          this.state.map.flyTo({
            center: [longitude / n, latitude / n],
            zoom: 9,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        } else {
          let bounds = coordinates.reduce((bounds, coord) => {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
          let options = { padding: 200, maxZoom: 14 };
          this.state.map.fitBounds(bounds, options);
        }
        //
        // this.state.map.cameraForBounds(bounds, options);

        // this.state.map.flyTo({
        //   center: bounds,
        //   maxZoom: 14,
        //   essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        // });
        // }

        let paint = {
          "icon-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.7,
          ],
          "text-color": "#ffffff",
        };
        if (this.props.mobile)
          paint = {
            "icon-opacity": 1,
            "text-color": "#ffffff",
          };

        this.state.map.addLayer({
          id: "places",
          type: "symbol",
          source: "places",
          layout: {
            "text-field": ["get", "title"],
            "text-size": 12,
            "text-offset": [0, -0.3],
            "text-allow-overlap": true,
            "icon-image": "custom-marker",
            "icon-allow-overlap": true,
          },
          paint: paint,
        });
      });

      if (!this.props.mobile) {
        this.state.map.on("mouseenter", "places", (e) => {
          // Change the cursor style as a UI indicator.
          this.setState({ onHover: e.features[0].id }, () => {
            this.props.highlightCard(this.state.onHover, true);
            this.state.map.getCanvas().style.cursor = "pointer";
            if (e.features.length > 0) {
              // if (this.state.onHover) {
              //   this.state.map.setFeatureState(
              //     { source: "places", id: this.state.onHover },
              //     { hover: false }
              //   );
              // }

              this.setState({ onHover: e.features[0].id }, () => {
                // this.state.map.setFeatureState(
                //   { source: "places", id: this.state.onHover },
                //   { hover: true }
                // );
                this.hoverMarkerEffect(true);
              });
            }
          });
        });

        this.state.map.on("mouseleave", "places", (e) => {
          this.state.map.getCanvas().style.cursor = "";
          this.props.highlightCard(this.state.onHover, false);
          // if (this.state.onHover) {
          // this.state.map.setFeatureState(
          //   { source: "places", id: this.state.onHover },
          //   { hover: false }
          // );
          this.hoverMarkerEffect(false);

          // }
          this.setState({ onHover: null });
        });
      }
    }
  };

  componentDidMount = () => {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
      // interactive: false,
    });
    // this.state.map = map;
    console.log("mount");
    if (this.props.navigation) map.addControl(new mapboxgl.NavigationControl());
    this.setState({ map: map, mapCreated: true }, () => {
      this.state.map.on("load", () => {
        // console.log("resize: ", this.state.map.resize());
        this.loadMarkers();
      });
      console.log("state set");
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("in update");
    if (prevProps.markers !== this.props.markers && this.state.mapCreated) {
      if (prevProps.markers.length > 0) {
        this.state.map.removeLayer("places");
        this.state.map.removeSource("places");
      }
      this.loadMarkers();
    } else if (prevProps.hoveredStateId !== this.props.hoveredStateId) {
      this.setState({ onHover: this.props.hoveredStateId }, () =>
        this.hoverMarkerEffect(true)
      );
    } else if (prevProps.hoveredState !== this.props.hoveredState) {
      this.hoverMarkerEffect(this.props.hoveredState);
    }
  };

  render() {
    console.log("rendering");
    // because mobile center is not working
    if (this.props.mobile && this.state.loadedMarkers) {
      this.state.map.flyTo({
        center: this.state.map.getCenter(),
        maxZoom: 14,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
      this.setState({ loadedMarkers: false });
    }
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
