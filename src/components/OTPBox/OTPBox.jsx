import React, { Component } from 'react';
import './otpbox.css';
import close from '../../components/images/close.png';
import $ from 'jquery';
import illustration from '../../components/images/mail_sent.svg'
import { Popup } from '../Popup/Popup';
import Loader from "react-loader-spinner";
import * as OtpApi from '../../Apis/Otp'
class OPTBox extends Component {
    state = {
        matches: window.matchMedia("(min-width: 480px)").matches,
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
        digit5: "",
        digit6: "",
        token: "",
        error: "",
        isLoading: false,
        success: "",
        isPopupOpen: false,
        otpMessage: "",
    }
    componentDidMount() {
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
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 480px)").addListener(handler);
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.successMessage !== this.props.successMessage) {
    //         this.setState({otpMessage: this.props.successMessage})
    //     }
    // }

    handleChange = (name, value) => {
        this.setState({ [name]: value, error: "" })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ token: nextProps.token })
    }

    handleSubmit = () => {
        this.setState({ isLoading: true })
        let otp = "" + this.state.digit1 + this.state.digit2 + this.state.digit3 + this.state.digit4 + this.state.digit5 + this.state.digit6
        let otpManager = new OtpApi.OTP({
            token: this.props.token,
            fingerprint: this.props.token,
            otp: otp
        })

        OtpApi.verifyOtp(
            otpManager,
            () => {
                if (this.props.successFunction) {
                    let msg = 'OTP Verified'
                    if (this.props.successMessage) msg = this.props.successMessage
                    this.setState({
                        success: "Success",
                        isPopupOpen: true,
                        otpMessage: msg,
                        isLoading: false
                    })
                    setTimeout(() => {
                        this.props.successFunction()
                    }, 3000)
                }
                this.setState({ isLoading: false })
            },
            (data, status) => {
                if (status === 403) {
                    setTimeout(() => {
                        if(this.props.errorFunction) {
                            this.props.errorFunction()
                        }
                    }, 3000)
                } else if (status === 403 || status === 400 || status === 404) {
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                    }, 500)
                }
                this.setState({
                    error: data,
                    digit1: "",
                    digit2: "",
                    digit3: "",
                    digit4: "",
                    digit5: "",
                    digit6: ""
                })
            }
        )
    }

    resendOTP = () => {
        // let otp = "" + this.state.digit1 + this.state.digit2 + this.state.digit3 + this.state.digit4 + this.state.digit5 + this.state.digit6
        let otpManager = new OtpApi.OTP({
            token: this.props.token,
        })

        OtpApi.resendOtp(
            otpManager,
            () => {
                this.setState({
                    isPopupOpen: true,
                    otpMessage: "OTP sent again, Please check your mobile"
                })
                /* TK_Begin */
            },
            () => {
                this.setState({
                    isPopupOpen: true,
                    otpMessage: "Failed to resend OTP please try again later"
                })
            }
        )
    }

    render() {
        return (
            <div>
                {this.state.isPopupOpen ?
                    <Popup
                        illustration={illustration}
                        text={this.state.otpMessage}
                        handleClose={() => this.setState({ isPopupOpen: false })}
                        isPopupOpen={this.state.isPopupOpen}
                    /> : <React.Fragment />}
                <React.Fragment>
                    <div className="optBoxContainer" >
                        <div className="closeButtonContainer" onClick={this.props.close}>
                            <img src={close} alt="" />
                        </div>
                        <div className="loginHeadText">Help us Verify !!</div>
                        <p>
                            Please enter the 6 digit OTP sent on your registered mobile no.
                        </p>
                        <div className="otpAdjustContainer" method="get" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                            <input type="text" id="digit-1" name="digit-1" data-next="digit-2" value={this.state.digit1} onChange={(e) => this.handleChange('digit1', e.target.value, this.setState({ isLoading: false }))} onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }} />
                            <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" value={this.state.digit2} onChange={(e) => this.handleChange('digit2', e.target.value, this.setState({ isLoading: false }))} onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }} />
                            <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" value={this.state.digit3} onChange={(e) => this.handleChange('digit3', e.target.value, this.setState({ isLoading: false }))} onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }} />
                            <div className="divideBorder"></div>
                            <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" value={this.state.digit4} onChange={(e) => this.handleChange('digit4', e.target.value, this.setState({ isLoading: false }))} onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }} />
                            <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" value={this.state.digit5} onChange={(e) => this.handleChange('digit5', e.target.value, this.setState({ isLoading: false }))} onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }} />
                            <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" value={this.state.digit6} onChange={(e) => this.handleChange('digit6', e.target.value, this.setState({ isLoading: false }))} onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    this.handleSubmit()
                                }
                            }} />
                        </div>
                        <div className="resendText" onClick={() => this.resendOTP()}>Re-send OTP</div>
                        <div className="error">{this.state.error}</div>
                        <div className="success">{this.state.success}</div>
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
                        <div tabIndex="0" className={this.state.isLoading ? "btn otpBtn disabled" : "btn otpBtn"} onClick={() => this.handleSubmit()} onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                this.handleSubmit()
                            }
                        }}>
                            Submit
                        </div>
                    </div>
                </React.Fragment>
            </div>

        );
    }
}

export default OPTBox;