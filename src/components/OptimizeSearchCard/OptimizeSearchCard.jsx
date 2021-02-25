/* eslint-disable */
import React, { Component } from 'react';
import './optimizesearchcard.css';
import TextField from '@material-ui/core/TextField';
import submitArrow from '../../components/images/send.png';
import * as getCityAPI from '../../Apis/city';
import { withRouter } from "react-router-dom";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import MapBoxSearch from '../MapBoxSearch/MapBoxSearch';


const SearchBox = (props) => {
    const { setLocation } = props;
    const PlacesWithStandaloneSearchBox = compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNnwxVjWJBvN9sUc7O8yPIKN-o08jCkUA&v=3&libraries=geometry,drawing,places",
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px` }} />,
            setLocation: props.setLocation
        }),
        lifecycle({
            componentWillMount() {
                const refs = {}

                this.setState({
                    places: [],
                    onSearchBoxMounted: ref => {
                        refs.searchBox = ref;
                        window.ref = refs.searchBox;
                    },
                    onPlacesChanged: () => {
                        const places = refs.searchBox.getPlaces();
                        this.props.setLocation({
                            location: places[0].formatted_address,
                            latitude: places[0].geometry.location.lat(),
                            longitude: places[0].geometry.location.lng()
                        });
                    },
                });
            },
        }),
        withScriptjs
    )(props =>
        <div data-standalone-searchbox="">
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                onPlacesChanged={props.onPlacesChanged}
                options={{
                    componentRestrictions: { country: 'in' }
                }}
                componentRestrictions={{ country: 'in' }}
            >
                <TextField
                    className="adjustDropdownInput"
                    id="outlined-select-currency-native"
                    label="Location"
                    placeholder="Select Your Location"
                    name="location"
                    autoComplete='off'
                    options={{
                        componentRestrictions: { country: 'in' }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                >
                </TextField>
            </StandaloneSearchBox>
        </div>
    );
    const searchBox = React.useMemo(() => <PlacesWithStandaloneSearchBox />, []);
    return <>{searchBox}</>;
}



class OptimizeSearchCard extends Component {
    state = {
        location: "Mumbai, Maharashtra",
        latitude: 18.96667,
        longitude: 72.83333,

        locationData: [
            'Andhra Pradesh',
            'Arunachal Pradesh',
            'Assam',
            'Bihar',
            'Chhattisgarh',
            'Goa',
            'Gujarat',
            'Haryana',
            'Himachal Pradesh',
            'Jharkhand',
            'Karnataka',
            'Kerala',
            'Madhya Pradesh',
            'Maharashtra',
            'Manipur',
            'Meghalaya',
            'Mizoram',
            'Nagaland',
            'Odisha',
            'Punjab',
            'Rajasthan',
            'Sikkim',
            'Tamil Nadu',
            'Telangana',
            'Tripura',
            'Uttar Pradesh',
            'Uttarakhand',
            'West Bengal'
        ],
        locationTab: true,
        mobLocationTab: true,
        mobDurationTab: false,
        mobareaTab: false,
        durationTab: false,

        areaTab: false,
        typingTimeout: 0,
        stateData: [],
        duration: 2,
        area: 500
    }

    handleChange = (e, name, value, regex) => {
        e.preventDefault();
        if (regex.test(value))
            this.setState({ [name]: value });
    };

    setLocation = (loc) => {
        console.log("calling");
        console.log(loc);
        this.setState({
            ...this.state,
            ...loc
        });
    }



    handleStateChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (this.state.typingTimeout) {
                clearTimeout(this.state.typingTimeout);
            }
            this.setState({
                typingTimeout: setTimeout(() => {
                    if (this.state.location.length > 0) {
                        getCityAPI.getCity(this.state.location,
                            (data) => {
                                console.log(data)
                                this.setState({
                                    stateData: data
                                })
                            }, () => { }
                        )
                    }
                }, 500),
            });
        })
    }

    render() {
        const SubmitButton = () => {
            if (this.state.duration.length === 0 || this.state.area.length === 0) {
                return (
                    // <div className="submitButton disabled">
                    <div tabIndex="0" className="btn btnAdjust disabled">Start</div>
                    // </div>
                )
            }
            return (
                <div tabIndex="0" className="btn btnAdjust"
                    onClick={() => this.props.history.push(`/search?location=${this.state.location}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&duration=${this.state.duration}&area=${this.state.area}`)}
                    >Start</div>
                // <div className="submitButton" onClick={() => this.props.history.push(`/search?location=${this.state.location}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&duration=${this.state.duration}&area=${this.state.area}`)}>
                //     <div className="btnText">Start</div>
                // </div>
            )
        }
        return (
            <div className="headerform">
                <div className="container">
                    <h2>Find your space here...</h2>
                    <p>Let's find you a Fulfillment Centre, Warehouse Space or On-demand Storage Space - Whatever you need!</p>
                    <div className="contact-inner">
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mail">
                                        <MapBoxSearch
                                            placeholder={"Mumbai, Maharashtra"}
                                            naked={false}
                                            onSelect={(place) => {
                                                this.setLocation({
                                                    location: place.place_name,
                                                    latitude: place.geometry.coordinates[1],
                                                    longitude: place.geometry.coordinates[0]
                                                });
                                            }} />
                                        {/* <input type="location" name="location" placeholder="Mumbai Maharashtra" />
                                        <label>Location</label> */}
                                    </div>

                                    <div className="mail">
                                        <input type="weeks" style={{ zIndex: "10" }} placeholder="Enter No. Of Weeks" name="duration"
                                            value={this.state.duration}
                                            onChange={(e) => this.handleChange(e, e.target.name, e.target.value, /^^$|(?!0).*[0-9]+$/)}
                                            onFocus={() => this.setState({ duration: "" })} />
                                        <label>Duration (Weeks)</label>
                                    </div>

                                    <div className="mail">
                                        <input type="area" style={{ zIndex: "10" }} placeholder="Enter your area space" name="area"
                                            value={this.state.area}
                                            onChange={(e) => this.handleChange(e, e.target.name, e.target.value, /^^$|(?!0).*[0-9]+$/)}
                                            onFocus={() => this.setState({ area: "" })} />
                                        <label>Area (Sq. Ft.)</label>
                                    </div>

                                    <div className="mail mb-0">
                                        <SubmitButton />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            // <div className="optimizeSearchCardContainer">
            //     <h3>Find your space here...</h3>
            //     <p>Check here for a fulfillment centre or warehouse space or an on demand storage space</p>
            //     <div className="formContainer">
            //         <div className="stateSuggestionContainer">
            //             {/* <SearchBox setLocation={this.setLocation} /> */}
            //             <MapBoxSearch
            //                 placeholder={"Mumbai, Maharashtra"}
            //                 naked={false}
            //                 onSelect={(place) => {
            //                     this.setLocation({
            //                         location: place.place_name,
            //                         latitude: place.geometry.coordinates[1],
            //                         longitude: place.geometry.coordinates[0]
            //                     });
            //                 }} />
            //         </div>
            //         <TextField
            //             id="outlined-full-width"
            //             label="Duration (weeks)"
            //             placeholder="Enter no. of weeks"
            //             fullWidth
            //             name="duration"
            //             value={this.state.duration}
            //             onChange={(e) => this.handleChange(e, e.target.name, e.target.value, /^^$|(?!0).*[0-9]+$/)}
            //             onFocus={() => this.setState({ duration: "" })}
            //             InputLabelProps={{
            //                 shrink: true,
            //             }}
            //             variant="outlined"
            //         />
            //         <TextField
            //             id="outlined-full-width"
            //             label="Area Sq. Ft."
            //             placeholder="Enter your area space"
            //             fullWidth
            //             name="area"
            //             value={this.state.area}
            //             onChange={(e) => this.handleChange(e, e.target.name, e.target.value, /^^$|(?!0).*[0-9]+$/)}
            //             onFocus={() => this.setState({ area: "" })}
            //             InputLabelProps={{
            //                 shrink: true,
            //             }}
            //             variant="outlined"
            //         />
            //         <SubmitButton />

            //     </div>
            //     <div className="formContainerTabletMobile">
            //         {this.state.locationTab ?
            //             <div className="mobileFormAdjust">
            //                 <MapBoxSearch
            //                     placeholder={"Mumbai, Maharashtra"}
            //                     naked={false}
            //                     onSelect={(place) => {
            //                         this.setLocation({
            //                             location: place.place_name,
            //                             latitude: place.geometry.coordinates[0],
            //                             longitude: place.geometry.coordinates[1]
            //                         });
            //                     }} />
            //                 <div className="submitButton"
            //                     onClick={() => this.setState({
            //                         locationTab: false,
            //                         durationTab: true,
            //                         areaTab: false
            //                     })}>
            //                     <img src={submitArrow} alt="" />
            //                 </div>
            //             </div>

            //             : <React.Fragment />}
            //         {this.state.durationTab ?
            //             <div className="mobileFormAdjust">
            //                 <TextField
            //                     id="outlined-full-width"
            //                     label="Duration (weeks)"
            //                     placeholder="Enter no. of weeks"
            //                     name="duration"
            //                     value={this.state.duration}
            //                     onChange={(e) => this.handleChange(e, e.target.name, e.target.value, /^^$|(?!0).*[0-9]+$/)}
            //                     onFocus={() => this.setState({ duration: "" })}
            //                     InputLabelProps={{
            //                         shrink: true,
            //                     }}
            //                     variant="outlined"
            //                 />
            //                 <div className="submitButton" onClick={() => this.setState({
            //                     locationTab: false,
            //                     durationTab: false,
            //                     areaTab: true
            //                 })}>
            //                     <img src={submitArrow} alt="" />
            //                 </div>
            //             </div>
            //             : <React.Fragment />}
            //         {this.state.areaTab ?
            //             <div className="mobileFormAdjust">
            //                 <TextField
            //                     id="outlined-full-width"
            //                     label="Area Sq. Ft."
            //                     placeholder="Enter your area space"
            //                     name="area"
            //                     value={this.state.area}
            //                     onChange={(e) => this.handleChange(e, e.target.name, e.target.value, /^^$|(?!0).*[0-9]+$/)}
            //                     onFocus={() => this.setState({ area: "" })}
            //                     InputLabelProps={{
            //                         shrink: true,
            //                     }}
            //                     variant="outlined"
            //                 />
            //                 <div className="submitButton" onClick={() => this.props.history.push(`/search?location=${this.state.location}&latitude=${this.state.latitude}&longitude=${this.state.longitude}&duration=${this.state.duration}&area=${this.state.area}`)}>
            //                     <img src={submitArrow} alt="" />
            //                 </div>
            //             </div> : <React.Fragment />}
            //     </div>
            //     <div className="tabContainer">
            //         <div className={this.state.locationTab ? "activeTab" : "tabText"} onClick={() => this.setState({
            //             locationTab: true,
            //             durationTab: false,
            //             areaTab: false
            //         })}>Location</div>
            //         <div className="divideBorder"></div>
            //         <div className={this.state.durationTab ? "activeTab" : "tabText"} onClick={() => this.setState({
            //             locationTab: false,
            //             durationTab: true,
            //             areaTab: false
            //         })}>Duration (weeks)</div>
            //         <div className="divideBorder"></div>
            //         <div className={this.state.areaTab ? "activeTab" : "tabText"} onClick={() => this.setState({
            //             locationTab: false,
            //             durationTab: false,
            //             areaTab: true
            //         })}>Area Sq.ft</div>
            //     </div>
            // </div>
        );
    }
}
export default withRouter(OptimizeSearchCard);