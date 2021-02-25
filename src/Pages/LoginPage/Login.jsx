/* eslint-disable */
import React, { Component } from 'react';
import './login.css';
import '../../components/css/animate.css';
import '../../components/css/bootstrap.css';
import '../../components/css/responsive.css';
import '../../components/css/style.css';
import { connect } from "react-redux";
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import BackButton from '../../components/BackButton/BackButton';
import hubshubText from '../../components/images/hubshubText.png';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import $ from 'jquery';
import Loader from "react-loader-spinner";
import close from '../../components/images/close.png';
import OTPBox from '../../components/OTPBox/OTPBox';
import { NavLink } from 'react-router-dom';
import * as registerAPI from '../../Apis/Register';
import * as loginAPI from '../../Apis/Login';
import * as forgotPasswordAPI from '../../Apis/forgotPassword';
import * as otpAPI from '../../Apis/Otp'
import { FingerPrint } from '../../Apis/fingerprint';
import * as baseAPI from "../../Apis/base";
import Cookie from "js-cookie";
import { TermsPopup1 } from '../Terms/Terms1';
import { PrivacyPolicyPopup } from '../PrivacyPolicyPopup/PrivacyPolicyPopup';
import { FullScreenDialog } from '../../components/TermsPopup/TermsPopup';
import { useLocation } from 'react-router-dom';
import { Popup } from '../../components/Popup/Popup';
import illustration from '../../components/images/mail_sent.svg'

class Login extends Component {
    state = {
        isLogin: false,
        isMobileLogin: false,
        isEmailIdLogin: true,
        activeDot: true,
        otpActiveDot: false,
        forgotPassword: false,
        registerUser: false,
        isLoading: false,
        Email: "",
        Password: "",
        activeLink: "/",
        firstName: "",
        lastName: "",
        companyName: "",
        registerEmail: "",
        mobile_no: "",
        status: 0,
        forgotEmail: "",
        registerPassword: "",
        confirmPassword: "",
        showCreatedResponse: false,
        displayed: false,
        otpBox: false,
        error: "",
        success: "",
        showPassword: false,
        showPassword2: false,
        tc: false,
        checkboxPopup: false,
        termsTrue: false,
        terms1: false,
        privacypolicy: false,
        popup: {
            open: false,
        }
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
        this.setState({ [e.target.name]: onlyNums, isLoading: false });
    };
    getURL = () => {
        console.log(this.props.location)
        this.props.history.goBack()

        // Fallback if there is no back
        this.props.history.replace('/')
    }
    Login = async (email, password) => {
        this.setState({ isLoading: true });
        console.log(this.props.location)
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        let isMobile = email.length === 10 && !isNaN(email);
        if (email === "" || password === "") {
            this.setState({ error: "All fields are required" })
            return;
        } else if (!regex && !isMobile) {
            this.setState({ error: "Enter a valid email address or Mobile Number" });
            return;
        }

        loginAPI.login(
            this.state.tc,
            new loginAPI.Login({
                login_id: email,
                password: password
            }),
            () => this.getURL(),
            (data, status) => {
                if (status === 403) {
                    this.setState({ tc: false, termsTrue: true, isLoading: false })
                } else this.setState({ error: data, isLoading: false })
            },
            isNaN(email) ? "email" : "mobile"
        )
        //  if (response.status === 404) {
        //     $(".errorMessage").css("display", "block");
        //     this.setState({ Email: "", Password: "", isLoading: false });
        // }
        // setTimeout(() => {
        //     $(".errorMessage").css("display", "none");
        // }, 3000)
    }
    ForgotPassword = async (email) => {
        this.setState({ isLoading: true });
        email = email.trim();
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        if (email === "") {
            this.setState({ error: "Email is required" });
            return;
        } else if (!regex) {
            this.setState({ isLoading: false, error: "Enter a valid email address" });
        }
        forgotPasswordAPI.forgotpassword(new forgotPasswordAPI.ForgotPassword({
            email: email
        }),
            () => {
                // this.setState({ success: "Successfully Sent. Check Your Email.", isLoading: false, forgotEmail: "", popup: { ...this.state.popup, open: true } }, () => setTimeout(() => this.props.history.push('/'), 3000))
                this.setState({
                    success: "Successfully Sent. Check Your Email.",
                    isLoading: false,
                    forgotEmail: "",
                    popup: { ...this.state.popup, open: true }
                },
                    () => {
                        setTimeout(() => this.props.history.push('/'), 3000)
                        this.setState({ success: "", error: "" })
                    }
                )
            },
            (status, error) => {
                if (status === 404)
                    this.setState({ error: 'Invalid Credentials', isLoading: false })
            }
        )
        // setTimeout(() => { this.setState({ success: "", error: "" }) }, 3000)
    }
    registerCustomer = () => {
        this.setState({ isLoading: true });
        let terms = $('#check').is(":not(:checked)");
        if (this.state.registerPassword !== this.state.confirmPassword) {
            this.setState({ error: "The password doesn't match" })
            return;
        }
        else if (terms) {
            this.setState({ tc: false, error: "T&C needs to be accepted" })
            return;
        } else if ($('#check').is(":checked")) {
            this.setState({ tc: true, error: "" })
        }
        let manager = new registerAPI.Register({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            companyName: this.state.companyName,
            email: this.state.registerEmail,
            phoneNo: this.state.mobile_no,
            password: this.state.registerPassword
        })
        registerAPI.register(
            manager,
            this.state.tc,
            (status, data) => {
                if (status === 403 || status === 400 || status === 404 || status === 422) {
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                    }, 500)
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
            },
            (error) => {
                this.setState({
                    error: error[0]
                })
            }
        )
    }
    showCreatedResponse = () => {
        if (!this.state.isLoading) {
            if (this.state.status === 200) {
                // this.
                this.setState({ otpBox: true })
                return <div className="error200 ani-show">Successfully Created</div>;
            }
            // else if (this.state.status === 409) {
            //     return <div className="error409 ani-show">Email id or mobile number already Exists in the system</div>;
            // }
            else {
                console.log("Errors");
            }
        } else {
            return (
                <div className="loader">
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
                this.setState({ tc: false, checkboxPopup: false, error: "", terms1: false, privacypolicy: false })
            }
        }
        const openTermsTrue = () => {
            this.setState({ tc: true, termsTrue: false, error: "" })
        }
        const closeTermsTrue = () => {
            this.setState({ tc: false, termsTrue: false, error: "" })
        }
        return (
            <div className="loginContainer">
                {console.log(this.state)}
                <Header />
                {this.state.termsTrue ?
                    <FullScreenDialog
                        handleClose={closeTermsTrue}
                        handleAgree={openTermsTrue} /> : <></>}
                {this.state.checkboxPopup ?
                    <FullScreenDialog
                        handleClose={closeTerm}
                        handleAgree={termsTrue} /> : <React.Fragment />}

                {this.state.popup.open ?
                    <Popup
                        illustration={illustration}
                        text="Check Your Email"
                        handleClose={() => this.setState({ popup: { ...this.state.popup, open: false } })}
                        isPopupOpen={this.state.popup.open}
                    /> : <></>}
                {this.state.terms1 ?
                    <TermsPopup1 handleClose={closeTerm} /> : <React.Fragment />}
                {this.state.privacypolicy ?
                    <PrivacyPolicyPopup handleClose={closeTerm} /> : <React.Fragment />}
                {this.state.displayed ?
                    <div className="otpMOBContainer">
                        <div className="closeOtpBox" onClick={() => {
                            this.setState({
                                ...this.state,
                                displayed: false
                            })
                            console.log("cliked");
                        }}>
                            <img src={close} alt="" />
                        </div>
                        <div className="loginHeadText">Help us Verify !!</div>
                        <div className="otpText">Please enter the 6 digit OTP sent on your registered mobile no.</div>
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
                        <div className="signInWithMobileContainer proceedButton">
                            <div className="btnText">Proceed</div>
                        </div>
                    </div>
                    : null}
                <div className="loginFieldsContainer">
                    {this.state.isLogin ? <React.Fragment>
                        <BackButton onClick={() => this.props.history.goBack()} />
                        <div className="registerTextContainer">
                            <div className="registerText">New User ?</div>
                            <div className="registerText colorAdjust" onClick={() => this.setState({ registerUser: true, isLogin: false, error: "" })}>Register</div>
                        </div>
                        <div className="signInWithMobileContainer" onClick={() => this.setState({ isMobileLogin: true, isLogin: false, error: "" })}>
                            <div className="btnText">Sign-In with Mobile no.</div>
                        </div>
                        <div className="orText">Or</div>
                        <div className="signInWithMobileContainer buttonColorAdjust" onClick={() => this.setState({ isEmailIdLogin: true, isLogin: false, error: "" })}>
                            <div className="btnText">Sign-In with Email id</div>
                        </div>
                    </React.Fragment> : <React.Fragment />}
                    {this.state.isMobileLogin ? <React.Fragment>
                        <BackButton onClick={() => this.props.history.goBack()} />
                        {this.state.activeDot ? <React.Fragment>
                            <div className="loginHeadText">Please Enter your registered Mobile no.</div>
                            <TextField
                                id="outlined-full-width"
                                label="Phone No."
                                placeholder="Enter your 10 digit mobile no."
                                fullWidth
                                value={this.state.Email}
                                name="Email"
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <div className="signInWithMobileContainer proceedButton"
                                onClick={() => {
                                    this.setState({
                                        ...this.state,
                                        displayed: true
                                    })
                                    console.log("cliked");
                                }}
                            >
                                <div className="btnText">Proceed</div>
                            </div>
                        </React.Fragment> : <React.Fragment />}
                        {this.state.otpActiveDot ?
                            <div className="otpMainContainer">
                                <div className="loginHeadText">Help us Verify !!</div>
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
                                <div className="signInWithMobileContainer proceedButton">
                                    <div className="btnText"
                                    >Proceed</div>
                                </div>
                            </div>
                            : <React.Fragment />}

                        <div className="activeDotContainer">
                            <div className={this.state.activeDot ? "activeDotColor" : "activeDot"} onClick={() => this.setState({ activeDot: true, otpActiveDot: false })}></div>
                            <div className={this.state.otpActiveDot ? "activeDotColor" : "activeDot"} onClick={() => this.setState({ activeDot: false, otpActiveDot: true })}></div>
                        </div>
                    </React.Fragment> : <React.Fragment />}
                    {this.state.isEmailIdLogin ? <section className="contact">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sign">
                                        <div className="back-btn" onClick={() => this.props.history.goBack()}><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</div>
                                        <div className="contact-inner">
                                            <div className="sec-head sec-head-login">
                                                <h2>Please Enter your registered credentials</h2>
                                            </div>
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mail">
                                                            <input type="text" name="Email" placeholder="Please enter your email or phone no." value={this.state.Email}
                                                                onChange={this.handleChange} onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.Login(this.state.Email, this.state.Password)
                                                                    }
                                                                }} />
                                                            <label>Email or Phone no.</label>
                                                        </div>

                                                        <div className="mail">
                                                            <input type={this.state.showPassword ? "text" : "password"} name="Password" id="password" placeholder="Enter Password" value={this.state.Password}
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.Login(this.state.Email, this.state.Password)
                                                                    }
                                                                }} />
                                                            <i className={this.state.showPassword ? "fa fa-eye" : "fa fa-eye-slash"} id="togglePassword" onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}></i>
                                                            <label>Password</label>
                                                        </div>

                                                        <div className="pull-left" onClick={() => {
                                                            if (Cookie.get(baseAPI.customerName)) {
                                                                this.setState({ registerUser: true, isEmailIdLogin: false, otpBox: false, error: "" })
                                                                $('.checkboxContainer').css('visibility', 'hidden')
                                                            } else {
                                                                $('.checkboxContainer').css('visibility', 'show')
                                                                this.setState({ registerUser: true, isEmailIdLogin: false, otpBox: false, error: "", isLoading: false })
                                                            }
                                                        }}>New User?</div>
                                                        <div className="pull-right" onClick={() => this.setState({ forgotPassword: true, isEmailIdLogin: false, error: "", isLoading: false })}>Forgot Password?</div>
                                                    </div>
                                                    <div className="errorMessage">{this.state.error}</div>
                                                    {this.state.isLoading ? (
                                                        <div className="loader">
                                                            <Loader
                                                                type="TailSpin"
                                                                color="#0055FF"
                                                                height={50}
                                                                width={50}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div className="col-md-12 text-center mt-5">
                                                        <div tabIndex="0" className={this.state.isLoading ? "btn btn-disabled" : "btn"} onClick={
                                                            () => { this.state.isLoading ? "" : this.Login(this.state.Email, this.state.Password) }}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.Login(this.state.Email, this.state.Password)
                                                                }
                                                            }}>Proceed</div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : <React.Fragment />}
                    {this.state.forgotPassword ? <section className="contact">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="sign">
                                        <div className="back-btn" onClick={() => this.setState({ forgotPassword: false, isEmailIdLogin: true, error: "", isLoading: false })}><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</div>
                                        <div className="contact-inner">
                                            <div className="sec-head">
                                                <h2>Help us recover your password !</h2>
                                            </div>
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mail">
                                                            <input type="text" placeholder="Enter Your Email Address" onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.ForgotPassword(this.state.forgotEmail)
                                                                    }
                                                                }}
                                                                value={this.state.forgotEmail}
                                                                name="forgotEmail" />
                                                            <label>Email Address</label>
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
                                                    <div className="col-md-12 text-center">
                                                        <div tabIndex="0" className={this.state.isLoading ? "btn btn-disabled" : "btn"} onClick={() => { this.state.isLoading ? "" : this.ForgotPassword(this.state.forgotEmail) }} onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.ForgotPassword(this.state.forgotEmail)
                                                            }
                                                        }}>Proceed</div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : <React.Fragment />}
                </div>
                {this.state.registerUser ? <section className="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="partner">
                                    <div className="back-btn" onClick={() => {
                                        if (this.state.otpBox === true) {
                                            this.setState({ registerUser: true, isEmailIdLogin: false, otpBox: false, showCreatedResponse: false, error: "", isLoading: false })
                                        }
                                        else {
                                            this.setState({ registerUser: false, isEmailIdLogin: true, otpBox: false, error: "", isLoading: false })
                                        }
                                    }
                                    }><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</div>
                                    {this.state.otpBox ?
                                        <OTPBox token={this.state.responseData.token} successFunction={() => {
                                            // this.props.history.push('/login')
                                            // window.location.reload()
                                            let manager = new loginAPI.Login({ login_id: this.state.registerEmail, password: this.state.registerPassword })
                                            loginAPI.login(
                                                manager,
                                                () => { this.props.history.goBack() },
                                                () => { console.error('There Was An Unknown Error') },
                                                'email'
                                            )
                                        }} errorFunction={() => {
                                            this.setState({ error: "There Was An Unknown Error" })
                                        }} close={() => {
                                            if (this.state.otpBox === true) {
                                                this.setState({ otpBox: false, registerUser: true, showCreatedResponse: false, isEmailIdLogin: false, isLoading: false, error: "" })
                                            }
                                        }} /> :
                                        <div className="contact-inner">
                                            <div className="sec-head">
                                                <h2>Welcome to Hubshub</h2>
                                            </div>
                                            <p>Register to become a customer</p>
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6 border-rights">
                                                        <div className="mail">
                                                            <input type="text" placeholder="Enter Your Full Name" value={this.state.firstName}
                                                                name="firstName"
                                                                onChange={this.handleChange}
                                                                onKeyPress={(event) => {
                                                                    if (event.key === "Enter") {
                                                                        this.state.isLoading ? "" : this.registerCustomer()
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
                                                                        this.state.isLoading ? "" : this.registerCustomer()
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
                                                                        this.state.isLoading ? "" : this.registerCustomer()
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
                                                                        this.state.isLoading ? "" : this.registerCustomer()
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
                                                                        this.state.isLoading ? "" : this.registerCustomer()
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
                                                                        this.state.isLoading ? "" : this.registerCustomer()
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
                                                                        this.state.isLoading ? "" : this.registerCustomer()
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
                                                            <div className="checkboxText Privacy">By clicking the above button you agree to our <span onClick={() => this.setState({ terms1: true })}>Terms of Service</span> and have read and understood our <span onClick={() => this.setState({ privacypolicy: true })}>Privacy Policy</span>
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
                                                        <div tabIndex="0" className={this.state.isLoading ? "btn btn-disabled" : "btn"} onClick={() => { this.state.isLoading ? "" : this.registerCustomer() }} onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.registerCustomer()
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
                </section> : <React.Fragment />}
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        activeRole: state.activeRole,
        apiCalls: state.apiCalls,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (name) => dispatch({ type: "setToken", value: name }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);