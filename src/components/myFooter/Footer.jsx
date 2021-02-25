/* eslint-disable */
import React, { Component } from 'react';
import './footer.css';
import '../css/animate.css';
import '../css/bootstrap.css';
import '../css/responsive.css';
import '../css/style.css';
import TextField from '@material-ui/core/TextField';
import submitArrow from '../../components/images/send.png';
import { NavLink, Link } from 'react-router-dom';
import * as emailSubAPI from '../../Apis/EmailSub'
import { Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import illustration from '../../components/images/mail_sent.svg'
import { Popup } from '../Popup/Popup';
import Loader from "react-loader-spinner";
class Footer extends Component {
    state = {
        email: "",
        isPopupOpen: false,
        error: "",
        isLoading: false
    }
    sentEmail = () => {
        this.setState({ isLoading: true })
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
            emailSubAPI.emailSub(
                this.state.email,
                () => {
                    this.setState({ isPopupOpen: true, email: "", isLoading: false })
                    // console.log('email subscription successful')
                },
                () => {
                    this.setState({ error: "Email Already Subscribed" })
                    // console.log('email subscription error')
                })
        } else {
            this.setState({ error: "Invalid Email" })
        }
        setTimeout(() => {
            if (this.state.error.length != 0) {
                this.setState({ isLoading: false })
            }
        }, 2000)
    }
    render() {
        // const ThankYouPopup = () => {
        //     const handleClose = () => {
        //         this.setState({ isPopupOpen: false })
        //     }
        //     return <div>
        //         <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={this.state.isPopupOpen}>
        //             <DialogContent root style={{

        //             }}>
        //                 <img style={{ width: 50, height: 50 }} src={illustration} alt="" />
        //                 <Typography style={{ fontSize: 12, fontWeight: 500 }}>Thank You For Subscribing. Check Your Email</Typography>
        //             </DialogContent>
        //         </Dialog>
        //     </div>
        // }

        return (
            <section className="footer">
                {this.state.isPopupOpen ?
                    <Popup
                        illustration={illustration}
                        text="Check your email to complete the process"
                        handleClose={() => this.setState({ isPopupOpen: false })}
                        isPopupOpen={this.state.isPopupOpen}
                    /> : <React.Fragment />}
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="footer-link">
                                <h3>Company</h3>
                                <ul>
                                    <li><NavLink to="/aboutus">About</NavLink></li>
                                    <li><NavLink to="/career">Career</NavLink></li>
                                    <li><NavLink to="/blogs">Blogs</NavLink></li>
                                    <li><NavLink to="/faq">FAQs</NavLink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="footer-link">
                                <h3>Partners</h3>
                                <ul>
                                    {/* <li><NavLink to="/vendorlogin">Register</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li> */}
                                    <li><Link to={{ pathname: "/login", state: { vendorRegistration: true } }}>Register</Link></li>
                                    <li><Link to={{ pathname: "/login" }}>Login</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="footer-link">
                                <h3>Legal</h3>
                                <ul>
                                    <li><NavLink to="/privacy-policy">Privacy policy</NavLink></li>
                                    <li><NavLink to="/terms-of-service">Terms of services</NavLink></li>
                                    <li><NavLink to="/cookie">Cookies</NavLink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="footer-link">
                                <h3>Find Us On</h3>

                                <a href="https://www.facebook.com/Hubshub-109346930927150" target="_blank" className="icon-button facebook"><i className="fa fa-facebook"></i><span></span></a>
                                <a href="https://twitter.com/hubshub1" className="icon-button twitter" target="_blank"><i className="fa fa-twitter"></i><span></span></a>
                                <a href="https://www.instagram.com/hubshub1/" className="icon-button google-plus" target="_blank"><i className="fa fa-instagram"></i><span></span></a>
                                <a href="https://www.linkedin.com/company/hubshub/" target="_blank" className="icon-button linkedin"><i className="fa fa-linkedin"></i><span></span></a>

                                <div className="form-group">
                                    <div className="input-group">
                                        <input className="form-control" type="email" name="email" placeholder="Your Email" value={this.state.email}
                                            onChange={(e) => {
                                                this.setState({ email: e.target.value, error: "" })
                                            }} />
                                        <span className="input-group-btn">
                                            <div className={this.state.isLoading ? "btn btn-disabled" : "btn"} tabIndex="0" onClick={() => {
                                                this.state.isLoading ? "" : this.sentEmail()
                                            }} onKeyPress={(event) => {
                                                if (event.key === "Enter") {
                                                    this.state.isLoading ? "" : this.sentEmail()
                                                }
                                            }}>Subscribe <i className="fa fa-paper-plane" aria-hidden="true"></i></div>
                                        </span>
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
                                    <div className="error">{this.state.error}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <hr style={{ backgroundColor: "#fafafa" }} />
                    <div className="copy-right">
                        <p className="copyright-text text-center" style={{ color: "#888" }}> Copyright <i className="fa fa-copyright" aria-hidden="true"></i> WAP Technology Services India Private Limited</p>
                    </div>
                </div>
            </section>



            // <div className="footerContainer">
            //     {this.state.isPopupOpen ?
            //         <Popup
            //             illustration={illustration}
            //             text="Thank You For Subscribing. Check Your Email"
            //             handleClose={() => this.setState({ isPopupOpen: false })}
            //             isPopupOpen={this.state.isPopupOpen}
            //         /> : <React.Fragment />}
            //     <div className="rightSection">
            //         <div className="upperSection">
            //             <div className="linksContainer">
            //                 <h3>Company</h3>
            //                 <ul>
            //                     <NavLink to="/aboutus"><li>About</li></NavLink>
            //                     <NavLink to="/career"><li>Careers</li></NavLink>
            //                     <NavLink to="/blogs"><li>Blogs</li></NavLink>
            //                     <NavLink to="/faq"><li>FAQ's</li></NavLink>
            //                 </ul>
            //             </div>
            //             <div className="linksContainer linksAdjust2">
            //                 <h3>Partners</h3>
            //                 <ul>
            //                     <NavLink to="/vendorlogin"><li>Register</li></NavLink>
            //                     <NavLink to="/login"> <li>Login</li></NavLink>
            //                 </ul>
            //             </div>
            //             <div className="linksContainer linksAdjust3">
            //                 <h3>Legal</h3>
            //                 <ul>
            //                     <NavLink to="/privacy-policy"><li>Privacy</li></NavLink>
            //                     <NavLink to="/terms-of-service"><li>Terms</li></NavLink>
            //                     <li>Cookies</li>
            //                 </ul>
            //             </div>
            //         </div>
            //         <div className="lowerSection">
            //             <div className="lowerText mobLowerTextAdjust">

            //             </div>
            //             <div className="lowerText numberAdjust"><a href="mailto: contact@hubshub.in">contact@hubshub.in</a></div>
            //         </div>
            //     </div>
            //     <div className="middleSection">Copyright Hubshub Technology Services India Private Limited</div>
            //     <div className="leftSection">
            //         <div className="subscribeContainer">
            //             <div className="socicalMediaText">Follow us</div>
            //             <div className="socialMediaContainer">
            //                 <div className="fab fa-facebook-f"></div>
            //                 <div className="fab fa-instagram"></div>
            //                 <div className="fab fa-twitter"></div>
            //             </div>
            //             <div className="subscribeHeadingText">Subscribe to our mailing list</div>
            //             <div className="subscribeInputContainer">
            //                 <TextField
            //                     required
            //                     id="outlined-full-width"
            //                     label="Email-id"
            //                     fullWidth
            //                     value={this.state.email}
            //                     onChange={(e) => {
            //                         this.setState({ email: e.target.value, error: "" })
            //                     }}
            //                     InputLabelProps={{
            //                         shrink: true,
            //                     }}
            //                     variant="outlined"
            //                 />
            //                 <div className="rightArrowContainer" onClick={() => {
            //                     if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
            //                         emailSubAPI.emailSub(
            //                             this.state.email,
            //                             () => {
            //                                 this.setState({ isPopupOpen: true, email: "" })
            //                                 // console.log('email subscription successful')
            //                             },
            //                             () => {
            //                                 this.setState({ error: "Email Already Subscribed" })
            //                                 // console.log('email subscription error')
            //                             })
            //                     } else {
            //                         this.setState({ error: "Invalid Email" })
            //                     }
            //                 }}>
            //                     <img src={submitArrow} alt="" />
            //                 </div>
            //             </div>
            //             <div className="error">{this.state.error}</div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Footer;