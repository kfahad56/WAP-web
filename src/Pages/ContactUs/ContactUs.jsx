/* eslint-disable */
import React, { Component } from 'react';
import './contactus.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import TextField from '@material-ui/core/TextField';
import Loader from "react-loader-spinner";
import * as base from "../../Apis/base";
import TestMap from '../../components/MapBox/TestMap';
import Cookie from "js-cookie";
import $ from 'jquery';
import contactCms from '../../cms_pages/contact.json';
import * as managerAPI from '../../Apis/ContactUs'
import illustration from '../../components/images/mail_sent.svg'
import { Popup } from '../../components/Popup/Popup';
import { Helmet } from "react-helmet";
import { NavLink } from 'react-router-dom';
class ContactUs extends Component {
    state = {
        fullName: "",
        companyName: "",
        Email: "",
        mobile_no: "",
        message: "",
        isLoading: false,
        showCreatedResponse: false,
        error: "",
        isPopupOpen: false,
        matches: window.matchMedia("(min-width: 480px)").matches
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value, error: "", isLoading: false });
    };
    handleChange2 = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }
        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
        this.setState({ [e.target.name]: onlyNums, error: "", isLoading: false });
    };
    handleChange3 = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    keyPress = (event) => {
        if (event.keyCode === 13) {
            this.setState({
                message: '',
            });
        }
    }
    contactForm = () => {
        this.setState({ isLoading: true });

        let manager = new managerAPI.ContactUs({
            fullName: this.state.fullName,
            companyName: this.state.companyName,
            email: this.state.Email,
            mobile: this.state.mobile_no,
            message: this.state.message,
        })
        managerAPI.contactUs(
            'test',
            manager,
            (json, status) => {
                this.setState({
                    isLoading: false,
                    showCreatedResponse: true,
                    status: status,
                    responseData: json,
                    isPopupOpen: true,
                    fullName: '',
                    companyName: '',
                    Email: '',
                    mobile_no: '',
                    message: ''
                })
                if (this.state.status === 502) {
                    this.setState({ error: "Some Error Occured Try Again" })
                    return;
                }
            },
            (errors) => {
                this.setState({ error: errors[0] })
            }
        )
    }
    // showCreatedResponse = () => {
    //     if (!this.state.isLoading) {
    //         if (this.state.status === 200) {
    //             setTimeout(() => {
    //                 this.setState({
    //                     showCreatedResponse: false,
    //                     fullName: "",
    //                     companyName: "",
    //                     Email: "",
    //                     mobile_no: "",
    //                     message: ""
    //                 });
    //             }, 2000);
    //             return <div className="error200 ani-show">Successfully send a message</div>;
    //         } else if (this.state.status === 422) {
    //             return (
    //                 <div className="error404 ani-show">Please verify if all the fields are filled correctly</div>
    //             );
    //         } else if (this.state.status === 404) {
    //             return (
    //                 <div className="error404 ani-show">Company With Given Id Not Present</div>
    //             );
    //         } else if (this.state.status === 409) {
    //             return <div className="error409 ani-show">Email id or mobile number already Exists in the system</div>;
    //         } else {
    //             console.log("Errors");
    //         }
    //     } else {
    //         return (
    //             <div className="loader">
    //                 <Loader type="TailSpin" color="#0055FF" height={60} width={60} />
    //             </div>
    //         );
    //     }
    // };
    componentDidMount() {
        $(window).scrollTop(0)
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 480px)").addListener(handler);
    }
    componentDidUpdate() {
        if (this.state.error !== "") {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        }
    }
    render() {
        const mapStyles = {
            width: '32.95833vw',
            height: '19.21875vw',
            borderRadius: '1vw',
            outline: 'none'
        };
        const mobStyle = {
            width: '90vw',
            height: '50vw',
            borderRadius: '1vw',
            outline: 'none'
        }
        const termsCheck = () => {
            if (base.isVendorLogin()) {
                return <p>By clicking the button below, you agree to our <NavLink to="/terms-of-service-partner">Terms of Service</NavLink> and have read and understood our <NavLink to="/privacy-policy">Privacy Policy</NavLink></p>
            } else {
                return <p>By clicking the button below, you agree to our <NavLink to="/terms-of-service-client">Terms of Service</NavLink> and have read and understood our <NavLink to="/privacy-policy">Privacy Policy</NavLink></p>
            }
        }
        return (
            <div className="contactUsContainer">
                <Helmet>
                    <title>{contactCms.seo.title}</title>
                    <meta
                        name="description"
                        content={contactCms.seo.description}
                    />
                    <meta name="keywords" content={contactCms.seo.keywords} />
                </Helmet>
                {this.state.isPopupOpen ?
                    <Popup
                        illustration={illustration}
                        text="Check your email to complete the process"
                        handleClose={() => this.setState({ isPopupOpen: false })}
                        isPopupOpen={this.state.isPopupOpen}
                    /> : <React.Fragment />}
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                <section className="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="sec-head">
                                    <h2>Contact Us</h2>
                                </div>
                                <div className="contact-inner">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mail">
                                                    <input type="text" name="fullName" placeholder="Enter your full name" value={this.state.fullName}
                                                        onChange={this.handleChange}
                                                        onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.contactForm()
                                                            }
                                                        }} />
                                                    <label>Full Name</label>
                                                </div>

                                                <div className="mail">
                                                    <input type="text" name="companyName" placeholder="Enter your company name" value={this.state.companyName}
                                                        onChange={this.handleChange}
                                                        onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.contactForm()
                                                            }
                                                        }} />
                                                    <label>Company Name </label>
                                                </div>

                                                <div className="mail">
                                                    <input type="email" name="Email" placeholder="Enter your email address" value={this.state.Email}
                                                        onChange={this.handleChange}
                                                        onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.contactForm()
                                                            }
                                                        }} />
                                                    <label>Email Address</label>
                                                </div>

                                                <div className="mail">
                                                    <input type="text" name="mobile_no" placeholder="Enter your mobile number" value={this.state.mobile_no}
                                                        onChange={this.handleChange2}
                                                        maxLength="10"
                                                        onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.contactForm()
                                                            }
                                                        }} />
                                                    <label>Phone No.</label>
                                                </div>
                                                {/* {this.state.showCreatedResponse ? this.showCreatedResponse() : null} */}
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mail">
                                                    <textarea rows="4" cols="50" name="message" placeholder="Message......" value={this.state.message}
                                                        onChange={this.handleChange}></textarea>
                                                    <label>Message</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-left">
                                                <div className="privacy">
                                                    {termsCheck()}
                                                </div>
                                                <div className="error404">{this.state.error}</div>
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
                                                <div className="mail" style={{ marginTop: "30px" }}>
                                                    <div tabIndex="0" className={this.state.isLoading ? "btn btn2 btn-disabled" : "btn btn2"} onClick={() => { this.state.isLoading ? "" : this.contactForm() }}
                                                        onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.contactForm()
                                                            }
                                                        }}>Submit</div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-1">
                                <div className="borders"></div>
                            </div>

                            <div className="col-md-5">
                                <div className="contact-info">
                                    <div className="sec-head">
                                        <h2>Corporate Office</h2>
                                    </div>

                                    <div className="info">
                                        <ul>
                                            <li className="clearfix"><strong><i className="fa fa-map-marker"></i> </strong> <span className="txt">{contactCms.address}</span></li>
                                        </ul>
                                    </div>

                                    <div className="sec-head mt-4">
                                        <h2>Email Address</h2>
                                    </div>

                                    <div className="info">
                                        <p>Questions about plans, pricing, or availability? <br />Just drop us an email.</p>
                                        <ul>
                                            <li className="clearfix"><strong><i className="fa fa-envelope messageIconAdjust"></i> </strong> <a className="txt" href="mailto:contact@WAP.in">{contactCms.email}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
            </div>
        );
    }
}

export default ContactUs;