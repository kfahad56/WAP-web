/* eslint-disable */
import React, { Component } from 'react';
import './blogcontent.css';
import cmsData from '../../cms_pages/page.json';
import TextField from '@material-ui/core/TextField';
import Cookie from "js-cookie";
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import * as base from "../../Apis/base";
import { Redirect } from 'react-router-dom';
import $ from "jquery";
import * as emailSub from '../../Apis/EmailSub'
import { Popup } from '../../components/Popup/Popup';
import illustration from '../../components/images/mail_sent.svg'
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
import ReactMarkdown from 'react-markdown';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";

let pageFound = false
class ExtraPages extends Component {
    state = {
        Email: "",
        successPopup: false,
        error: "",
        title: "",
        desc: "",
        isLoading: false
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value, error: '', isLoading: false });
    };
    componentDidMount() {
        $(window).scrollTop(0)
    }
    subscribe = () => {
        this.setState({ isLoading: true });
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.Email)) {
            emailSub.emailSub(
                this.state.Email,
                () => {
                    this.setState({ successPopup: true, Email: "", isLoading: false })
                    // console.log('email subscription successful')
                },
                () => {
                    this.setState({ error: "Email Already Subscribed" })
                    // console.log('email subscription error')
                })
        } else {
            this.setState({ error: "Invalid Email" })
        }
    }
    dataText = () => {
        return cmsData.page_content.map(item => {
            return (
                <Helmet>
                    <title>{` ${item.text} | hubshub`}</title>
                    <meta
                        name="description"
                        content={`${item.description}`}
                    />
                </Helmet>
            )
        })
    }
    componentDidUpdate() {
        if (this.state.error !== "") {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        }
    }
    render() {
        return (
            <div className="blogContentContainer">
                {this.dataText()}
                {this.state.successPopup ? <Popup
                    illustration={illustration}
                    isPopupOpen={this.state.successPopup}
                    text="Check your email to complete the process"
                    handleClose={() => this.setState({ successPopup: false })}
                /> : <React.Fragment />}
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                {cmsData.page_content.map(item => {
                    if (this.props.match.params.id === item.url) {
                        pageFound = true
                        return (
                            <div>
                                <div>
                                    <img src={item.page_image.image} alt={item.page_image.alt} className="w-100 mb-3" />
                                </div>
                                <div className="container">
                                    <ReactMarkdown allowDangerousHtml={true} source={item.content}></ReactMarkdown>
                                </div>
                            </div>
                        )
                    }
                })}
                {pageFound ? <></> : <Redirect to="/404" />}
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
            </div>
        );
    }
}

export default ExtraPages;