/* eslint-disable */
import React, { Component } from 'react';
import './blogcontent.css';
import cmsData from '../../cms_pages/blog.json';
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

let blogFound = false
class BlogContent extends Component {
    state = {
        Email: "",
        successPopup: false,
        error: "",
        title: "",
        desc: "",
        isLoading: false,

        // Used for 404
        // blogFound: false,
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
        return cmsData.blog_data.map(item => {
            return (
                <Helmet>
                    <title>{` ${item.text} | Hubshub`}</title>
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
                {cmsData.blog_data.map(item => {
                    if (this.props.match.params.id === item.url) {
                        // {this.setState({ blogFound: true }, () => console.log('edited: ', this.state.blogFound))}
                        blogFound = true
                        return (<section className="blogs">
                            <div className="container">
                                <div className="row">
                                    <div className="sec-head mt-4 sec-head2">
                                        <h2>{item.text}</h2>
                                        <h5>{item.sub_text}</h5>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="float-left">
                                            <h6>Author - {item.author}</h6>
                                            <h6>Date: {item.blog_date}</h6>
                                        </div>
                                        <div className="footer-link float-right">
                                            {/* <FacebookShareButton url={"https://hubshub.in/blogs/" + item.url}>
                                                <div className="icon-button facebook">
                                                    <i className="fa fa-facebook"></i><span></span>
                                                </div>
                                            </FacebookShareButton>
                                            <TwitterShareButton url={"https://hubshub.in/blogs/" + item.url}>
                                                <div className="icon-button twitter">
                                                    <i className="fa fa-twitter"></i><span></span>
                                                </div>
                                            </TwitterShareButton>
                                            <LinkedinShareButton url={"https://hubshub.in/blogs/" + item.url}>
                                                <div className="icon-button linkedin">
                                                    <i className="fa fa-linkedin"></i><span></span>
                                                </div>
                                            </LinkedinShareButton> */}
                                            <FacebookShareButton url={"https://share.hubshub.in/blog/" + item.url}>
                                                <div className="icon-button facebook">
                                                    <i className="fa fa-facebook"></i><span></span>
                                                </div>
                                            </FacebookShareButton>
                                            <TwitterShareButton url={"https://share.hubshub.in/blog/" + item.url}>
                                                <div className="icon-button twitter">
                                                    <i className="fa fa-twitter"></i><span></span>
                                                </div>
                                            </TwitterShareButton>
                                            <LinkedinShareButton url={"https://share.hubshub.in/blog/" + item.url}>
                                                <div className="icon-button linkedin">
                                                    <i className="fa fa-linkedin"></i><span></span>
                                                </div>
                                            </LinkedinShareButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-8 mb-3">
                                        <div className="blog-detail blogImageAdjust">
                                            <img src={item.blog_image.image} alt={item.blog_image.alt} className="w-100 mb-3" />
                                            {item.full_blog_content.map(item => {
                                                return <ReactMarkdown allowDangerousHtml={true} source={item.desc}></ReactMarkdown>
                                            })}
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div className="subscribe">
                                            <div className="sec-head">
                                                <h2>Subscribe</h2>
                                            </div>
                                            <div className="contact-inner">
                                                <form>
                                                    <div className="mail blogMailAdjust">
                                                        <input type="text" name="Email" value={this.state.Email} name="Email"
                                                            onChange={this.handleChange}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.subscribe()
                                                                }
                                                            }} />
                                                        <label>Enter Your Email</label>
                                                    </div>
                                                    <div className='error'>{this.state.error}</div>
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
                                                    <div className="mail">
                                                        <div tabIndex="0" className={this.state.isLoading ? "btn mb-2 btnAdjust btn-disabled" : "btn mb-2 btnAdjust"} onClick={() => { this.state.isLoading ? "" : this.subscribe() }}
                                                            onKeyPress={(event) => {
                                                                if (event.key === "Enter") {
                                                                    this.state.isLoading ? "" : this.subscribe()
                                                                }
                                                            }}>Subscribe</div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                            // <div className="blogDescContainer">
                            //     <div className="leftSection">
                            //         <div className="topSection">
                            //             <div className="headingText">{item.Text}</div>
                            //             <div className="blogByText">Blog by : Tamal Pal</div>
                            //         </div>
                            //         <h4>{item.subtext}</h4>
                            //         <div className="descImage">
                            //             <img src={item.img} alt="" />
                            //         </div>
                            //         {item.fullDesc.map(item => {
                            //             return <div className="descText">{item}</div>
                            //         })}
                            //         <div className="nextPrevContainer">
                            //             <NavLink to="/blogs/on-demand-warehousing"><div className="nextText">PREV</div></NavLink>
                            //             <NavLink to="/blogs/warehouse-security"><div className="nextText">NEXT</div></NavLink>
                            //         </div>
                            //     </div>
                            //     <div className="rightSection">
                            //         <div className="trendingNowContainer">
                            //             <div className="trendingText">Relative Blogs</div>
                            //             <div className="trendingContent">
                            //                 <div className="titleTextContainer">
                            //                     <div className="numberText">1.</div>
                            //                     <div> Title</div>
                            //                 </div>
                            //                 <div className="divideBorder"></div>
                            //             </div>
                            //             <div className="trendingContent">
                            //                 <div className="titleTextContainer">
                            //                     <div className="numberText">1.</div>
                            //                     <div> Title</div>
                            //                 </div>
                            //                 <div className="divideBorder"></div>
                            //             </div>
                            //             <div className="trendingContent">
                            //                 <div className="titleTextContainer">
                            //                     <div className="numberText">1.</div>
                            //                     <div> Title</div>
                            //                 </div>
                            //                 <div className="divideBorder"></div>
                            //             </div>
                            //             <div className="trendingContent">
                            //                 <div className="titleTextContainer">
                            //                     <div className="numberText">1.</div>
                            //                     <div> Title</div>
                            //                 </div>
                            //                 <div className="divideBorder"></div>
                            //             </div>
                            //         </div>
                            //         <div className="subscribeContainer">
                            //             <div className="subscribeText">Subscribe !!</div>
                            //             <TextField
                            //                 className="emailID"
                            //                 label="Email Id"
                            //                 placeholder="Enter your email id"
                            //                 fullWidth
                            //                 value={this.state.Email}
                            //                 name="Email"
                            //                 onChange={this.handleChange}
                            //                 onKeyPress={(event) => {
                            //                     if (event.key === "Enter") {
                            //                         this.subscribe()
                            //                     }
                            //                 }}
                            //                 InputLabelProps={{
                            //                     shrink: true,
                            //                 }}
                            //                 variant="outlined"
                            //             />
                            //             <div className='error'>{this.state.error}</div>
                            //             <div className="subsrcibeButton" onClick={() => this.subscribe()}>
                            //                 <div className="btnText">Subscribe</div>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>
                        )
                    }
                })}
                {blogFound ? <></> : <Redirect to="/404" />}
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
            </div>
        );
    }
}

export default BlogContent;