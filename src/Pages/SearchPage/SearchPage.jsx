/* eslint-disable */
import React, { Component } from 'react';
import './searchpage.css';
import Header from '../../components/header/Header';
import WarehouseCard from '../../components/warehouseCard/WarehouseCard';
import BlogButton from '../../components/BlogButton/BlogButton';
import SearchBar from '../../components/SearchBar/SearchBar';
// import map from '../../components/images/map.png';
import filter from '../../components/images/filter.png';
import close from '../../components/images/close.png';
import search from '../../components/images/search.png';
import mobMap from "../../components/images/mobMap.png";
import empty from "../../components/images/empty.svg";
import mobFilter from "../../components/images/mobfilter.png";
import Map from '../../components/MapBox/Map';
import TestMap from '../../components/MapBox/TestMap';
import submitArrow from '../../components/images/send.png';
import TextField from '@material-ui/core/TextField';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import $ from 'jquery';
import * as warehouseAPI from '../../Apis/Warehouse';
import * as warehousePostAPI from '../../Apis/enquiry';
import * as amenitiesAPI from '../../Apis/Amenities';
import * as servicesAPI from '../../Apis/AddonService';
import * as getCityAPI from '../../Apis/city';
import * as getIndustryTagAPI from '../../Apis/IndustryTags';
import queryString from 'query-string';
import OPTBox from '../../components/OTPBox/OTPBox';
import MapBoxSearch from '../../components/MapBoxSearch/MapBoxSearch';
import { InputBase } from '@material-ui/core';
import * as base from "../../Apis/base";
import Cookie from "js-cookie";
import { Helmet } from "react-helmet";
class SearchPage extends Component {
  state = {
    filter: true,
    narrowSearch: false,
    enquire: false,
    otpset: false,
    a1: "amenity",
    a2: "addonService",
    a3: "industryTag",
    ameni: false,
    servi: false,
    indus: false,
    enquiry: {
      firstName: "",
      lastName: "",
      companyName: "",
      registerEmail: "",
      mobileNo: "",
      message: ""
    },
    params: {
      area: "",
      duration: "",
      location: "",
      amenity: "",
      service: "",
      industry: "",
      latitude: 0,
      longitude: 0,
    },
    enquiryErrors: [],
    warehouse: [],
    amenities: [],
    addonService: [],
    industryTag: [],
    space: [],
    versionId: "",
    success: "",
    countryCode: "",
    map: false,
    card: false,
    total_data: "",
    squareFitCard: false,
    location: "",
    typingTimeout: 0,
    stateData: [],
    duration: "",
    area: "",
    isMarkerShown: false,
    cardHoverId: null,
    cardHoverState: false,
  }
  scrollToCard = (index) => {
    let ele = document.getElementById('warehouse-card-' + index)
    ele.scrollIntoView(false)
  }
  componentDidMount() {
    $(window).scrollTop(0)
    // Warehouse Get Data Call Starts Here
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.setState({ params: params }, () => { this.loadData() })

    // Ṣetting Scroll Events
    // $("location").click(function () {

    // });

    // Amenities And Services Get Data Call Starts Here
    this.getRenderAmenities()
    this.getRenderServices()
    this.getRenderIndustryTags()
    //JQUERY EVENTS
    // this.delayedShowMarker()
  }
  handleEnquiryChange = (e) => {
    e.preventDefault();
    this.setState({ enquiry: { ...this.state.enquiry, [e.target.name]: e.target.value }, enquiryErrors: [] })
  }
  handleChange3 = event => {
    this.setState({
      enquiry: {
        ...this.state.enquiry,
        [event.target.name]: event.target.value
      }
    });
  };
  postEnquiry = () => {
    warehousePostAPI.postEnquiryWarehouse(
      this.state.versionId,
      new warehousePostAPI.WarehousePost(this.state.enquiry),
      (json) => {
        this.setState({
          enquiry: { ...this.state.enquiry },
          success: "Successfully sent a message",
          enquireToken: json.token,
          enquire: false,
          otpset: true,
        })
      },
      (arr) => {
        this.setState({
          enquiryErrors: arr
        })
      }
    )
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

  componentDidUpdate() {
    $(".spaceTypeAdjust").on('click', function () {
      $('.activeTab').removeClass('activeTab');
      $(this).addClass("activeTab");
    })
    // $(".activeButton").on('click', function () {
    //   //$('.activeButton').removeClass('activeToggleTab');
    //   $(this).toggleClass("activeToggleTab");
    //   // $(".activeButton").addClass("activeToggleTab");
    // });
    $('.otpAdjustContainer').find('input').each(function () {
      $(this).attr('maxlength', 1);
      $(this).on('keyup', function (e) {
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
          var prev = parent.find('input#' + $(this).data('previous'));

          if (prev.length) {
            $(prev).select();
          }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
          var next = parent.find('input#' + $(this).data('next'));

          if (next.length) {
            $(next).select();
          } else {
            if (parent.data('autosubmit')) {
              parent.submit();
            }
          }
        }
      });
    });
  }
  markers = [];
  center = { lat: 21.7679, lng: 78.8718 };
  calculateMarkers() {
    // let lats = 0;
    // let longs = 0;
    this.markers = this.state.warehouse.map(item => {
      // lats += item.latitude;
      // longs += item.longitude;
      return { lat: item.latitude, lng: item.longitude }
    });
    // if (this.state.warehouse.length > 0) {
    //   this.center = {
    //     lat: lats / this.state.warehouse.length,
    //     lng: longs / this.state.warehouse.length
    //   };
    // }
  }
  getMarkers() {
    return this.markers;
  }
  getRenderAmenities = () => {
    amenitiesAPI.getAmenities((data) => {
      this.setState({
        ...this.state,
        amenities: data,
      })
    }, () => { }, () => { })
  }

  getRenderServices = () => {
    servicesAPI.getAddonService((data) => {
      this.setState({
        ...this.state,
        addonService: data,
      })
    }, () => { }, () => { })
  }
  getRenderIndustryTags = () => {
    getIndustryTagAPI.getIndustryTags((data) => {
      console.log(data)
      this.setState({
        ...this.state,
        industryTag: data
      })
    }, () => { }, () => { })
  }
  getFilterData = () => {
    if (this.state.ameni) {
      return this.state.amenities.map(item => {
        // let selected;
        // console.log((this.state.params.amenity))
        // if (this.state.params.amenity) {
        //   if (this.state.params.amenity.split(',').find((temp) => item.id)) selected = true;
        //   else selected = false
        // }
        return <BlogButton onClick={() => {
          if (item.selected && item.selected === true) {
            item.selected = false;
          }
          else item.selected = true;
          // item.selected = selected;
          // console.log(this.state.amenities);
          this.setState({ ...this.state });
        }} className={"activeButton " + (item.selected === true ? "activeToggleTab" : "")} tags={item.name} />
      })
    } else if (this.state.servi) {
      return this.state.addonService.map(item => {
        return <BlogButton className={"activeButton " + (item.selected === true ? "activeToggleTab" : "")} onClick={() => {
          if (item.selected && item.selected === true) {
            item.selected = false;
          }
          else item.selected = true;
          this.setState({ ...this.state });
        }} tags={item.name} />
      })
    } else if (this.state.indus) {
      return this.state.industryTag.map(item => {
        return <BlogButton className={"activeButton " + (item.selected === true ? "activeToggleTab" : "")} onClick={() => {
          if (item.selected && item.selected === true) {
            item.selected = false;
          }
          else item.selected = true;
          this.setState({ ...this.state });
        }} tags={item.name} />
      })
    }
  }
  loadData() {
    // let url = this.props.location.search;
    // let params = queryString.parse(url);
    warehouseAPI.getWarehouseByParams({
      area: this.state.params.area,
      duration: this.state.params.duration,
      // city: this.state.params.location,
      latitude: this.state.params.latitude,
      longitude: this.state.params.longitude,
      amenity: this.state.params.amenity,
      service: this.state.params.service,
      industry: this.state.params.industry
    },
      (data) => {
        this.setState({
          warehouse: data
        })

        this.calculateMarkers();
      }, (data) => {
        this.setState({
          total_data: data.total_data
        })
      }, () => { })
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };
  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true })
  //   }, 3000)
  // }

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  handleFilter = () => {
    let param = "";

    if (!(this.state.params.amenity === undefined) && !(this.state.params.amenity.length === 0)) {
      param += `&amenity=${this.state.params.amenity}`
    }
    if (!(this.state.params.service === undefined) && !(this.state.params.service.length === 0)) {
      param += `&service=${this.state.params.service}`
    }
    if (!(this.state.params.industry === undefined) && !(this.state.params.industry.length === 0)) {
      param += `&industry=${this.state.params.industry}`
    }
    this.props.history.push(`/search?location=${this.state.params.location}&latitude=${this.state.params.latitude}&longitude=${this.state.params.longitude}&duration=${this.state.params.duration}&area=${this.state.params.area}${param}`)
    this.loadData();
  }
  getMapStyle = () => {
    let temp = { marginTop: '-73vw', }
    // if (!this.state.map)
    //   temp['display'] = "none"

    console.log('style:', temp)
    return temp
  }
  render() {
    const MobMapStyles = {
      width: '100%',
      height: '100%'
    };
    return (
      <div className="SearchPageContainer">
        <Helmet>
          <title>Warehouses - Customized list of warehouses | WAP</title>
          <meta
            name="description"
            content="Warehouses - Customized list of warehouses as per your needs"
          />
        </Helmet>
        {this.state.enquire ?
          <div className="part3ContainerMob">
            <div className="closeButtonContainer" onClick={() => this.setState({ enquire: false, filter: true })}>
              <img src={close} alt="" />
            </div>
            <div className="narrowSearchText">Leave us a meesage and we will get back to you !</div>
            <div className="leaveUSContainer">
              <TextField
                id="outlined-full-width"
                label="First Name"
                placeholder="Enter your first name *"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-full-width"
                label="Company Name"
                placeholder="Enter your company name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-full-width"
                label="Email Address"
                placeholder="Enter your email address"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-full-width"
                label="Phone No."
                placeholder="Enter your 10 digit mobile no."
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                className="textArea"
                id="outlined-full-width"
                label="Message"
                placeholder="Type your message here …..."
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <div className="proceedButton" onClick={() => this.setState({ otpset: true, enquire: false })}>
                <div className="btnText">Proceed</div>
              </div>
              <div className="numberFieldContainer">
                <TextField
                  className="countryCode"
                  id="outlined-select-currency-native"
                  select
                  label="+91"
                  placeholder="+91"
                  name="countryCode"
                  value={this.state.countryCode}
                  onChange={this.handleChange}
                  SelectProps={{
                    native: false,
                  }}
                  variant="outlined"
                >
                  {/* {this.state.countries.map((option) => (
                    <option key={option} value={option.code}>{option.code}</option>
                  ))} */}
                </TextField>
                <TextField
                  id="outlined-full-width"
                  label="Phone No."
                  placeholder="Enter your 10 digit mobile no."
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
            </div>
          </div> : <React.Fragment />}
        {this.state.otpset ?
          <div className="otpContainer1">
            <div className="closeButtonContainer" onClick={() => this.setState({ otpset: false, enquire: true })}>
              <img src={close} alt="" />
            </div>
            <div className="narrowSearchText">Help us Verify</div>
            <p>Please enter the 6 digit OTP sent on your registered mobile no.</p>
            <div className="otpAdjustContainer" method="get" data-group-name="digits" data-autosubmit="false" autocomplete="off">
              <input type="text" id="digit-1" name="digit-1" data-next="digit-2" />
              <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />
              <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" />
              <div className="divideBorder"></div>
              <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />
              <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />
              <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" />
            </div>
            <div className="resendText">Re-send OTP</div>
            <div className="submitButton">
              <div className="btnText">Submit</div>
            </div>
          </div> : <React.Fragment />}
        {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}

        <SearchBar onClick={() => this.setState({ map: true, filter: false })}>
          <div className="leftSection">
            <div className="searchCardAdjust">
              <div className="searchImage">
                <img src={search} alt="" />
              </div>
              <MapBoxSearch
                naked
                placeholder={this.state.params.location}
                onSelect={(place) => {
                  this.setState({
                    params: {
                      ...this.state.params,
                      latitude: place.geometry.coordinates[1],
                      longitude: place.geometry.coordinates[0],
                      location: place.place_name,
                    }
                  }, () => this.handleFilter())
                }} />
            </div>
            <div className="mobMap" onClick={() => this.setState({ map: true, filter: false })}>
              <div class="fas fa-map-marked-alt"></div>
            </div>
          </div>
          <div className="rightSection right-search">
            <div className="btn searchBtn" onClick={() => this.setState({ card: true, squareFitCard: false })}>
              <div>{this.state.params.duration !== undefined ? this.state.params.duration : 1} weeks</div>
            </div>
            <div className="btn searchBtn" onClick={() => this.setState({ squareFitCard: true, card: false })}>
              <div>{this.state.params.area !== undefined ? this.state.params.area : 1} Sq.ft.</div>
            </div>
            <div className={this.state.ameni ? "active btn searchBtn" : "btn searchBtn"} onClick={() => this.setState({ narrowSearch: true, card: false, squareFitCard: false, ameni: true, servi: false, indus: false, filter: false })}>
              <div>Amenities</div>
            </div>
            <div className={this.state.servi ? "active btn searchBtn" : "btn searchBtn"} onClick={() => this.setState({ narrowSearch: true, card: false, squareFitCard: false, servi: true, ameni: false, indus: false, filter: false })}>
              <div>Services</div>
            </div>
            <div className={this.state.indus ? "active btn searchBtn" : "btn searchBtn industryTag"} onClick={() => this.setState({ narrowSearch: true, card: false, squareFitCard: false, indus: true, servi: false, ameni: false, filter: false })}>
              <div>Industry Tags</div>
            </div>
            <div className="mobFilter" onClick={() => this.setState({ narrowSearch: true, filter: false })}>
              <img src={mobFilter} alt="" />
            </div>
          </div>
        </SearchBar>
        {this.state.card ? <div className="capacityCardMainContainer">
          <div className="capacityCardContainer">
            <div className="closeButtonContainer" onClick={() => this.setState({ card: false })}>
              <img src={close} alt="" />
            </div>
            <div className="contact-inner squreFitForm">
              <div class="mail mailAdjust">
                <input type="text" placeholder="Enter no. of weeks" name="duration"
                  value={this.state.params.duration}
                  onChange={(e) => {
                    if (/^^$|(?!0).*[0-9]$/.test(e.target.value) && e.target.value.length <= 3)
                      this.setState({ params: { ...this.state.params, duration: e.target.value } })
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && this.state.params.duration.length > 0) {
                      this.handleFilter()
                      this.setState({ card: false })
                    }
                  }} /><label>Duration(weeks)</label>
              </div>
              {/* <TextField
                id="outlined-full-width"
                label="Duration(weeks)"
                placeholder="Enter no. of weeks"
                // fullWidth
                name="duration"
                value={this.state.params.duration}
                onChange={(e) => {
                  if (/^^$|(?!0).*[0-9]$/.test(e.target.value) && e.target.value.length <= 3)
                    this.setState({ params: { ...this.state.params, duration: e.target.value } })
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && this.state.params.duration.length > 0) {
                    this.handleFilter()
                    this.setState({ card: false })
                  }
                }}

                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              /> */}
              {this.state.params.duration.length > 0 ?
                <div className="submitButton"
                  onClick={() => {
                    this.setState({ card: false })
                    // this.props.history.push(`/search?location=${this.state.params.location}&latitude=${this.state.params.latitude}&longitude=${this.state.params.longitude}&duration=${this.state.params.duration}&area=${this.state.params.area}`)
                    // this.loadData();
                    this.handleFilter()
                  }}
                >
                  <img src={submitArrow} alt="" />
                </div> :
                <div className="submitButton disabled">
                  {/* <img src={submitArrow} alt="" /> */}
                </div>
              }
            </div>
          </div>
        </div> : <React.Fragment />}
        {this.state.squareFitCard ? <div className="squarefitCardMainContainer">
          <div className="squarefitCardContainer">
            <div className="closeButtonContainer" onClick={() => this.setState({ squareFitCard: false })}>
              <img src={close} alt="" />
            </div>

            <div className="contact-inner squreFitForm">
              <div class="mail mailAdjust">
                <input type="text" placeholder="Enter your area space"
                  name="area"
                  value={this.state.params.area}
                  onChange={(e) => {
                    if (/^^$|(?!0).*[0-9]+$/.test(e.target.value) && e.target.value.length <= 10)
                      this.setState({ params: { ...this.state.params, area: e.target.value } })
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13 && this.state.params.area.length > 0) {
                      this.handleFilter()
                      this.setState({ squareFitCard: false })
                    }
                  }} /><label>Area Sq. Ft.</label>
              </div>
              {/* <TextField
                id="outlined-full-width"
                label="Area Sq. Ft."
                placeholder="Enter your area space"
                // fullWidth
                name="area"
                value={this.state.params.area}
                onChange={(e) => {
                  if (/^^$|(?!0).*[0-9]+$/.test(e.target.value) && e.target.value.length <= 4)
                    this.setState({ params: { ...this.state.params, area: e.target.value } })
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13 && this.state.params.area.length > 0) {
                    this.handleFilter()
                    this.setState({ squareFitCard: false })
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              /> */}
              {this.state.params.area.length > 0 ?
                <div className="submitButton"
                  onClick={() => {
                    this.setState({ squareFitCard: false })
                    this.handleFilter()
                  }}
                >
                  <img src={submitArrow} alt="" />
                </div> :
                <div className="submitButton">
                  {/* <img src={disabledSubmitArrow} alt="" /> */}
                </div>
              }
            </div>
          </div>
        </div> : <React.Fragment />}
        <div className="mainSearchBoxContainer">
          <div className="leftSection">
            {this.state.filter ? <React.Fragment>
              <div className="topHeaderSection">
                <div className="showingText">Showing {this.state.total_data} WAP Properties</div>
                {/* <div className="filterContainer" onClick={() => this.setState({ narrowSearch: true, filter: false })}>
                  <div className="filterImage">
                    <img src={filter} alt="" />
                  </div>
                  <div className="filterText">Filter</div>
                </div> */}
              </div>
              {this.state.total_data === 0 ? <div className="notAnyContainer">
                <div className="notAnyImage">
                  <img src={empty} alt="" />
                </div>
                <div className="notAny">Sorry! Warehouses Unavailable</div>
              </div> : <div className="bottomSection">
                  {this.state.warehouse.map((item, index) => {
                    return <WarehouseCard
                      onHover={(bool) => {
                        // console.log(bool)
                        // console.log('sdf')
                        let temp = this.state.warehouse
                        temp[index].highlight = bool
                        this.setState({ warehouse: temp, cardHoverId: index, cardHoverState: bool })
                      }}
                      history={this.props.history} id={index} services={item.services} data={item} onClick={() => this.setState({ enquire: true, filter: false, versionId: item.warehouseVersionId })} />
                  })}
                </div>}
            </React.Fragment> : <React.Fragment />}
            {this.state.narrowSearch ?
              <div className="part2Container">
                <div className="closeButtonContainer" onClick={() => this.setState({
                  ...this.state,
                  narrowSearch: false, filter: true, ameni: false, servi: false, indus: false
                })}>
                  <img src={close} alt="" />
                </div>
                <div className="narrowSearchText">{this.state.ameni ? "Select the amenities that you expect the warehouse(s) to have" : ""}
                  {this.state.servi ? "Select the services that you expect the warehouse(s) to provide" : ""}
                  {this.state.indus ? "Select the industry tag that you expect the warehouse(s) to provide" : ""}</div>
                {/* <div className="searchTypeContainer">
                  {this.state.ameni ? <BlogButton className={"spaceTypeAdjust" + (this.state.a1 === "amenity" ? " activeTab" : "")} tags="Amenities"
                    onClick={() => this.setState({ ...this.state, a1: "amenity" })} /> : <React.Fragment />}
                  {this.state.servi ? <BlogButton className={"spaceTypeAdjust" + (this.state.a2 === "addonService" ? " activeTab" : "")} tags="Services"
                    onClick={() => this.setState({ ...this.state, a1: "addonService" })} /> : <React.Fragment />}
                </div>
                <div className="borderBottom"></div> */}
                <div className="searchTypeSection1">
                  {this.getFilterData()}
                </div>
                <div className="applyButton btn"
                  onClick={() => {
                    let amenities = [];
                    let services = [];
                    let industrytags = [];
                    this.state.amenities.map(item => {
                      if (item.selected && item.selected === true) amenities.push(item.id);
                    });
                    this.state.addonService.map(item => {
                      if (item.selected && item.selected === true) services.push(item.id);
                    });
                    this.state.industryTag.map(item => {
                      if (item.selected && item.selected === true) industrytags.push(item.id)
                    })
                    let amenity = ""
                    let service = ""
                    let industry = ""

                    if (amenities.length > 0)
                      amenity = amenities.toString()
                    if (services.length > 0)
                      service = services.toString()
                    if (industrytags.length > 0)
                      industry = industrytags.toString()
                    this.setState({
                      params: { ...this.state.params, amenity: amenity, service: service, industry: industry },
                      narrowSearch: false,
                      filter: true
                    }, () => this.handleFilter())
                    // this.props.history.push(`/search?location=${this.state.params.location}&latitude=${this.state.params.latitude}&longitude=${this.state.params.longitude}&duration=${this.state.params.duration}&area=${this.state.params.area}${param}`);
                    // this.loadData();
                    this.setState({
                      narrowSearch: false,
                      filter: true
                    });
                  }}
                >
                  <div className="applyText">Apply</div>
                </div>
              </div> : <React.Fragment />}
            {this.state.enquire ?
              <div className="part3Container">
                <div className="closeButtonContainer" onClick={() => this.setState({ enquire: false, filter: true })}>
                  <img src={close} alt="" />
                </div>
                <div className="narrowSearchText">Leave us a message and we will get back to you !</div>
                <div className="leaveUSContainer">
                  <TextField
                    id="outlined-full-width"
                    label="First Name*"
                    placeholder="Enter your first name"
                    fullWidth
                    value={this.state.enquiry.firstName}
                    name="firstName"
                    onChange={this.handleEnquiryChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Last Name*"
                    placeholder="Enter your last name"
                    fullWidth
                    value={this.state.enquiry.lastName}
                    name="lastName"
                    onChange={this.handleEnquiryChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Company Name*"
                    placeholder="Enter your company name"
                    fullWidth
                    value={this.state.enquiry.companyName}
                    name="companyName"
                    onChange={this.handleEnquiryChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Email Address*"
                    placeholder="Enter your email address"
                    fullWidth
                    value={this.state.enquiry.registerEmail}
                    name="registerEmail"
                    onChange={this.handleEnquiryChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-full-width"
                    label="Phone No.*"
                    placeholder="Enter your phone no."
                    fullWidth
                    value={this.state.enquiry.mobileNo}
                    name="mobileNo"
                    onChange={this.handleEnquiryChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    className="textArea"
                    id="outlined-full-width"
                    label="Message*"
                    placeholder="Type your message here …..."
                    fullWidth
                    multiline
                    rowsMax="3"
                    value={this.state.enquiry.message}
                    name="message"
                    onChange={this.handleEnquiryChange}
                    // onKeyDown={this.keyPress}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  {this.state.enquiryErrors.map(item => {
                    return item
                  })}
                  {this.state.success}
                  <div className="proceedButton" onClick={() => this.postEnquiry()}>
                    <div className="btnText">Proceed</div>
                  </div>
                </div>
              </div> : <React.Fragment />}
            {this.state.otpset ?
              <div style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <OPTBox token={this.state.enquireToken} close={() => this.setState({ otpset: false, enquire: true })} />
              </div> : <React.Fragment />}
          </div>
          {window.screen.width > 800 ?
            <div className="rightSection">
              <TestMap
                mapContainerStyles={{
                  position: 'sticky',
                  top: '125px'
                }}
                mapStyles={{
                  width: '38.27083vw',
                  height: '80vh',
                }}
                open
                navigation
                hoveredStateId={this.state.cardHoverId}
                hoveredState={this.state.cardHoverState}
                center={this.center}
                markers={this.markers}
                highlightCard={(index, bool) => {
                  let temp = this.state.warehouse
                  temp[index].highlight = bool
                  this.scrollToCard(index)
                  this.setState({ warehouse: temp })
                }}
              />
            </div> : this.state.map ?
              <div className="rightSection1"
                style={this.getMapStyle()}
              >
                <TestMap
                  mapContainerStyles={{
                    // position: 'sticky',
                    width: '100vw',
                    height: '100vh',
                    // offsetHeight: '100vh',
                  }}
                  mapStyles={{
                    // top: 0,
                    // bottom: 0
                    // offsetHeight: '100vh',
                    // display: this.state.map ? "" : 'none',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  open={this.state.map}
                  mobile={true}
                  navigation={false}
                  hoveredStateId={this.state.cardHoverId}
                  hoveredState={this.state.cardHoverState}
                  center={this.center}
                  markers={this.markers}
                  highlightCard={(index, bool) => {
                    let temp = this.state.warehouse
                    temp[index].highlight = bool
                    this.scrollToCard(index)
                    this.setState({ warehouse: temp })
                  }}
                />
                <div className="closeButtonContainer" onClick={() => this.setState({ map: false, filter: true })}>
                  <img src={close} alt="" />
                </div>
              </div> : <></>
          }
        </div>
      </div >
    );
  }
}

export default SearchPage;
