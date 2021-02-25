/* eslint-disable */
import React, { Component } from 'react';
import './header.css';
import logo from '../images/newlogo.png';
import user_demo from '../images/user-demo.png';
import userWhite from '../images/userWhite.png';
import { NavLink } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import SideNav from '../SideNavigation/SideNav';
import * as baseAPI from '../../Apis/base'
import Cookie from "js-cookie";
import * as base from "../../Apis/base";
import $ from "jquery";
class Header extends Component {
    state = {
        menuActive: false,
        displayed: false,
    }
    toggleMenu = () => {
        let menuState = !this.state.menuActive;
        this.setState({
            menuActive: menuState
        });
    }
    componentDidMount() {
        // $('body').on('mouseenter mouseleave', '.nav-item', function (e) {
        //     if ($(window).width() > 750) {
        //         var _d = $(e.target).closest('.nav-item'); _d.addClass('show');
        //         setTimeout(function () {
        //             _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
        //         }, 1);
        //     }
        // });

        // $(function () {
        //     var header = $(".start-style");
        //     $(window).scroll(function () {
        //         var scroll = $(window).scrollTop();

        //         if (scroll >= 10) {
        //             header.removeClass('start-style').addClass("scroll-on");
        //         } else {
        //             header.removeClass("scroll-on").addClass('start-style');
        //         }
        //     });
        // });
    }
    render() {
        const Yes = () => {
            return baseAPI.logout()
            // localStorage.removeItem("CustomerName");
            // localStorage.removeItem("token");
            // localStorage.removeItem("refresh");
            // localStorage.removeItem("User_Type");
            // return window.location.replace("/");
        };
        const URL = () => {
            if (Cookie.get(baseAPI.userType) === 'superadmin') {
                return window.location.replace(`${base.settings[base.environment].dashboard.admin}authorize?token=${Cookie.get(baseAPI.token)}`)
            } else if (Cookie.get(baseAPI.userType) === 'vendor') {
                return window.location.replace(`${base.settings[base.environment].dashboard.vendor}authorize?token=${Cookie.get(baseAPI.token)}`)
            } else if (Cookie.get(baseAPI.userType) === 'customer') {
                return window.location.replace(`${base.settings[base.environment].dashboard.customer}authorize?token=${Cookie.get(baseAPI.token)}`)
            }
        }
        let menu;
        if (this.state.menuActive) {
            menu = Cookie.get(baseAPI.userType) === 'customer_vendor' ? <div className="dropDownTextContainer">
                <div onClick={() => window.location.replace(`${base.settings[base.environment].dashboard.vendor}authorize?token=${Cookie.get(baseAPI.token)}`)}>Vendor Dashboard</div>
                <div onClick={() => window.location.replace(`${base.settings[base.environment].dashboard.customer}authorize?token=${Cookie.get(baseAPI.token)}`)}>Customer Dashboard</div>
                <div onClick={() => Yes()}>Sign-Out</div>
            </div> : <div className="dropDownTextContainer">
                    <div onClick={() => URL()}>My Dashboard</div>
                    <div onClick={() => Yes()}>Sign-Out</div>
                </div>
        } else {
            menu = "";
        }

        const UserMenu = () => {
            let userType = baseAPI.getUserType()
            if (!userType) {
                return <div class="order">
                    <ul>
                        <li class="nav-item">
                            {/* <NavLink to="/vendorlogin" class="fuel">
                                Partner With Us <i class="fa fa-users" aria-hidden="true"></i>
                            </NavLink> */}
                            <NavLink to={{ pathname: "/login", state: { vendorRegistration: true } }} class="fuel">
                                Partner With Us <i class="fa fa-users" aria-hidden="true"></i>
                            </NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/login" class="fuel">
                                Sign-In <span><img src={user_demo} alt="" /></span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            } else {
                // if (userType === 'customer') {
                return <div className="profileButtonContainer">
                    <div className="afterSignInContainer" onClick={() => this.toggleMenu()}>
                        {/* <div className="userImage">
                            <img src={userWhite} alt="" />
                        </div> */}
                        <div className="signInText">{Cookie.get(base.customerName)}</div>
                        <div className="dropDownContainer">
                            <CSSTransitionGroup
                                transitionName="menu"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}>
                                {menu}
                            </CSSTransitionGroup>
                        </div>
                    </div>
                </div>
            }
            // else {
            //     // return <></>
            //     return <div className="profileButtonContainer">
            //         <div className="afterSignInContainer" onClick={() => baseAPI.logout()}>
            //             {/* <div className="userImage">
            //                 <img src={userWhite} alt="" />
            //             </div> */}
            //             <div className="signInText">
            //                 Logout
            //             </div>
            //         </div>
            //         {/* <div className="signInText">{localStorage.getItem("CustomerName")}</div> */}
            //     </div>
            // }
        }
        return (
            <section className="sticky">
                <div className="navigation-wrap bg-light start-header start-style">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <nav className="navbar navbar-expand-md navbar-light">
                                    <div className="navbar-brand" href="" alt="">
                                        <NavLink to="/"><img src={logo} className="logo" alt="" /></NavLink>
                                    </div>
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav m-auto py-4 py-md-0">
                                            <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${window.location.pathname === "/" ? "active" : ""}`}>
                                                <NavLink to="/" className="nav-link" >Home</NavLink>
                                            </li>
                                            <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${window.location.pathname === "/aboutus" ? "active" : ""}`}>
                                                <NavLink to="/aboutus" className="nav-link">About Us</NavLink>
                                            </li>
                                            <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${window.location.pathname === "/blogs" ? "active" : ""}`}>
                                                <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
                                            </li>
                                            <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${window.location.pathname === "/faq" ? "active" : ""}`}>
                                                <NavLink to="/faq" className="nav-link" >FAQs</NavLink>
                                            </li>
                                            <li className={`nav-item pl-4 pl-md-0 ml-0 ml-md-4 ${window.location.pathname === "/contact" ? "active" : ""}`}>
                                                <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
                                            </li>

                                        </ul>
                                    </div>
                                    <UserMenu />
                                    {/* <div className="order">
                                        <NavLink to="/vendorlogin" className="fuel">
                                            Partner With Us <i className="fa fa-users" aria-hidden="true"></i>
                                        </NavLink>
                                        <NavLink to="/login" className="fuel">
                                            Sign - in <i className="fa fa-user-circle" aria-hidden="true"></i>
                                        </NavLink>
                                    </div> */}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            // <div className="HeaderContainer">
            //     <div className="logoContainer">
            //         <NavLink to="/"><img src={logo} alt="" /></NavLink>
            //     </div>
            //     <div class="fas fa-bars adjustBars" onClick={() => this.setState({
            //         ...this.state,
            //         displayed: true
            //     })}>

            //     </div>
            //     {this.state.displayed ?
            //         <SideNav
            //             close={() => {
            //                 this.setState({ ...this.state, displayed: false })
            //             }
            //             }
            //         /> : null}
            //     <div className="navbarContainer">
            //         <ul>
            //             <NavLink to="/"><li>Home</li></NavLink>
            //             <NavLink to="/aboutus"><li>About Us</li></NavLink>
            //             <NavLink to="/blogs"><li>Blogs</li></NavLink>
            //             <NavLink to="/faq"><li>FAQ's</li></NavLink>
            //             <NavLink to="/contact"><li>Contact Us</li></NavLink>
            //         </ul>

            //     </div>
            //     <UserMenu />
            // </div>
        );
    }
}

export default Header;