/* eslint-disable */
import React, { Component } from 'react';
import user from '../images/user.png';
import './SideNav.css';
import { NavLink } from 'react-router-dom';
import close from '../../components/images/close.png';
// import user from '../images/userwhite';
import userWhite from '../images/userWhite.png';
import { CSSTransitionGroup } from 'react-transition-group';
import * as baseAPI from '../../Apis/base'
import Cookie from "js-cookie";
import * as base from "../../Apis/base";

class SideNav extends Component {
    state = {
        menuActive: false,
    }
    toggleMenu = () => {
        let menuState = !this.state.menuActive;
        this.setState({
            menuActive: menuState
        });
    }
    render() {
        console.log(this.props.activeName);
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
            menu = <div className="dropDownTextContainer" >
                <div onClick={() => URL()}>My Dashboard</div>
                <div onClick={() => Yes()}>Sign-Out</div>
            </div>
        } else {
            menu = "";
        }
        const UserMenu = () => {
            let userType = baseAPI.getUserType()
            if (!userType) {
                return <div className="signInContainer">
                    <div className="userImage">
                        <img src={user} alt="" />
                    </div>
                    <NavLink to="/login"><div className="signInText">Sign-in</div></NavLink>
                </div>
            } else {
                // if (userType === 'customer') {
                return <div className="profileButtonContainer">
                    <div className="afterSignInContainer" onClick={() => this.toggleMenu()}>
                        <div className="userImage">
                            <img src={userWhite} alt="" />
                        </div>
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

            <div className="SideNavbar">
                <div className="closeButtonContainer" onClick={this.props.close}>
                    <img src={close} alt="" />
                </div>
                <UserMenu />
                <div className="SideBarItems">
                    <ul>
                        <NavLink to="/"><li>Home</li></NavLink>
                        <NavLink to="/aboutus"><li>About Us</li></NavLink>
                        <NavLink to="/blogs"><li>Blogs</li></NavLink>
                        <NavLink to="/faq"><li>FAQ's</li></NavLink>
                        <NavLink to="/contact"><li>Contact Us</li></NavLink>
                    </ul>
                </div>
                {/* <NavLink to="/vendorlogin"><div className="partnerWithUsText">Partner With Us</div></NavLink> */}
                <Link to={{ pathname: "/login", state: { vendorRegistration: true } }}>
                    <div className="partnerWithUsText">Partner With Us</div>
                </Link>
            </div>
        );
    }
}

export default SideNav;