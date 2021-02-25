/* eslint-disable */
import React, { Component } from 'react';
import './viewwarehousedetails.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import patch from '../../components/images/patch2.png';
import viewall from '../../components/images/viewall.png';
import BlogButton from '../../components/BlogButton/BlogButton';
// import mapImage from '../../components/images/viewmap.png';
import CardView from '../../components/CardView/CardView';
import SimilarWarehouseCard from '../../components/SimilarWarehouseCard/SimilarWarehouseCard';
import card1 from '../../components/images/card1.png';
import card2 from '../../components/images/ind1.png';
import card3 from '../../components/images/ind1.png';
import heart from '../../components/images/heart.png';
import selectHeart from '../../components/images/selectedHeart.png';
import share from '../../components/images/share.png';
import profile from '../../components/images/rounduser.png';
import close from '../../components/images/close.png';
import security from '../../components/images/icon/security.png';
import Amenitiescard from '../../components/AmenitiesCard/AmenitiesCard';
import AddOnserviceCard from '../../components/AddOnServiceCard/AddOnServiceCard';
import ImageTextTile from '../../components/ImageTextTile/ImageTextTile';
import truck from '../../components/images/icon/truck.png';
import TextField from '@material-ui/core/TextField';
import OTPBox from '../../components/OTPBox/OTPBox';
import Loader from "react-loader-spinner";
import WarehouseSlider from '../../components/WarehouseSlider/WarehouseSlider';
import TestimonialSlider from '../../components/TestimonialSlider/TestimonialSlider';
import AddOnServiceSlider from '../../components/AddOnServiceSilder/AddOnServiceSlider';
import $ from 'jquery';
import AmenitiesPopSlider from '../../components/AmenitiesPopSlider/AmenitiesPopSlider';
import CustomizedAccordions from "../MobAcordian/MobAcordian";
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';

import * as warehouseAPI from '../../Apis/Warehouse';
import * as warehousePostAPI from '../../Apis/enquiry';
import * as reserveAPI from '../../Apis/reservation'
import * as tourAPI from '../../Apis/Tours'
import * as baseAPI from '../../Apis/base'

import MobWarehouseSlider from "../../components/MobWarehouseSlider/MobWarehouseSlider"
import TestMap from '../../components/MapBox/DetailsMap';
// import Typography from '../../views/Components/Typography';
// import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import EmailIcon from '@material-ui/icons/Email';
import { WhatsApp, Email } from "@material-ui/icons"
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import authentication from '../../components/images/icon/already-exist.svg';
import { Popup } from '../../components/Popup/Popup';
import { TermsPopup1 } from '../Terms/Terms1';
import { PrivacyPolicyPopup } from '../PrivacyPolicyPopup/PrivacyPolicyPopup';
import { FullScreenDialog } from '../../components/TermsPopup/TermsPopup';
import illustration from '../../components/images/mail_sent.svg'
import { card } from '../../assets/jss/material-dashboard-pro-react';
import * as icons from '../../Pages/icons';
import { Helmet } from "react-helmet";
import Cookie from "js-cookie";
import { EmailShareButton, WhatsappShareButton } from 'react-share';
import { NavLink } from 'react-router-dom';

class ViewWareHouseDetails extends Component {
    state = {
        matches: window.matchMedia("(min-width: 800px)").matches,
        reserveButton: true,
        reserveProperty: false,
        afterLoginReserveProperty: false,
        similarWarehouse: [],
        reserveToken: '',
        reserve: {
            firstName: "",
            lastName: "",
            companyName: "",
            registerEmail: "",
            mobileNo: "",
            startDate: "",
            endDate: "",
        },
        selectHeart: false,
        sharePopup: false,
        alreadyRegisteredPopup: false,
        enquireProperty: false,
        afterLoginEnquireProperty: false,
        scheduleTour: false,
        afterLoginScheduleTour: false,
        enquiry: {
            firstName: "",
            lastName: "",
            companyName: "",
            registerEmail: "",
            mobileNo: "",
            message: ""
        },
        tourToken: "",
        scheduletour: {
            firstName: "",
            lastName: "",
            companyName: "",
            registerEmail: "",
            mobile_no: "",
            date: ""
        },
        enquiryErrors: [],
        showCreatedResponse: false,
        isLoading: false,
        message: '',
        reserveOTP: false,
        enquireOTP: false,
        enquiryToken: '',
        scheduleTourOTP: false,
        isDisabled: false,
        isPopup: false,
        warehouseDetails: [],
        getImages: [],
        getLocality: [],
        industryTag: [],
        getAmenity: [],
        getAddOnService: [],
        certificate: [],
        selectedHeart: false,
        marker: [],
        center: this.center,
        successMessage: false,
        isPopupOpen: false,
        successPopupText: '',
        error: "",
        reserveErrors: [],
        tc: false,
        checkboxPopup: false,
        terms1: false,
        privacypolicy: false,
        minDate: new Date().toISOString().split('T')[0],
        availableDateText: ""
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value, error: "", isLoading: false });
    };
    handleEnquiryChange = (e) => {
        e.preventDefault();
        this.setState({ enquiry: { ...this.state.enquiry, [e.target.name]: e.target.value }, error: "", reserveErrors: [], isLoading: false })
    }
    handleReserveChange = (e) => {
        e.preventDefault();
        this.setState({ reserve: { ...this.state.reserve, [e.target.name]: e.target.value }, error: "", reserveErrors: [], isLoading: false })
    }
    handleScheduleTourChange = (e) => {
        e.preventDefault();
        this.setState({ scheduletour: { ...this.state.scheduletour, [e.target.name]: e.target.value }, error: "", reserveErrors: [], isLoading: false })
    }
    handleChange2 = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }
        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
        this.setState({ [e.target.name]: onlyNums });
    };
    handleChange3 = event => {
        this.setState({
            enquiry: {
                ...this.state.enquiry,
                [event.target.name]: event.target.value
            }
        });
    };
    keyPress = (event) => {
        if (event.keyCode === 13) {
            this.setState({
                message: '',
            });
        }
    }

    postEnquiry = () => {
        this.setState({ isLoading: true })
        let terms = $('#check').is(":not(:checked)");
        if (terms) {
            this.setState({ tc: false, error: "T&C needs to be accepted" })
            return;
        } else if (isNaN(this.state.enquiry.mobileNo)) {
            this.setState({ error: "Enter a valid mobile number" })
            return;
        } else if ($('#check').is(":checked")) {
            this.setState({ tc: true, error: "" })
        }
        warehousePostAPI.postEnquiryWarehouse(
            this.props.match.params.id,
            this.state.tc,
            new warehousePostAPI.WarehousePost(this.state.enquiry),
            (json, status) => {
                if (baseAPI.isLogin())
                    this.setState({
                        reserveButton: true,
                        enquireProperty: false,
                        afterLoginEnquireProperty: false,
                        successPopupText: 'Successfully Sent',
                        isPopupOpen: true,
                        isLoading: false
                    })
                else {
                    if (status === 202) {
                        this.setState({
                            alreadyRegisteredPopup: true
                            // successPopupText: "",
                            // isPopupOpen: true
                        }
                            , () => setTimeout(() => this.props.history.push('/login'), 5000)
                        )
                    }
                    this.setState({ enquiryToken: json.token, enquireOTP: true, enquireProperty: false, afterLoginEnquireProperty: false, isLoading: false })
                }
            },
            (arr) => {
                this.setState({
                    error: arr[0]
                })
            }
        )
    }
    postReservation = () => {
        this.setState({ isLoading: true })
        let terms = $('#check').is(":not(:checked)");
        if (terms) {
            this.setState({ tc: false, error: "T&C needs to be accepted" })
            return;
        } else if (isNaN(this.state.reserve.mobileNo)) {
            this.setState({ error: "Enter a valid mobile number" })
            return;
        } else if ($('#check').is(":checked")) {
            this.setState({ tc: true, error: "" })
        }
        reserveAPI.postReserveWarehouse(
            this.props.match.params.id,
            this.state.tc,
            new reserveAPI.Reservation(this.state.reserve),
            (json, status) => {
                if (baseAPI.isLogin())
                    this.setState({
                        reserveProperty: false,
                        afterLoginReserveProperty: false,
                        reserveButton: true,
                        successPopupText: 'Successfully Sent',
                        isPopupOpen: true,
                        isLoading: false
                    })
                else {
                    if (status === 202) {
                        this.setState({ alreadyRegisteredPopup: true }, () => setTimeout(() => this.props.history.push('/login'), 5000))
                    }
                    else {
                        this.setState({ reserveToken: json.token, reserveOTP: true, reserveProperty: false, afterLoginReserveProperty: false, isLoading: false })
                    }
                }
            },
            (arr) => {
                console.log(arr[0])
                this.setState({
                    error: arr[0],
                })
            }
        )
    }
    postTour = () => {
        this.setState({ isLoading: true })
        let terms = $('#check').is(":not(:checked)");
        if (terms) {
            this.setState({ tc: false, error: "T&C needs to be accepted" })
            return;
        } else if (isNaN(this.state.scheduletour.mobile_no)) {
            this.setState({ error: "Enter a valid mobile number" })
            return;
        } else if ($('#check').is(":checked")) {
            this.setState({ tc: true })
        }
        tourAPI.postTour(
            this.props.match.params.id,
            this.state.tc,
            new tourAPI.Tour(this.state.scheduletour),
            (json, status) => {
                if (baseAPI.isLogin())
                    this.setState({
                        scheduleTour: false,
                        afterLoginScheduleTour: false,
                        reserveButton: true,
                        successPopupText: 'Successfully Sent',
                        isPopupOpen: true,
                        isLoading: false
                    })
                else {
                    if (status === 202) {
                        this.setState({ alreadyRegisteredPopup: true }, () => setTimeout(() => this.props.history.push('/login'), 5000))
                    }

                    this.setState({ tourToken: json.token, scheduleTourOTP: true, scheduleTour: false, afterLoginScheduleTour: false, isLoading: false })
                }
            },
            (arr) => {
                this.setState({
                    error: arr[0],
                })
            }
        )
    }

    shortlistedClick = () => {
        // Add Popup For Anonymous User If Needed
        if (!baseAPI.isLogin()) {
            this.props.history.push('/login')
            return;
        }

        warehouseAPI.shortlistedWarehouse(
            this.props.match.params.id,
            () => {
                this.setState({ selectHeart: !this.state.selectHeart })
            },
            () => { }
        )
    }
    componentDidMount() {
        $(window).scrollTop(0)
        warehouseAPI.getWarehouseById(
            this.props.match.params.id,
            (data) => {
                // console.log(data.shortlisted)
                let dateFormat = require('dateformat');
                let currentDate = new Date();
                let AvailableFrom = new Date(data.availableFrom);
                let finalDate = dateFormat(AvailableFrom, "dddd, mmmm dS, yyyy");
                if (currentDate < AvailableFrom) {
                    this.setState({ availableDateText: 'Available From ' + finalDate })
                } else {
                    this.setState({ availableDateText: 'Available Now' })
                }

                this.setState({
                    warehouseDetails: data,
                    getImages: data.images,
                    getLocality: data.locality,
                    industryTag: data.industryTags,
                    isDisabled: data.isDisabled,
                    getAmenity: data.amenities,
                    getAddOnService: data.addonService,
                    selectHeart: data.shortlisted,
                    certificate: data.certificates,
                    marker: [{ lat: data.latitude, lng: data.longitude }]
                })
            },
            () => { },
            (status) => {
                if (status === 404) {
                    this.props.history.replace('/404')
                }
            })
        warehouseAPI.getSimilarWarehouse(
            this.props.match.params.id,
            (data) => { this.setState({ similarWarehouse: data }) },
            (error) => { console.log(error) }
        )
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 800px)").addListener(handler);
    }
    componentDidUpdate() {
        if (this.state.error !== "") {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        }
    }
    sampleslider = () => {
        let loop = Math.ceil(this.state.getAmenity.length / 8);
        let output = [];
        for (let i = 0; i < loop; i++) {
            output.push(<TestimonialCard>
                {this.state.getAmenity.map((item, index) => {
                    if (Math.floor(index / 8) == i)
                        return <Amenitiescard icon={icons.amenityIcons(item.code)} amenitiesTtext={item.name} />
                })}
            </TestimonialCard>)
        }
        return <TestimonialSlider>
            {output}
        </TestimonialSlider>;
    }

    addonSlider = () => {
        let count = Math.ceil(this.state.getAddOnService.length / 8);
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(<TestimonialCard>
                {this.state.getAddOnService.map((item, index) => {
                    if (Math.floor(index / 8) == i)
                        return <Amenitiescard icon={icons.serviceIcons(item.code)} amenitiesTtext={item.name} />
                })}
            </TestimonialCard>)
        }
        return <TestimonialSlider>{result}</TestimonialSlider>
    }

    render() {
        const mapStyles = {
            width: '720px',
            height: '309px'
        };
        function scrollWin() {
            window.scrollTo(0, 0);
        }

        const SharePopup = () => {
            const handleClose = () => this.setState({ sharePopup: false })
            const url = 'https://share.hubshub.in/warehouse/' + this.props.match.params.id
            return <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Share Using
                </DialogTitle>
                <DialogContent dividers>
                    {/* <Button round>
                        <a href={`whatsapp://send?text=${window.location}`} data-action="share/whatsapp/share">
                            <WhatsApp />
                        </a>
                    </Button> */}
                    {/* <Button round>
                        <a href={`whatsapp://send?text=${url}`} data-action="share/whatsapp/share">
                            <WhatsApp />
                        </a>
                    </Button>
                    <Button round>
                        <a href={`mailto:?subject=I wanted you to check this warehouse&body=Check this ${window.location}`} data-action="share/whatsapp/share">
                            <Email />
                        </a>
                    </Button> */}
                    <EmailShareButton className="email" subject="I wanted you to check this warehouse" url={url}>
                        <div className="icon-button envelope-o">
                            <i className="fa fa-envelope-o"></i><span></span>
                        </div>
                    </EmailShareButton>
                    <WhatsappShareButton className="whatsapps" url={url}>
                        <div className="icon-button whatsapp">
                            <i className="fa fa-whatsapp"></i><span></span>
                        </div>
                    </WhatsappShareButton>
                </DialogContent>
            </Dialog>
        }
        const MessagePopup = (event) => {
            const handleClose = () => this.setState({ sharePopup: false })
            return <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent dividers style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <img style={{ width: 200, height: 200, marginBottom: 20 }} src={authentication} alt="" />
                    <Typography style={{ fontSize: 20 }}> The Phone number or Email Id is already link to an account, please login using the email id/phone no to continue</Typography>
                </DialogContent>
            </Dialog>
        }
        const getSimilarWarehouses = () => {
            let index = 0
            let cardArr = []
            let data = this.state.similarWarehouse
            while (index <= 2) {
                const len = data.length - 1
                // console.log(data[index], data.length, index)
                // 1 < 2
                if (len < index) {
                    cardArr.push(<SimilarWarehouseCard whiteArrow={true} />)
                } else {
                    let temp = data[index]
                    cardArr.push(<SimilarWarehouseCard
                        onArrowClick={() => {
                            // const { history } = this.props;
                            // history.push(`/viewwarehouse/${temp.warehouseVersionId}`)
                            window.location = `/viewwarehouse/${temp.warehouseVersionId}`
                        }}
                        whiteArrow={true}
                        title={temp.name}
                        imgSRC={temp.image.file}
                        location={temp.state}
                    />)
                }
                index++;
            }
            // [0, 1, 2].map(index => {
            //     console.log('test')
            //     if (data.length < index) {
            //         console.log('if')
            //         cardArr.push(<CardView whiteArrow={true} />)
            //     } else {
            //         console.log('else')
            //         cardArr.push(<CardView whiteArrow={true} />)
            //     }
            // })
            //     console.log('before', data.length, index)
            //     index += 1
            // }
            // console.log(cardArr)

            return cardArr.map((item, index) => item)
        }
        const termsTrue = () => {
            if ($('#check').is(":checked")) {
                $('#check').prop('checked', true);
                this.setState({ tc: true, checkboxPopup: false, error: "" })
            }
        }
        const closeTerm = () => {
            if ($('#check').is(":checked") || $('#check').is(":not(:checked)")) {
                $('#check').prop('checked', false);
                this.setState({ tc: false, checkboxPopup: false, error: "", terms1: false, privacypolicy: false })
            }
        }
        // const isAvailable = () => {
        //     let currentDate = new Date();
        //     let AvailableFrom = new Date(this.state.warehouseDetails.available_from);
        //     console.log(currentDate + "=" + AvailableFrom)
        //     console.log(this.state.warehouseDetails)
        // }
        return (
            <div className="ViewWarehouseDetailsContainer">
                <Helmet>
                    <title>{`Warehouse - ${this.state.warehouseDetails.name} | Hubshub`}</title>
                    <meta
                        name="description"
                        content={this.state.warehouseDetails.desc}
                    />
                    <meta
                        name="keywords"
                        content={`Hubshub warehouse, ${this.state.warehouseDetails.name}`}
                    />
                </Helmet>
                {this.state.checkboxPopup ?
                    <FullScreenDialog
                        handleClose={closeTerm}
                        handleAgree={termsTrue}
                    /> : null}
                {this.state.terms1 ?
                    <TermsPopup1 handleClose={closeTerm} /> : <React.Fragment />}
                {this.state.privacypolicy ?
                    <PrivacyPolicyPopup handleClose={closeTerm} /> : <React.Fragment />}
                {this.state.isPopupOpen ? <Popup
                    illustration={illustration}
                    text={this.state.successPopupText}
                    handleClose={() => this.setState({ isPopupOpen: false })}
                    isPopupOpen={this.state.isPopupOpen}
                /> : <React.Fragment />}
                {this.state.alreadyRegisteredPopup ? <MessagePopup /> : <React.Fragment />}
                <div className="redbox"></div>
                {Cookie.get(baseAPI.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                {!this.state.matches && (<React.Fragment>
                    {this.state.reserveProperty ? <div className="leaveUsContainer">
                        <div className="closeButtonContainer" onClick={() => this.setState({ reserveProperty: false, reserveButton: true })}>
                            <img src={close} alt="" />
                        </div>
                        <div className="loginHeadText">Leave us a message and we will get back to you</div>
                        <div className="leftFormSection">
                            <TextField
                                id="outlined-full-width"
                                label="First Name"
                                placeholder="Enter your first name"
                                fullWidth
                                value={this.state.reserve.firstName}
                                name="firstName"
                                onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Last Name"
                                placeholder="Enter your last name"
                                fullWidth
                                value={this.state.reserve.lastName}
                                name="lastName"
                                onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
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
                                value={this.state.reserve.companyName}
                                name="companyName"
                                onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
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
                                value={this.state.reserve.registerEmail}
                                name="registerEmail"
                                onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Phone No."
                                placeholder="Enter your phone no."
                                fullWidth
                                inputProps={{ maxLength: 10 }}
                                value={this.state.reserve.mobile_no}
                                name="mobileNo"
                                onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Start Date."
                                placeholder="Enter your start date."
                                fullWidth
                                // value={this.state.reserve.startDate}
                                name="startDate"
                                type="date"
                                min={this.state.minDate}
                                onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="End Date."
                                placeholder="Enter your end date."
                                fullWidth
                                // value={this.state.reserve.endDate}
                                name="endDate"
                                type="date"
                                min={this.state.minDate}
                                onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <div className="checkboxContainer">
                                <input type="checkbox" id="check" value={this.state.tc} onChange={() => {
                                    this.setState({ checkboxPopup: true, error: "" })
                                }} />
                                <div className="checkboxText">I accept terms and conditions for user registration and anonymous user form filling
                                        </div>
                            </div>
                        </div>
                        {/* {this.state.successMessage ? this.showCreatedResponse2() : null} */}
                        <div className="errorMessage">{this.state.error}</div>
                        {this.state.isLoading ? (
                            <div className="loader">
                                <Loader
                                    type="TailSpin"
                                    color="#0055FF"
                                    height={60}
                                    width={60}
                                />
                            </div>
                        ) : null}
                        <div className={this.state.isLoading ? "signInWithMobileContainer2" : "signInWithMobileContainer"} onClick={() => this.postReservation()}>
                            <div className="btnText">Proceed</div>
                        </div>
                    </div> : <React.Fragment />}
                    {this.state.reserveOTP ? <React.Fragment>
                        <OTPBox
                            successMessage={"Your request will be attended shortly"}
                            token={this.state.reserveToken}
                            successFunction={() => this.setState({ reserveOTP: false, reserveProperty: false, reserveButton: true })}
                            close={() => this.setState({ reserveOTP: false, reserveProperty: true })}
                        />
                    </React.Fragment> : <React.Fragment />}
                    {this.state.afterLoginReserveProperty ? <div className="leaveUsContainer adjustleaveUsContainer">
                        <div className="closeButtonContainer" onClick={() => this.setState({ afterLoginReserveProperty: false, reserveButton: true })}>
                            <img src={close} alt="" />
                        </div>
                        <div className="loginHeadText">Leave us a message and we will get back to you</div>
                        <div className="leftFormSection">
                            {console.log(this.state.reserve)}
                            <TextField
                                id="outlined-full-width"
                                label="Start Date."
                                placeholder="Enter your start date."
                                fullWidth
                                // value={this.state.reserve.startDate}
                                name="startDate"
                                type="date"
                                min={this.state.minDate}
                                onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="End Date."
                                placeholder="Enter your end date."
                                fullWidth
                                // value={this.state.reserve.endDate}
                                name="endDate"
                                type="date"
                                min={this.state.minDate}
                                onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        this.postReservation()
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className="errorMessage">{this.state.error.length > 0 ? this.state.error : ""}</div>
                        {this.state.isLoading ? (
                            <div className="loader">
                                <Loader
                                    type="TailSpin"
                                    color="#0055FF"
                                    height={60}
                                    width={60}
                                />
                            </div>
                        ) : null}
                        <div className={this.state.isLoading ? "signInWithMobileContainer2" : "signInWithMobileContainer"} onClick={() => this.postReservation()}>
                            <div className="btnText">Proceed</div>
                        </div>
                    </div> : <React.Fragment />}
                    {this.state.enquireProperty ? <div className="equireContainer contact-inner subscribed">
                        <div className="adjustHeight">
                            <div className="closeButtonContainer" onClick={() => this.setState({ enquireProperty: false, reserveButton: true })}>
                                <img src={close} alt="" />
                            </div>
                            <div className="sec-head">
                                <h4><strong>Leave us a message and we will get back to you</strong></h4>
                            </div>
                            <div className="mail">
                                <input type="text" placeholder="Enter your first name"
                                    value={this.state.enquiry.firstName}
                                    name="firstName"
                                    onChange={this.handleEnquiryChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }} />
                                <label>First Name</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your last name"
                                    fullWidth
                                    value={this.state.enquiry.lastName}
                                    name="lastName"
                                    onChange={this.handleEnquiryChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }}
                                />
                                <label>Last Name</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your company name"
                                    fullWidth
                                    value={this.state.enquiry.companyName}
                                    name="companyName"
                                    onChange={this.handleEnquiryChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }}
                                />
                                <label>Company Name</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your email address"
                                    fullWidth
                                    value={this.state.enquiry.registerEmail}
                                    name="registerEmail"
                                    onChange={this.handleEnquiryChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }}
                                />
                                <label>Email Address</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your phone no."
                                    fullWidth
                                    value={this.state.enquiry.mobileNo}
                                    name="mobileNo"
                                    maxLength="10"
                                    onChange={this.handleEnquiryChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }}
                                />
                                <label>Phone No.</label>
                            </div>
                            <div className="mail">
                                <textarea rows="2" cols="50" name="message"
                                    placeholder="Type your message here …..."
                                    value={this.state.enquiry.message}
                                    name="message"
                                    onChange={this.handleEnquiryChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }}
                                />
                                <label>Message</label>
                            </div>
                            <div className="checkboxContainer">
                                <input type="checkbox" id="check" value={this.state.tc}
                                    onChange={() => {
                                        this.setState({ checkboxPopup: true, error: "" })
                                    }} onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }} />
                                <div className="checkboxText Privacy">By clicking the above button you agree to our <span onClick={() => this.setState({ terms1: true })}>Terms of Service</span> and have read and understood our <span onClick={() => this.setState({ privacypolicy: true })}>Privacy Policy</span>
                                </div>
                            </div>
                            {this.state.enquiryErrors.map(item => {
                                return item
                            })}
                            <div className="errorMessage">{this.state.error}</div>
                            {this.state.isLoading ? (
                                <div className="loader">
                                    <Loader
                                        type="TailSpin"
                                        color="#0055FF"
                                        height={60}
                                        width={60}
                                    />
                                </div>
                            ) : null}
                            <div className={this.state.isLoading ? "btn btn-disabled" : "btn"} onClick={() => { this.state.isLoading ? "" : this.postEnquiry() }}>
                                Proceed
                            </div>
                        </div>
                    </div> : <React.Fragment />}
                    {this.state.enquireOTP ? <React.Fragment>
                        <OTPBox
                            successMessage={"Your request will be attended shortly"}
                            token={this.state.enquiryToken}
                            successFunction={() => this.setState({ enquireOTP: false, enquireProperty: false, reserveButton: true })}
                            close={() => this.setState({ enquireOTP: false, enquireProperty: true })} />
                    </React.Fragment> : <React.Fragment />}
                    {this.state.afterLoginEnquireProperty ? <div className="equireContainer adjustEquireContainer contact-inner subscribed">
                        <div className="adjustHeight">
                            <div className="closeButtonContainer" onClick={() => this.setState({ afterLoginEnquireProperty: false, reserveButton: true })}>
                                <img src={close} alt="" />
                            </div>
                            <div className="sec-head">
                                <h4><strong>Leave us a message and we will get back to you</strong></h4>
                            </div>
                            <div className="mail">
                                <textarea rows="2" cols="50"
                                    placeholder="Type your message here …..."
                                    value={this.state.enquiry.message}
                                    name="message"
                                    onChange={this.handleEnquiryChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postEnquiry()
                                        }
                                    }}
                                />
                                <label>Message</label>
                            </div>
                            {this.state.enquiryErrors.map(item => {
                                return item
                            })}
                            <div className="errorMessage">{this.state.error}</div>
                            {this.state.isLoading ? (
                                <div className="loader">
                                    <Loader
                                        type="TailSpin"
                                        color="#0055FF"
                                        height={60}
                                        width={60}
                                    />
                                </div>
                            ) : null}
                            <div className={this.state.isLoading ? "btn btn-disabled" : "btn"} onClick={() => { this.state.isLoading ? "" : this.postEnquiry() }}>
                                Proceed
                            </div>
                        </div>
                    </div> : <React.Fragment />}
                    {this.state.scheduleTour ? <div className="scheduleTourContainer contact-inner subscribed">
                        <div className="adjustHeight">
                            <div className="closeButtonContainer" onClick={() => this.setState({ scheduleTour: false, reserveButton: true })}>
                                <img src={close} alt="" />
                            </div>
                            <div className="sec-head">
                                <h4><strong>Schedule a Tour</strong></h4>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your first name"
                                    fullWidth
                                    value={this.state.scheduletour.firstName}
                                    name="firstName"
                                    onChange={this.handleScheduleTourChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }}
                                />
                                <label>First Name</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your last name"
                                    fullWidth
                                    value={this.state.scheduletour.lastName}
                                    name="lastName"
                                    onChange={this.handleScheduleTourChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }}
                                />
                                <label>Last Name</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your company name"
                                    fullWidth
                                    value={this.state.enquiry.companyName}
                                    name="companyName"
                                    onChange={this.handleScheduleTourChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <label>Company Name</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your email address"
                                    fullWidth
                                    value={this.state.scheduletour.registerEmail}
                                    name="registerEmail"
                                    onChange={this.handleScheduleTourChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }}
                                />
                                <label>Email Address</label>
                            </div>
                            <div className="mail">
                                <input type="text"
                                    placeholder="Enter your phone no."
                                    fullWidth
                                    value={this.state.scheduletour.mobile_no}
                                    name="mobile_no"
                                    maxLength="10"
                                    onChange={this.handleScheduleTourChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }}
                                />
                                <label>Phone No.</label>
                            </div>
                            <div className="mail">
                                <input
                                    placeholder="Select a Date *"
                                    type="date"
                                    min={this.state.minDate}
                                    fullWidth
                                    value={this.state.scheduletour.date}
                                    name="date"
                                    onChange={this.handleScheduleTourChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }}
                                />
                                <label>Date</label>
                            </div>
                            <div className="checkboxContainer">
                                <input type="checkbox" id="check" value={this.state.tc}
                                    onChange={() => {
                                        this.setState({ checkboxPopup: true, error: "" })
                                    }}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }} />
                                <div className="checkboxText Privacy">By clicking the above button you agree to our <span onClick={() => this.setState({ terms1: true })}>Terms of Service</span> and have read and understood our <span onClick={() => this.setState({ privacypolicy: true })}>Privacy Policy</span>
                                </div>
                            </div>
                            <div className="errorMessage">{this.state.error}</div>
                            {this.state.isLoading ? (
                                <div className="loader">
                                    <Loader
                                        type="TailSpin"
                                        color="#0055FF"
                                        height={60}
                                        width={60}
                                    />
                                </div>
                            ) : null}
                            <div className={this.state.isLoading ? "btn mt-2 mb-2 btn-disabled" : "btn mt-2 mb-2"} onClick={() => { this.state.isLoading ? "" : this.postTour() }}>
                                <div className="btnText">Proceed</div>
                            </div>
                        </div>
                    </div> : <React.Fragment />}
                    {this.state.scheduleTourOTP ? <React.Fragment>
                        <OTPBox
                            successMessage={"Your request will be attended shortly"}
                            token={this.state.tourToken}
                            successFunction={() => this.setState({ scheduleTourOTP: false, scheduleTour: false, reserveButton: true })}
                            close={() => this.setState({ scheduleTourOTP: false, scheduleTour: true })} />
                    </React.Fragment> : <React.Fragment />}
                    {this.state.afterLoginScheduleTour ? <div className="scheduleTourContainer adjustScheduleTourContainer contact-inner subscribed">
                        <div className="adjustHeight">
                            <div className="closeButtonContainer" onClick={() => this.setState({ afterLoginScheduleTour: false, reserveButton: true })}>
                                <img src={close} alt="" />
                            </div>
                            <div className="sec-head">
                                <h4><strong>Schedule a Tour</strong></h4>
                            </div>
                            <div className="mail">
                                <input
                                    placeholder="Select a Date *"
                                    type="date"
                                    min={this.state.minDate}
                                    fullWidth
                                    value={this.state.scheduletour.date}
                                    name="date"
                                    onChange={this.handleScheduleTourChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            this.state.isLoading ? "" : this.postTour()
                                        }
                                    }}
                                />
                                <label>Date</label>
                            </div>
                            <div className="errorMessage">{this.state.error.length > 0 ? this.state.error : ""}</div>
                            {this.state.isLoading ? (
                                <div className="loader">
                                    <Loader
                                        type="TailSpin"
                                        color="#0055FF"
                                        height={60}
                                        width={60}
                                    />
                                </div>
                            ) : null}
                            <div className={this.state.isLoading ? "btn mt-2 mb-2 btn-disabled" : "btn mt-2 mb-2"} onClick={() => { this.state.isLoading ? "" : this.postTour() }}>
                                <div className="btnText">Proceed</div>
                            </div>
                        </div>
                    </div> : <React.Fragment />}
                    <div className="container" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                        <div className="row">
                            <div className="col-md-8">
                                <ul className="wareshose">
                                    <NavLink to="/search"><li><div className="back-btn"><i className="fa fa-chevron-left" aria-hidden="true"></i> Search</div></li></NavLink>
                                    {/* <li><a href="#location">Location</a></li>
                                    <li><a href="#locality">Locality</a></li>
                                    <li><a href="#amenities">Amenities</a></li>
                                    <li><a href="#service">Add On Services</a></li> */}
                                </ul>
                                <div className="sec-head">
                                    <h2>{this.state.warehouseDetails.name}</h2>
                                </div>

                                <div className="availableAreaContainer">
                                    <h6>{this.state.availableDateText}</h6>
                                    <h6>Available Area: {this.state.warehouseDetails.availableArea}</h6>
                                </div>
                                <div className="totalAreaContainer">
                                    <h6>Rate : Rs {this.state.warehouseDetails.areaRate} per sq.ft per week</h6>
                                    <h6>Total Area: {this.state.warehouseDetails.areaSqFt}</h6>
                                </div>
                            </div>
                            {this.state.sharePopup ? <SharePopup id={this.props.match.params.id} /> : <React.Fragment />}
                            <div className="col-md-4">
                                <div className="right-sec">
                                    <h5>{this.state.warehouseDetails.city}, {this.state.warehouseDetails.state}, Pin-code : {this.state.warehouseDetails.pincode}</h5>
                                    <div className="share-it">
                                        <ul>
                                            <li>
                                                <div onClick={() => this.shortlistedClick()}>
                                                    <p><i className={this.state.selectHeart ? "fa fa-heart heartAdjust" : "fa fa-heart-o"}></i></p>
                                                    <p><span className={this.state.selectHeart ? "heartAdjust" : ""}>Save</span></p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="" onClick={() => { this.setState({ sharePopup: !this.state.sharePopup }) }}>
                                                    <p><i className="fa fa-share-alt"></i></p>
                                                    <p><span>Share</span></p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-8 mb-3">
                                <div className="blog-detail war">
                                    <div>
                                        <WarehouseSlider data={this.props.match.params.id} />
                                        <p className="mt-4"> {this.state.warehouseDetails.desc}</p>
                                    </div>
                                    <CustomizedAccordions
                                        google={this.props.google}
                                        zoom={8}
                                        style={mapStyles}
                                        initialCenter={{ lat: this.state.warehouseDetails.latitude, lng: this.state.warehouseDetails.longitude }}
                                        city={this.state.warehouseDetails.city}
                                        state={this.state.warehouseDetails.state}
                                        pincode={this.state.warehouseDetails.pincode}
                                        locality={this.state.getLocality}
                                        center={this.state.center}
                                        latitude={this.state.warehouseDetails.latitude}
                                        longitude={this.state.warehouseDetails.longitude}
                                        amenity={this.state.getAmenity}
                                        addonslider={this.state.getAddOnService}
                                        certTag={this.state.industryTag}
                                        isMarkerShown={this.props.isMarkerShown}
                                        MobCert={this.state.certificate}
                                        similarWarehouse={this.state.similarWarehouse}
                                        // warehouseImages={this.state.warehouseDetails.images}
                                        onClick={() => this.setState({
                                            ...this.state,
                                            isPopup: true
                                        })}
                                    />
                                    <div className="cardContainer mt-4">
                                        {this.state.similarWarehouse.length > 0 ?
                                            getSimilarWarehouses() : <div>No Similar Warehouses</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {!this.state.isDisabled ?
                                <div className="col-md-4 mb-3">
                                    {this.state.reserveButton ? <div className="sss">
                                        {/* <div className="subscribed">
                                                <div className="sec-head">
                                                    <h4><strong>Like the property! Reserve now!</strong></h4>
                                                </div>
                                                <p>You can reserve this property directly online. Pay through SSL encrypted CC/ UPI.</p>
                                                <div className="btn" onClick={() => {
                                                    if (baseAPI.isLogin()) {
                                                        this.setState({ afterLoginReserveProperty: true, reserveButton: false, error: "" })
                                                    }
                                                    else this.setState({ reserveProperty: true, reserveButton: false, error: "" })
                                                }}>Reserve Now</div>
                                            </div> */}

                                        <div className=" subscribed"> {/* remember to add mt-4 when reserve now button are visible */}
                                            <div className="sec-head">
                                                <h4><strong>Have some questions regarding the property?</strong></h4>
                                            </div>
                                            <div className="btn mb-2" onClick={() => {
                                                if (baseAPI.isLogin()) {
                                                    this.setState({ afterLoginEnquireProperty: true, reserveButton: false, error: "" })
                                                }
                                                else this.setState({ enquireProperty: true, reserveButton: false, error: "" })
                                            }}>Enquire Now</div>
                                            <p>You can book a free site visit . Our Representative will get back to you within one working day ( Max) to schedule a site visit.</p>
                                            <div className="btn" onClick={() => {
                                                if (baseAPI.isLogin()) {
                                                    this.setState({ afterLoginScheduleTour: true, reserveButton: false, error: "" })
                                                }
                                                else this.setState({ scheduleTour: true, reserveButton: false, error: "" })
                                            }}>Schedule a tour</div>
                                        </div>
                                    </div> : <React.Fragment />}
                                </div> : <></>}
                        </div>
                    </div>
                </React.Fragment>)
                }
                {
                    this.state.matches && (
                        <React.Fragment>
                            {this.state.isPopup ? <div className="amenitiesPopupContainer">
                                <div className="crossImage" onClick={() => this.setState({ isPopup: false })}>
                                    <img src={close} alt="" />
                                </div>
                                <AmenitiesPopSlider />
                            </div> : <React.Fragment />}
                            <div className="container" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <ul className="wareshose">
                                            <NavLink to="/search"><li><div className="back-btn"><i className="fa fa-chevron-left" aria-hidden="true"></i> Search</div></li></NavLink>
                                            <li><a href="#location">Location</a></li>
                                            <li><a href="#locality">Locality</a></li>
                                            <li><a href="#amenities">Amenities</a></li>
                                            <li><a href="#service">Add On Services</a></li>
                                        </ul>
                                        <div className="sec-head">
                                            <h2>{this.state.warehouseDetails.name}</h2>
                                        </div>
                                        <div className="availableAreaContainer">
                                            <h5>{this.state.availableDateText}</h5>
                                            <h5>Available Area: {this.state.warehouseDetails.availableArea}</h5>
                                        </div>
                                        <div className="totalAreaContainer">
                                            <h5>Rate : Rs {this.state.warehouseDetails.areaRate} per sq.ft per week</h5>
                                            <h5>Total Area: {this.state.warehouseDetails.areaSqFt}</h5>
                                        </div>
                                    </div>
                                    {this.state.sharePopup ? <SharePopup /> : <React.Fragment />}
                                    <div className="col-md-4">
                                        <div className="right-sec">
                                            <h5>{this.state.warehouseDetails.city}, {this.state.warehouseDetails.state}, Pin-code : {this.state.warehouseDetails.pincode}</h5>
                                            <div className="share-it">
                                                <ul>
                                                    <li>
                                                        <div onClick={() => this.shortlistedClick()}>
                                                            <p><i className={this.state.selectHeart ? "fa fa-heart heartAdjust" : "fa fa-heart-o"}></i></p>
                                                            <p><span className={this.state.selectHeart ? "heartAdjust" : ""}>Save</span></p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="" onClick={() => { this.setState({ sharePopup: !this.state.sharePopup }) }}>
                                                            <p><i className="fa fa-share-alt"></i></p>
                                                            <p><span>Share</span></p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-8 mb-3">
                                        <div className="blog-detail war">
                                            <div>
                                                <WarehouseSlider data={this.props.match.params.id} />
                                                <p className="mt-4"> {this.state.warehouseDetails.desc}</p>
                                            </div>

                                            <div className="pt-70" id="location">
                                                <h4>Location</h4>
                                                <p>{this.state.warehouseDetails.city}, {this.state.warehouseDetails.state}, Pin-code : {this.state.warehouseDetails.pincode}</p>

                                                <div className="map mb-3">
                                                    <TestMap
                                                        mapStyles={mapStyles}
                                                        center={this.center}
                                                        markers={this.state.marker}
                                                        highlightCard={() => { }}
                                                        navigation
                                                    />
                                                </div>
                                            </div>
                                            {this.state.getLocality.length === 0 ? <React.Fragment />
                                                : <div className="pt-70" id="locality">
                                                    <h4>Locality</h4>
                                                    {this.state.getLocality.map(item => {
                                                        return <p>{item.name} (less than {item.distance} km away)</p>
                                                    })}
                                                </div>
                                            }

                                            {this.state.getAmenity.length === 0 ? <React.Fragment /> : <div className="pt-70" id="amenities">
                                                <h4>Amenities</h4>
                                                <div className="product-categories">
                                                    {this.sampleslider()}
                                                </div>
                                            </div>}

                                            {this.state.getAddOnService.length === 0 ? <React.Fragment /> : <div className="pt-70" id="service">
                                                <h4>Add On Services</h4>
                                                <div className="product-categories">
                                                    {this.addonSlider()}
                                                </div>
                                            </div>}
                                            {/* {this.state.certificate.length === 0 ? <React.Fragment /> : <div className="pt-70" id="certificate">
                                                <h4>Certifications</h4>
                                                {this.state.certificate.map(item => {
                                                    return <p><a className="certificateText" href={item.file}>{item.description}</a></p>
                                                })}
                                            </div>} */}

                                            {this.state.industryTag.length === 0 ? <React.Fragment /> : <div className="pt-70" id="industry">
                                                <h4>Industry</h4>
                                                <div className="industryTagContainerAdjust">
                                                    {this.state.industryTag.map(item => {
                                                        return <BlogButton tags={item.name} />
                                                    })}
                                                </div>
                                            </div>}
                                            <div className="cardContainer mt-4">
                                                <h4>Similar Warehouses</h4>
                                                {this.state.similarWarehouse.length > 0 ?
                                                    <div className="row">{getSimilarWarehouses()} </div> : <div>No Similar Warehouses</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {!this.state.isDisabled ?
                                        <div className="col-md-4 mb-3">
                                            {this.state.reserveButton ? <div className="sss">
                                                {/* <div className="subscribed">
                                                <div className="sec-head">
                                                    <h4><strong>Like the property! Reserve now!</strong></h4>
                                                </div>
                                                <p>You can reserve this property directly online. Pay through SSL encrypted CC/ UPI.</p>
                                                <div className="btn" onClick={() => {
                                                    if (baseAPI.isLogin()) {
                                                        this.setState({ afterLoginReserveProperty: true, reserveButton: false, error: "" })
                                                    }
                                                    else this.setState({ reserveProperty: true, reserveButton: false, error: "" })
                                                }}>Reserve Now</div>
                                            </div> */}

                                                <div className=" subscribed"> {/* remember to add mt-4 when reserve now button are visible */}
                                                    <div className="sec-head">
                                                        <h4><strong>Have some questions regarding the property?</strong></h4>
                                                    </div>
                                                    <div tabIndex="0" className="btn mb-2" onClick={() => {
                                                        if (baseAPI.isLogin()) {
                                                            this.setState({ afterLoginEnquireProperty: true, reserveButton: false, error: "" })
                                                        }
                                                        else this.setState({ enquireProperty: true, reserveButton: false, error: "" })
                                                    }}>Enquire Now</div>
                                                    <p>You can book a free site visit . Our Representative will get back to you within one working day ( Max) to schedule a site visit.</p>
                                                    <div tabIndex="0" className="btn" onClick={() => {
                                                        if (baseAPI.isLogin()) {
                                                            this.setState({ afterLoginScheduleTour: true, reserveButton: false, error: "" })
                                                        }
                                                        else this.setState({ scheduleTour: true, reserveButton: false, error: "" })
                                                    }}>Schedule a tour</div>
                                                </div>
                                            </div> : <React.Fragment />}
                                            <div className="adjustSubStickySection">
                                                {this.state.reserveProperty ? <div className="leaveUsContainer">
                                                    <div className="closeButtonContainer" onClick={() => this.setState({ reserveProperty: false, reserveButton: true, error: "", isLoading: false })}>
                                                        <img src={close} alt="" />
                                                    </div>
                                                    <div className="loginHeadText">Leave us a message and we will get back to you</div>
                                                    <div className="leftFormSection">
                                                        <TextField
                                                            id="outlined-full-width"
                                                            label="First Name"
                                                            placeholder="Enter your first name"
                                                            fullWidth
                                                            value={this.state.reserve.firstName}
                                                            name="firstName"
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            id="outlined-full-width"
                                                            label="Last Name"
                                                            placeholder="Enter your last name"
                                                            fullWidth
                                                            value={this.state.reserve.lastName}
                                                            name="lastName"
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
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
                                                            value={this.state.reserve.companyName}
                                                            name="companyName"
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
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
                                                            value={this.state.reserve.registerEmail}
                                                            name="registerEmail"
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            id="outlined-full-width"
                                                            label="Phone No."
                                                            placeholder="Enter your phone no."
                                                            fullWidth
                                                            inputProps={{ maxLength: 10 }}
                                                            value={this.state.reserve.mobileNo}
                                                            name="mobileNo"
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, e.target.value)}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            id="outlined-full-width"
                                                            label="Start Date."
                                                            placeholder="Enter your start date."
                                                            fullWidth
                                                            // value={this.state.reserve.startDate}
                                                            name="startDate"
                                                            type="date"
                                                            min={this.state.minDate}
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            id="outlined-full-width"
                                                            label="End Date."
                                                            placeholder="Enter your end date."
                                                            fullWidth
                                                            // value={this.state.reserve.endDate}
                                                            name="endDate"
                                                            type="date"
                                                            min={this.state.minDate}
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <div className="checkboxContainer">
                                                            <input type="checkbox" id="check" value={this.state.tc}
                                                                onChange={() => {
                                                                    this.setState({ checkboxPopup: true, error: "" })
                                                                }} onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.postReservation()
                                                                    }
                                                                }} />
                                                            <div className="checkboxText">I accept terms and conditions for user registration and anonymous user form filling
                                                        </div>
                                                        </div>
                                                    </div>
                                                    {/* {this.state.successMessage ? this.showCreatedResponse2() : null} */}
                                                    <div className="errorMessage">{this.state.error}</div>
                                                    {this.state.isLoading ? (
                                                        <div className="loader">
                                                            <Loader
                                                                type="TailSpin"
                                                                color="#0055FF"
                                                                height={60}
                                                                width={60}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div tabIndex="0" className={this.state.isLoading ? "signInWithMobileContainer2" : "signInWithMobileContainer"} onClick={() => this.postReservation()}>
                                                        <div className="btnText">Proceed</div>
                                                    </div>
                                                </div> : <React.Fragment />}
                                                {this.state.reserveOTP ? <React.Fragment>
                                                    <OTPBox
                                                        successMessage={"Your request will be attended shortly"}
                                                        token={this.state.reserveToken}
                                                        successFunction={() => this.setState({ reserveOTP: false, reserveProperty: false, reserveButton: true })}
                                                        close={() => this.setState({ reserveOTP: false, reserveProperty: true, error: "" })}
                                                    />
                                                </React.Fragment> : <React.Fragment />}
                                                {this.state.afterLoginReserveProperty ? <div className="leaveUsContainer adjustleaveUsContainer">
                                                    <div className="closeButtonContainer" onClick={() => this.setState({ afterLoginReserveProperty: false, reserveButton: true, isLoading: false })}>
                                                        <img src={close} alt="" />
                                                    </div>
                                                    <div className="loginHeadText">Leave us a message and we will get back to you</div>
                                                    <div className="leftFormSection">
                                                        {console.log(this.state.reserve)}
                                                        <TextField
                                                            id="outlined-full-width"
                                                            label="Start Date."
                                                            placeholder="Enter your start date."
                                                            fullWidth
                                                            // value={this.state.reserve.startDate}
                                                            name="startDate"
                                                            type="date"
                                                            min={this.state.minDate}
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            id="outlined-full-width"
                                                            label="End Date."
                                                            placeholder="Enter your end date."
                                                            fullWidth
                                                            // value={this.state.reserve.endDate}
                                                            name="endDate"
                                                            type="date"
                                                            min={this.state.minDate}
                                                            onChange={(e) => this.handleReserveChange(e, e.target.name, new Date(e.target.value))}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.postReservation()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                    </div>
                                                    {this.state.isLoading ? (
                                                        <div className="loader">
                                                            <Loader
                                                                type="TailSpin"
                                                                color="#0055FF"
                                                                height={60}
                                                                width={60}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div tabIndex="0" className="errorMessage">{this.state.error.length > 0 ? this.state.error : ""}</div>
                                                    <div className={this.state.isLoading ? "signInWithMobileContainer2" : "signInWithMobileContainer"} onClick={() => this.postReservation()}>
                                                        <div className="btnText">Proceed</div>
                                                    </div>
                                                </div> : <React.Fragment />}
                                                {this.state.enquireProperty ? <div className="equireContainer contact-inner subscribed">
                                                    <div className="closeButtonContainer" onClick={() => this.setState({ enquireProperty: false, reserveButton: true, error: "", isLoading: false })}>
                                                        <img src={close} alt="" />
                                                    </div>
                                                    <div className="sec-head">
                                                        <h4><strong>Leave us a message and we will get back to you</strong></h4>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text" placeholder="Enter your first name"
                                                            value={this.state.enquiry.firstName}
                                                            name="firstName"
                                                            onChange={this.handleEnquiryChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }} />
                                                        <label>First Name</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your last name"
                                                            fullWidth
                                                            value={this.state.enquiry.lastName}
                                                            name="lastName"
                                                            onChange={this.handleEnquiryChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }}
                                                        />
                                                        <label>Last Name</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your company name"
                                                            fullWidth
                                                            value={this.state.enquiry.companyName}
                                                            name="companyName"
                                                            onChange={this.handleEnquiryChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }}
                                                        />
                                                        <label>Company Name</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your email address"
                                                            fullWidth
                                                            value={this.state.enquiry.registerEmail}
                                                            name="registerEmail"
                                                            onChange={this.handleEnquiryChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }}
                                                        />
                                                        <label>Email Address</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your phone no."
                                                            fullWidth
                                                            value={this.state.enquiry.mobileNo}
                                                            name="mobileNo"
                                                            maxLength="10"
                                                            onChange={this.handleEnquiryChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }}
                                                        />
                                                        <label>Phone No.</label>
                                                    </div>
                                                    <div className="mail">
                                                        <textarea rows="2" cols="50" name="message"
                                                            placeholder="Type your message here …..."
                                                            value={this.state.enquiry.message}
                                                            name="message"
                                                            onChange={this.handleEnquiryChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }}
                                                        />
                                                        <label>Message</label>
                                                    </div>
                                                    <div className="checkboxContainer">
                                                        <input type="checkbox" id="check" value={this.state.tc}
                                                            onChange={() => {
                                                                this.setState({ checkboxPopup: true, error: "" })
                                                            }} onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }} />
                                                        <div className="checkboxText Privacy">By clicking the above button you agree to our <span onClick={() => this.setState({ terms1: true })}>Terms of Service</span> and have read and understood our <span onClick={() => this.setState({ privacypolicy: true })}>Privacy Policy</span>
                                                        </div>
                                                    </div>
                                                    {this.state.enquiryErrors.map(item => {
                                                        return item
                                                    })}
                                                    <div className="errorMessage">{this.state.error}</div>
                                                    {this.state.isLoading ? (
                                                        <div className="loader">
                                                            <Loader
                                                                type="TailSpin"
                                                                color="#0055FF"
                                                                height={60}
                                                                width={60}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div tabIndex="0" className={this.state.isLoading ? "btn mt-2 mb-2 btn-disabled" : "btn mt-2 mb-2"} onClick={() => { this.state.isLoading ? "" : this.postEnquiry() }} onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.postEnquiry()
                                                        }
                                                    }}>
                                                        Proceed
                                                </div>
                                                </div> : <React.Fragment />}
                                                {this.state.enquireOTP ? <React.Fragment>
                                                    <OTPBox
                                                        successMessage={"Your request will be attended shortly"}
                                                        token={this.state.enquiryToken}
                                                        successFunction={() => this.setState({ enquireOTP: false, enquireProperty: false, reserveButton: true })}
                                                        close={() => this.setState({ enquireOTP: false, enquireProperty: true, error: "" })} />
                                                </React.Fragment> : <React.Fragment />}
                                                {this.state.afterLoginEnquireProperty ? <div className="equireContainer contact-inner subscribed adjustEquireContainer">
                                                    <div className="closeButtonContainer" onClick={() => this.setState({ afterLoginEnquireProperty: false, reserveButton: true, isLoading: false })}>
                                                        <img src={close} alt="" />
                                                    </div>
                                                    <div className="sec-head">
                                                        <h4><strong>Leave us a message and we will get back to you</strong></h4>
                                                    </div>

                                                    <div className="mail">
                                                        <textarea
                                                            placeholder="Type your message here …..."
                                                            value={this.state.enquiry.message}
                                                            name="message"
                                                            onChange={this.handleEnquiryChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postEnquiry()
                                                                }
                                                            }}
                                                        />
                                                        <label>Message</label>
                                                    </div>
                                                    {this.state.enquiryErrors.map(item => {
                                                        return item
                                                    })}
                                                    <div className="errorMessage">{this.state.error}</div>
                                                    {this.state.isLoading ? (
                                                        <div className="loader">
                                                            <Loader
                                                                type="TailSpin"
                                                                color="#0055FF"
                                                                height={60}
                                                                width={60}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div tabIndex="0" className={this.state.isLoading ? "btn mt-2 mb-2 btn-disabled" : "btn mt-2 mb-2"} onClick={() => { this.state.isLoading ? "" : this.postEnquiry() }} onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.postEnquiry()
                                                        }
                                                    }}>
                                                        Proceed
                                                </div>
                                                </div> : <React.Fragment />}
                                                {this.state.scheduleTour ? <div className="scheduleTourContainer contact-inner subscribed">
                                                    <div className="closeButtonContainer" onClick={() => this.setState({ scheduleTour: false, reserveButton: true, error: "", isLoading: false })}>
                                                        <img src={close} alt="" />
                                                    </div>
                                                    <div className="sec-head">
                                                        <h4><strong>Schedule a Tour</strong></h4>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your first name"
                                                            fullWidth
                                                            value={this.state.scheduletour.firstName}
                                                            name="firstName"
                                                            onChange={this.handleScheduleTourChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }}
                                                        />
                                                        <label>First Name</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your last name"
                                                            fullWidth
                                                            value={this.state.scheduletour.lastName}
                                                            name="lastName"
                                                            onChange={this.handleScheduleTourChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }}
                                                        />
                                                        <label>Last Name</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your company name"
                                                            fullWidth
                                                            value={this.state.enquiry.companyName}
                                                            name="companyName"
                                                            onChange={this.handleScheduleTourChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            variant="outlined"
                                                        />
                                                        <label>Company Name</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your email address"
                                                            fullWidth
                                                            value={this.state.scheduletour.registerEmail}
                                                            name="registerEmail"
                                                            onChange={this.handleScheduleTourChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }}
                                                        />
                                                        <label>Email Address</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input type="text"
                                                            placeholder="Enter your phone no."
                                                            fullWidth
                                                            value={this.state.scheduletour.mobile_no}
                                                            name="mobile_no"
                                                            maxLength="10"
                                                            onChange={this.handleScheduleTourChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }}
                                                        />
                                                        <label>Phone No.</label>
                                                    </div>
                                                    <div className="mail">
                                                        <input
                                                            placeholder="Select a Date *"
                                                            type="date"
                                                            min={this.state.minDate}
                                                            fullWidth
                                                            value={this.state.scheduletour.date}
                                                            name="date"
                                                            onChange={this.handleScheduleTourChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }}
                                                        />
                                                        <label>Date</label>
                                                    </div>
                                                    <div className="checkboxContainer">
                                                        <input type="checkbox" id="check" value={this.state.tc}
                                                            onChange={() => {
                                                                this.setState({ checkboxPopup: true, error: "" })
                                                            }}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }} />
                                                        <div className="checkboxText Privacy">By clicking the above button you agree to our <span onClick={() => this.setState({ terms1: true })}>Terms of Service</span> and have read and understood our <span onClick={() => this.setState({ privacypolicy: true })}>Privacy Policy</span>
                                                        </div>
                                                    </div>
                                                    <div className="errorMessage">{this.state.error}</div>
                                                    {this.state.isLoading ? (
                                                        <div className="loader">
                                                            <Loader
                                                                type="TailSpin"
                                                                color="#0055FF"
                                                                height={60}
                                                                width={60}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div tabIndex="0" className={this.state.isLoading ? "btn mt-2 mb-2 btn-disabled" : "btn mt-2 mb-2"} onClick={() => { this.state.isLoading ? "" : this.postTour() }} onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.postTour()
                                                        }
                                                    }}>
                                                        <div className="btnText">Proceed</div>
                                                    </div>
                                                </div> : <React.Fragment />}
                                                {this.state.scheduleTourOTP ? <React.Fragment>
                                                    <OTPBox
                                                        successMessage={"Your request will be attended shortly"}
                                                        token={this.state.tourToken}
                                                        successFunction={() => this.setState({ scheduleTourOTP: false, scheduleTour: false, reserveButton: true })}
                                                        close={() => this.setState({ scheduleTourOTP: false, scheduleTour: true, error: "" })} />
                                                </React.Fragment> : <React.Fragment />}
                                                {this.state.afterLoginScheduleTour ? <div className="scheduleTourContainer contact-inner subscribed adjustScheduleTourContainer">
                                                    <div className="closeButtonContainer" onClick={() => this.setState({ afterLoginScheduleTour: false, reserveButton: true, isLoading: false })}>
                                                        <img src={close} alt="" />
                                                    </div>
                                                    <div className="sec-head">
                                                        <h4><strong>Schedule a Tour</strong></h4>
                                                    </div>
                                                    <div className="mail">
                                                        <input
                                                            placeholder="Select a Date *"
                                                            type="date"
                                                            min={this.state.minDate}
                                                            fullWidth
                                                            value={this.state.scheduletour.date}
                                                            name="date"
                                                            onChange={this.handleScheduleTourChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.postTour()
                                                                }
                                                            }}
                                                        />
                                                        <label>Date</label>
                                                    </div>
                                                    <div className="errorMessage">{this.state.error.length > 0 ? this.state.error : ""}</div>
                                                    {this.state.isLoading ? (
                                                        <div className="loader">
                                                            <Loader
                                                                type="TailSpin"
                                                                color="#0055FF"
                                                                height={60}
                                                                width={60}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div tabIndex="0" className={this.state.isLoading ? "btn mt-2 mb-2 btn-disabled" : "btn mt-2 mb-2"} onClick={() => { this.state.isLoading ? "" : this.postTour() }} onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.postTour()
                                                        }
                                                    }}>
                                                        <div className="btnText">Proceed</div>
                                                    </div>
                                                </div> : <React.Fragment />}
                                            </div>
                                        </div> : <></>}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
            </div >
        );
    }
}

export default ViewWareHouseDetails;
