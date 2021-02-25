/* eslint-disable */
import React, { Component } from 'react';
import './vendorlogin.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import hubshubText from '../../components/images/hubshubText.png';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Loader from "react-loader-spinner";
import BackButton from '../../components/BackButton/BackButton';
import OTPBox from '../../components/OTPBox/OTPBox';
import * as vendorAPI from '../../Apis/vendor';
import * as loginAPI from '../../Apis/Login';
import * as baseAPI from "../../Apis/base";
import { TermsPopup2 } from '../Terms2/Terms2';
import { PrivacyPolicyPopup } from '../PrivacyPolicyPopup/PrivacyPolicyPopup';
import { FullScreenDialog2 } from '../../components/TermsPopup2/TermsPopup2';
import { NavLink } from 'react-router-dom'
import $ from 'jquery';
class VendorLogin extends Component {
    state = {
        isLoading: false,
        firstName: "",
        lastName: "",
        companyName: "",
        registerEmail: "",
        mobile_no: "",
        registerPassword: "",
        confirmPassword: "",
        showCreatedResponse: false,
        otpBox: false,
        error: "",
        tc: false,
        checkboxPopup: false,
        showPassword: false,
        showPassword2: false,
        terms2: false,
        privacypolicy: false
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
    registerVendor = () => {
        this.setState({ isLoading: true })
        let terms = $('#check').is(":not(:checked)");
        if (this.state.registerPassword !== this.state.confirmPassword) {
            this.setState({ error: "The password doesn't match" })
            return;
        }
        else if (terms) {
            this.setState({ tc: false, error: "T&C needs to be accepted" })
            return;
        } else if ($('#check').is(":checked")) {
            this.setState({ tc: true })
        }
        let manager = new vendorAPI.Vendor({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            companyName: this.state.companyName,
            email: this.state.registerEmail,
            phoneNo: this.state.mobile_no,
            password: this.state.registerPassword
        })
        vendorAPI.vendor(
            manager,
            this.state.tc,
            (status, data) => {
                if (status === 403 || status === 400 || status === 404 || status === 422) {
                    this.setState({ error: "Invalid Token", isLoading: false })

                } else if (status === 409) {
                    this.setState({ error: "Email id or mobile number already Exists in the system" })
                    return
                }
                this.setState({
                    isLoading: false,
                    showCreatedResponse: true,
                    status: status,
                    responseData: data
                })
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 500)
            },
            (error) => { this.setState({ error: error[0] }) }
        )
    }
    showCreatedResponse = () => {
        if (!this.state.isLoading) {
            if (this.state.status === 200) {
                this.setState({ otpBox: true })
                return <div className="error200 ani-show">Successfully Created</div>;
            } else {
                console.log("Errors");
            }
        } else {
            return (
                <div className="vendorLoader">
                    <Loader type="TailSpin" color="#0055FF" height={60} width={60} />
                </div>
            );
        }
    };
    componentDidMount() {
        $(window).scrollTop(0)
        if (baseAPI.isLogin() || baseAPI.isVendorLogin()) {
            return this.props.history.push('/')
        }
    }
    componentDidUpdate() {
        if (this.state.error !== "") {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        }
    }
    render() {
        const handleClickShowPassword = () => {
            this.setState({ ...this.state, showPassword: !this.state.showPassword });
        };
        const handleClickShowPassword2 = () => {
            this.setState({ ...this.state, showPassword2: !this.state.showPassword2 });
        };
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        const termsTrue = () => {
            if ($('#check').is(":checked")) {
                $('#check').prop('checked', true);
                this.setState({ tc: true, checkboxPopup: false, error: "" })
            }
        }
        const closeTerm = () => {
            if ($('#check').is(":checked") || $('#check').is(":not(:checked)")) {
                $('#check').prop('checked', false);
                this.setState({ tc: false, checkboxPopup: false, error: "", terms2: false, privacypolicy: false })
            }
        }
        // const redirectTo = () => {
        //     return history.push({
        //         pathname: '/vendorlogin',
        //         state: {
        //             from: this.props.location.pathname
        //         }
        //     })
        // }
        return (
            <div className="vendorLogin">
                <Header />
                {this.state.checkboxPopup ?
                    <FullScreenDialog2
                        handleClose={closeTerm}
                        handleAgree={termsTrue}
                    /> : null}
                {this.state.terms2 ?
                    <TermsPopup2 handleClose={closeTerm} /> : <React.Fragment />}
                {this.state.privacypolicy ?
                    <PrivacyPolicyPopup handleClose={closeTerm} /> : <React.Fragment />}
                <section className="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="partner">
                                    <div className="back-btn" style={{ width: 'fit-content' }} onClick={() => {
                                        if (this.state.otpBox === true) {
                                            this.setState({ otpBox: false, showCreatedResponse: false, error: "", isLoading: false })
                                        }
                                        else {
                                            this.props.history.goBack()
                                        }
                                    }}><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</div>
                                    {this.state.otpBox ?
                                        <OTPBox
                                            token={this.state.responseData.token}
                                            successFunction={() => {
                                                // this.props.history.push('/login')
                                                let manager = new loginAPI.Login({ login_id: this.state.registerEmail, password: this.state.registerPassword })
                                                loginAPI.login(
                                                    manager,
                                                    () => { this.props.history.goBack() },
                                                    () => { console.error('There Was An Unknown Error') },
                                                    'email'
                                                )
                                            }} close={() => {
                                                if (this.state.otpBox === true) {
                                                    this.setState({ otpBox: false, showCreatedResponse: false, isLoading: false, error: "" })
                                                }
                                            }} /> :
                                        <div className="contact-inner">
                                            <div className="sec-head">
                                                <h2>Welcome to WAP</h2>
                                            </div>
                                            <p>Register to become a partner</p>
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6 border-rights">
                                                        <div className="mail">
                                                            <input type="text" placeholder="Enter Your Full Name" value={this.state.firstName}
                                                                name="firstName"
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerVendor()
                                                                    }
                                                                }} />
                                                            <label>First Name</label>
                                                        </div>

                                                        <div className="mail">
                                                            <input type="text" placeholder="Enter Your Last Name" value={this.state.lastName}
                                                                name="lastName"
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerVendor()
                                                                    }
                                                                }} />
                                                            <label>Last Name</label>
                                                        </div>

                                                        <div className="mail">
                                                            <input type="text" placeholder="Enter Your Company Name" value={this.state.companyName}
                                                                name="companyName"
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerVendor()
                                                                    }
                                                                }} />
                                                            <label>Company Name </label>
                                                        </div>

                                                        <div className="mail">
                                                            <input type="text" placeholder="Enter Your Email Address" value={this.state.registerEmail}
                                                                name="registerEmail"
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerVendor()
                                                                    }
                                                                }} />
                                                            <label>Email Address</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mail">
                                                            <input type="text" placeholder="Enter Your Phone NO." value={this.state.mobile_no}
                                                                name="mobile_no"
                                                                maxLength="10"
                                                                onChange={this.handleChange2}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerVendor()
                                                                    }
                                                                }} />
                                                            <label>Phone No.</label>
                                                        </div>

                                                        <div className="mail">
                                                            <input type={this.state.showPassword ? "text" : "password"} id="password" placeholder="Enter Password" value={this.state.registerPassword}
                                                                name="registerPassword"
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerVendor()
                                                                    }
                                                                }} />
                                                            <i className={this.state.showPassword ? "fa fa-eye" : "fa fa-eye-slash"} id="togglePassword" onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}></i>
                                                            <label>Password.</label>
                                                        </div>

                                                        <div className="mail">
                                                            <input type={this.state.showPassword2 ? "text" : "password"} id="password" placeholder="Enter Confirm Password" value={this.state.confirmPassword}
                                                                name="confirmPassword"
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerVendor()
                                                                    }
                                                                }} />
                                                            <i className={this.state.showPassword2 ? "fa fa-eye" : "fa fa-eye-slash"} id="togglePassword" onClick={handleClickShowPassword2}
                                                                onMouseDown={handleMouseDownPassword}></i>
                                                            <label>Confirm Password</label>
                                                        </div>
                                                        <div className="checkboxContainer">
                                                            <input type="checkbox" id="check" value={this.state.tc} value={this.state.tc} onChange={() => {
                                                                this.setState({ checkboxPopup: true, error: "" })
                                                            }} onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.setState({ checkboxPopup: true, error: "" })
                                                                }
                                                            }} />
                                                            <div className="checkboxText Privacy">By clicking the above button you agree to our <span onClick={() => this.setState({ terms2: true })}>Terms of Service</span> and have read and understood our <span onClick={() => this.setState({ privacypolicy: true })}>Privacy Policy</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {this.state.showCreatedResponse ? this.showCreatedResponse() : null}
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
                                                    <div className="col-md-12 text-center">
                                                        <div tabIndex="0" className={this.state.isLoading ? "btn btn-disabled" : "btn"} onClick={() => { this.state.isLoading ? "" : this.registerVendor() }} onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.registerVendor()
                                                            }
                                                        }}>Proceed</div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default VendorLogin;