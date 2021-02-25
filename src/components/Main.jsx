/* eslint-disable */
import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./master/master.css";
import Home from '../Pages/Home/Home';
import SearchPage from "../Pages/SearchPage/SearchPage";
import Login from "../Pages/LoginPage/Login";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import ViewWareHouseDetails from '../Pages/ViewWarehouseDetails/ViewWarehouseDetails';
import ContactUs from "../Pages/ContactUs/ContactUs";
import CustomerDashboard from '../Pages/CustomerDashboard/CustomerDashboard';
import VendorLogin from "../Pages/VendorLogin/VendorLogin";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Blog from '../Pages/Blog/Blog';
import BlogContent from '../Pages/BlogContent/BlogContent';
import ExtraPages from '../Pages/ExtraPages/ExtraPages';
import CarrerPage from "../Pages/CarrerPage/CarrerPage";
import FaqPage from "../Pages/FaqPage/FaqPage";
import test from "../Pages/test";
import EmailConfirmation from "../Pages/EmailConfirmation";
import Cookie from "js-cookie";
import Cookies from '../Pages/Cookie/Cookies';
import NotFound from '../Pages/NotFound';
import PrivacyPolicy from '../Pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from '../Pages/TermsOfService/TermsOfService';
import ContactTerms from '../Pages/ContactTerms/ContactTerms';
import ContactTerms2 from '../Pages/ContactTerms2/ContactTerms2';
import * as base from "../Apis/base";

function Logout() {
    base.logout(false);
}

const LoginRegisterWrapper = (props) => {
    if (props.location.state && props.location.state.vendorRegistration === true) return <VendorLogin {...props} />
    else return <Login {...props} />
}

class Main extends Component {
    state = {}
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact strict component={Home} />
                    <Route path="/login" exact strict component={LoginRegisterWrapper} />
                    {/* <Route path="/vendorlogin" exact strict component={VendorLogin} /> */}
                    <Route path="/resetpassword/:token" exact strict component={ResetPassword} />
                    <Route path="/search" exact strict component={SearchPage} />
                    <Route path="/aboutus" exact strict component={AboutUs} />
                    <Route path="/blogs" exact strict component={Blog} />
                    <Route path="/blogs/:id" exact strict component={BlogContent} />
                    <Route path="/p/:id" exact strict component={ExtraPages} />
                    <Route path="/faq" exact strict component={FaqPage} />
                    <Route path="/career" exact strict component={CarrerPage} />
                    <Route path="/viewwarehouse/:id" exact strict component={ViewWareHouseDetails} />
                    <Route path="/customerdashboard" exact strict component={CustomerDashboard} />
                    <Route path="/contact" exact strict component={ContactUs} />
                    <Route path="/privacy-policy" exact strict component={PrivacyPolicy} />
                    <Route path="/terms-of-service" exact strict component={TermsOfService} />
                    <Route path="/terms-of-service-client" exact strict component={ContactTerms} />
                    <Route path="/terms-of-service-partner" exact strict component={ContactTerms2} />
                    <Route path="/email-confirmation/:token" exact strict component={EmailConfirmation} />
                    <Route path="/email-confirmation/:token/:type" exact strict component={EmailConfirmation} />
                    <Route path="/cookie" exact strict component={Cookies} />
                    <Route path="/logout" exact strict component={Logout} />
                    {/* <Route path="/test" exact strict component={test} /> */}


                    <Route path="/404" exact strict component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Main;