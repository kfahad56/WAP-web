/* eslint-disable */
import React, { Component } from 'react';
import './customerdashboard.css';
import Header from '../../components/header/Header';
import logout from '../../components/images/logout.png';
import info from '../../components/images/info.png';
import cross from '../../components/images/closeyellow.png';
import why from '../../components/images/why.png';
import $ from 'jquery';
import CardView from '../../components/CardView/CardView';
import card1 from '../../components/images/card1.png';
import ShortlistedCard from '../../components/ShortlistedCard/shortlistedCard';
import ProfileTab from '../../components/ProfileTab/ProfileTab';
import blackprofile from '../../components/images/userblack.png';
import edit from '../../components/images/edit.png';
import password from '../../components/images/password.png';
import { getApi } from "../../Apis/base.ts"
import { isLoggedin } from '../../Apis/Login';
import * as base from "../../Apis/base";
import Cookie from "js-cookie";
class CustomerDashboard extends Component {
    state = {
        warehouse: false,
        warehouseData: false,
        shortlisted: false,
        settings: true
    }
    cross = () => {
        $('.noteContainer').css('display', 'none');
    }
    render() {
        const signOut = () => {

            Cookie.remove(base.customerName);
            Cookie.remove(base.token);
            Cookie.remove(base.refresh);
            Cookie.remove(base.userType);
            if (!isLoggedin) {
                localStorage.setItem("User_Type", anonymous)
            }
            return window.location.replace("/");
        };
        return (
            <div className="customerDashboardContainer">
                {localStorage.getItem("Name") ? <Header activeName={true} /> : <Header SignIn={true} />}
                <div className="signoutBarContainer">
                    <div className="leftSection">
                        <div className={this.state.warehouse || this.state.warehouseData ? "activeText" : "Text"} onClick={() => this.setState({ warehouse: true, shortlisted: false, settings: false })}>My Warehouses</div>
                        <div className={this.state.shortlisted ? "activeText" : "Text"} onClick={() => this.setState({ warehouse: false, warehouseData: false, shortlisted: true, settings: false })}>Shortlisted Warehouse</div>
                        <div className={this.state.settings ? "activeText" : "Text"} onClick={() => this.setState({ warehouse: false, warehouseData: false, shortlisted: false, settings: true })}>Settings</div>
                    </div>
                    <div className="rightSection" onClick={() => signOut()}>
                        <div className="logoutImage">
                            <img src={logout} alt="" />
                        </div>
                        <div className="logoutText">Sign-Out</div>
                    </div>
                </div>
                <div className="myWarehouseContainer">
                    <div className="noteContainer">
                        <div className="noteImage">
                            <img src={info} alt="" />
                        </div>
                        <div className="noteText">The dashboard will show your rented out warehouses</div>
                        <div className="crossImage" onClick={() => this.cross()}>
                            <img src={cross} alt="" />
                        </div>
                    </div>
                    {this.state.warehouse ? <div className="warehouseRentedContainer">
                        <h3>Currently you have no warehouse Rented</h3>
                        <div className="whyImage">
                            <img src={why} alt="" />
                        </div>
                        <div className="lookingText">Looking for a ware house, let us find one for you .<span onClick={() => this.setState({ warehouseData: true, warehouse: false })}> Click Here</span></div>
                    </div> : <React.Fragment />}
                    {this.state.warehouseData ? <div className="warehouseDataContainer">
                        <CardView eye={true} imgSRC={card1} />
                        <CardView eye={true} imgSRC={card1} />
                    </div> : <React.Fragment />}
                    {this.state.shortlisted ? <div className="shortlistedWarehouseContainer">
                        <ShortlistedCard imgSRC={card1} />
                        <ShortlistedCard imgSRC={card1} />
                    </div> : <React.Fragment />}
                    {this.state.settings ? <div className="settingsContainer">
                        <ProfileTab imgSRC={blackprofile} profileText="My Profile" />
                        <ProfileTab imgSRC={edit} profileText="Edit Profile" />
                        <ProfileTab imgSRC={password} profileText="Password Setting" />
                    </div> : <React.Fragment />}
                </div>
            </div>
        );
    }
}

export default CustomerDashboard;