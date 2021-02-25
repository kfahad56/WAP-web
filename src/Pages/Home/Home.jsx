/* eslint-disable */
import React, { Component } from 'react';
import './home.css';
import Header from '../../components/header/Header';
import MainSlider from '../../components/slider/MainSlider';
import Footer from '../../components/myFooter/Footer';
import BlogButton from '../../components/BlogButton/BlogButton';
import VideoBox from '../../components/VideoBox/VideoBox';
import WhyHubshubData from '../../components/WhyHubshubData/WhyHubshubData';
import OptimizeSearchCard from '../../components/OptimizeSearchCard/OptimizeSearchCard';
import CardSlider from '../../components/cardSlider/CardSlider';
import viewall from '../../components/images/viewall.png';
import ReactMarkdown from 'react-markdown';
import hubshubText from '../../components/images/newlogo.png';
import icon13 from '../../components/images/icon/tell-us-requirement.png';
import icon10 from '../../components/images/icon/browse-through-our-listing.png';
import icon9 from '../../components/images/icon/finilise-n-book.png';
import icon3 from '../../components/images/icon/submit-detail.png';
import icon2 from '../../components/images/icon/rent-out.png';
import icon1 from '../../components/images/icon/upload-visuals.png';
import blog1 from '../../components/images/blog/blog1.svg';
import blog2 from '../../components/images/blog/blog2.svg';
import blog3 from '../../components/images/blog/blog3.svg';
import mobbBlog1 from '../../components/images/mobBlog1.png';
import why from '../../components/images/why2.svg';
import patch from '../../components/images/patch.png';
import Accordion from '../../components/Accordion/Accordion';
import { NavLink } from 'react-router-dom';
import Loader from "react-loader-spinner";
import SlideSection from '../../components/SlideSection/SlideSection';
import SlideSection2 from '../../components/SlideSection2/SlideSection2';
import CardView from '../../components/CardView/CardView';
import card1 from '../../components/images/card1.png';
import { getWarehousebyLatLng } from '../../Apis/Warehouse';
import * as base from "../../Apis/base";
import Cookie from "js-cookie";
import { Helmet } from "react-helmet";
import CookieConsent from "react-cookie-consent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


//TK_CMS

import cms_data from "../../cms_pages/home.json";
import blog_cms from '../../cms_pages/blog.json';

class Home extends Component {
    state = {
        title: "Title 1",
        title2: "Title 1",
        whyhubshub: true,
        whyhubshub2: false,
        mobileTitle: true,
        mobileTitle2: false,
        whyhubshubTitle: true,
        whyhubshubTitle2: false,
        isLoading: true,
        suggested: {
            isLoading: true,
            apiCalled: false,
            data: []
        }
    }
    componentDidMount() {
        $(window).scrollTop(0)
        this.setState({ isLoading: false });
    }
    render() {
        if (this.state.suggested.apiCalled === false) {
            getWarehousebyLatLng((data) => {
                this.state.suggested.isLoading = false;
                this.state.suggested.apiCalled = true;
                this.state.suggested.data = data;
                this.setState({
                    ...this.state
                });
            }, () => {
                this.state.suggested.isLoading = false;
                this.state.suggested.apiCalled = true;
                this.state.suggested.data = [];
                this.setState({
                    ...this.state
                });
            });
        }
        if (this.state.isLoading) {
            return (<div>
                <Loader type="TailSpin" color="#0055FF" height={80} width={80} />
            </div>)
        }

        const dumymData = () => {
            let t = [];
            this.state.suggested.data.map((item) => {
                t.push(<CardView
                    title={item.name}
                    imgSRC={item.image.file}
                    location={item.state}
                    whiteArrow={true}
                    onArrowClick={() => {
                        this.props.history.push('/viewwarehouse/' + item.warehouseVersionId);
                    }}
                />);
            });

            while (t.length < 3) {
                t.push(<CardView whiteArrow={true} />);
            }
            return t;
        }
        var settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 4000,
            slidesToShow: 3,
            slidesToScroll: 1,
            focusOnSelect: false,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="homeContainer">
                <Helmet>
                    <title>{cms_data.seo.title}</title>
                    <meta
                        name="description"
                        content={cms_data.seo.description}
                    />
                    <meta
                        name="keywords"
                        content={cms_data.seo.keywords}
                    />
                </Helmet>
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                <section className="slider">
                    <MainSlider />
                    <OptimizeSearchCard />
                </section>
                <section className="storage">
                    <div className="container">
                        <div className="sec-head mt-4">
                            {/* TK_CMS */}
                            <h2>{cms_data.suggestion}</h2>
                        </div>
                        <p>{cms_data.suggested_desc}</p>
                        <div className="row">
                            {
                                this.state.suggested.data.length === 0
                                    && this.state.suggested.apiCalled === true ?
                                    <>
                                        <div className="noDataText">No Storage Location Near You</div>
                                    </> : "" //Do nothing
                            }
                            {dumymData()}
                        </div>
                    </div>
                </section>
                <section className="tag">
                    <div className="container">
                        <h2><span className="logoAdjust"><img src={hubshubText} alt="" /> </span> - Your logistics WAP ! Simple, Convenient &amp; Reliable.</h2>
                    </div>
                </section>
                <section class="how-to-use" id="tabs">
                    <div class="container">
                        <div class="sec-head mt-4">
                            <h2>Why WAP ?</h2>
                        </div>
                        <p style={{ textAlign: "justify" }}>{cms_data.why_hubshub}</p>
                        <div class="row">
                            <div class="col-md-12">
                                <nav>
                                    <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home1" role="tab" aria-controls="nav-home" aria-selected="false">Users</a>
                                        <a class="nav-link " id="nav-profile-tab" data-toggle="tab" href="#nav-profile1" role="tab" aria-controls="nav-profile" aria-selected="true">Warehousing Service Partners</a>
                                    </div>
                                </nav>
                                <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                    <div class="tab-pane fade active show" id="nav-home1" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <div class="user">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <SlideSection />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-profile1" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <div class="user">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <SlideSection2 />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <ReactMarkdown allowDangerousHtml={true} source={cms_data.extra_below_why_hubshub_warehousing_partners} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="video">
                    <div className="container">
                        <div className="sec-head mt-4">
                            <h2>Video Guide for Hubshub users</h2>
                        </div>
                        <div className="row mt-2">
                            <VideoBox videoHeading="Are you a company looking for Warehouses ?" />
                            <VideoBox videoHeading="Are you a warehouse owner looking for clients?" />
                        </div>
                    </div>
                </section> */}
                <div className="back">
                    <section class="how-to-use how-to-use2" id="tabs">
                        <div class="container">
                            <div class="sec-head mt-4">
                                <h2>How to use Hubshub</h2>
                            </div>

                            <p>{cms_data.how_to_hubshub}</p>
                            <div class="row">
                                <div class="col-md-12">
                                    <nav>
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Users</a>
                                            <a class="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Partners</a>
                                        </div>
                                    </nav>
                                    <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                        <div class="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <div class="user">
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <div id="user2" class="owl-carousel owl-loaded owl-drag">
                                                                <div class="owl-stage-outer"><div class="owl-stage owl-stageAdjust">
                                                                    <Slider {...settings}>
                                                                        <div class="owl-item active" >
                                                                            <div class="item">
                                                                                <div class="shadow-effect shadow-effect1">
                                                                                    <img class="img-responsive" src={cms_data.how_to_hubshub_users[0].image} alt={cms_data.how_to_hubshub_users[0].alt} />
                                                                                    <div class="item-details">
                                                                                        <h5>{cms_data.how_to_hubshub_users[0].heading}</h5>
                                                                                        <p>{cms_data.how_to_hubshub_users[0].desc}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="owl-item active" >
                                                                            <div class="item">
                                                                                <div class="shadow-effect shadow-effect1">
                                                                                    <img class="img-responsive" src={cms_data.how_to_hubshub_users[1].image} alt={cms_data.how_to_hubshub_users[1].alt} />
                                                                                    <div class="item-details">
                                                                                        <h5>{cms_data.how_to_hubshub_users[1].heading}</h5>
                                                                                        <p>{cms_data.how_to_hubshub_users[1].desc}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="owl-item active" >
                                                                            <div class="item">
                                                                                <div class="shadow-effect shadow-effect1">
                                                                                    <img class="img-responsive" src={cms_data.how_to_hubshub_users[2].image} alt={cms_data.how_to_hubshub_users[2].alt} />
                                                                                    <div class="item-details">
                                                                                        <h5>{cms_data.how_to_hubshub_users[2].heading}</h5>
                                                                                        <p>{cms_data.how_to_hubshub_users[2].desc}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Slider>
                                                                </div>
                                                                </div>
                                                                <div class="owl-nav disabled"><button type="button" role="presentation" class="owl-prev"><i class="fa fa-angle-left"></i></button><button type="button" role="presentation" class="owl-next"><i class="fa fa-angle-right"></i></button></div><div class="owl-dots disabled"></div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                            <div class="user">
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <div id="user3" class="owl-carousel owl-loaded owl-drag owl-hidden">
                                                                <div class="owl-stage-outer"><div class="owl-stage owl-stageAdjust">
                                                                    <Slider {...settings}>
                                                                        <div class="owl-item active" ><div class="item">
                                                                            <div class="shadow-effect shadow-effect1">
                                                                                <img class="img-responsive" src={cms_data.how_to_hubshub_partners[0].image} alt={cms_data.how_to_hubshub_partners[0].alt} />
                                                                                <div class="item-details">
                                                                                    <h5>{cms_data.how_to_hubshub_partners[0].heading}</h5>
                                                                                    <p>{cms_data.how_to_hubshub_partners[0].desc}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div></div><div class="owl-item active" ><div class="item">
                                                                            <div class="shadow-effect shadow-effect1">
                                                                                <img class="img-responsive" src={cms_data.how_to_hubshub_partners[1].image} alt={cms_data.how_to_hubshub_partners[1].alt} />
                                                                                <div class="item-details">
                                                                                    <h5>{cms_data.how_to_hubshub_partners[1].heading}</h5>
                                                                                    <p>{cms_data.how_to_hubshub_partners[1].desc}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div></div><div class="owl-item active" ><div class="item">
                                                                            <div class="shadow-effect shadow-effect1">
                                                                                <img class="img-responsive" src={cms_data.how_to_hubshub_partners[2].image} alt={cms_data.how_to_hubshub_partners[2].alt} />
                                                                                <div class="item-details">
                                                                                    <h5>{cms_data.how_to_hubshub_partners[2].heading}</h5>
                                                                                    <p>{cms_data.how_to_hubshub_partners[2].desc}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div></div>
                                                                    </Slider>
                                                                </div></div><div class="owl-nav disabled"><button type="button" role="presentation" class="owl-prev"><i class="fa fa-angle-left"></i></button><button type="button" role="presentation" class="owl-next"><i class="fa fa-angle-right"></i></button></div><div class="owl-dots disabled"></div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-md-12">
                                    <ReactMarkdown allowDangerousHtml={true} source={cms_data.extra_below_how_to_hubshub} />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <section className="testimonials">
                        <div className="container">
                            <div className="sec-head mt-4">
                                <h2>Testimonial</h2>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div id="customers-testimonials" className="owl-carousel owl-loaded owl-drag">
                                        <div className="owl-stage-outer"><div className="owl-stage" style={{ transition: "all 0.45s ease 0s", width: "8880px", transform: "translate3d(-3330px, 0px, 0px)" }}><div className="owl-item cloned" style={{width: "1110px"}}><div className="item">
                                            <div className="shadow-effect">
                                                
                                                <p>Hubshub has been the much needed solution for Indian logistics sector. We were looking to keep the goods moving during lockdown and hubshub came to the rescue when many regular means failed.</p>
                                                <div className="testimonial-name"><img className="img-circle" src="image/demo.png" alt="" /> Ms Reema Talwar <br /> Supply chain manager.</div>
                                            </div>

                                        </div></div><div className="owl-item cloned" style={{ width: "1110px" }}><div className="item">
                                            <div className="shadow-effect">
                                                
                                                <p>My warehouse utilization improved and I have visible revnue for the next three years. I am now planning to partner on onemore warehouse next month.</p>
                                                <div className="testimonial-name"><img className="img-circle" src="image/demo.png" alt="" />  Mr Nilesh Kale <br /> Warehouse Owner , Auranganbad.</div>
                                            </div>

                                        </div></div><div className="owl-item" style={{ width: "1110px" }}><div className="item">
                                            <div className="shadow-effect">
                                                <p>Using Hubshub was the best decision taken. In one move all my logistical nightmares were resolved. I used the warehouse services and can vouch for them. it is indeed very conveninet &amp; hssle Free</p>

                                                <div className="testimonial-name">
                                                    <img className="img-circle" src="image/demo.png" alt="" />
					                                Mr Damodar Gupta <br /> VP Production
				                                </div>
                                            </div>

                                        </div></div><div className="owl-item active center" style={{ width: "1110px" }}><div className="item">
                                            <div className="shadow-effect">
                                                
                                                <p>I dont need to wait ages to get the right warehouse. ITs all there at the click of button. Why didnt I come here before?</p>
                                                <div className="testimonial-name"><img className="img-circle" src="image/demo.png" alt="" /> Name<br /> Designation</div>
                                            </div>

                                        </div></div><div className="owl-item" style={{ width: "1110px" }}><div className="item">
                                            <div className="shadow-effect">
                                                
                                                <p>Hubshub has been the much needed solution for Indian logistics sector. We were looking to keep the goods moving during lockdown and hubshub came to the rescue when many regular means failed.</p>
                                                <div className="testimonial-name"><img className="img-circle" src="image/demo.png" alt="" /> Ms Reema Talwar <br /> Supply chain manager.</div>
                                            </div>

                                        </div></div><div className="owl-item" style={{ width: "1110px" }}><div className="item">
                                            <div className="shadow-effect">
                                                <p>My warehouse utilization improved and I have visible revnue for the next three years. I am now planning to partner on onemore warehouse next month.</p>
                                                <div className="testimonial-name"><img className="img-circle" src="image/demo.png" alt="" />  Mr Nilesh Kale <br /> Warehouse Owner , Auranganbad.</div>
                                            </div>

                                        </div></div><div className="owl-item cloned" style={{ width: "1110px" }}><div className="item">
                                            <div className="shadow-effect">
                                                <p>Using Hubshub was the best decision taken. In one move all my logistical nightmares were resolved. I used the warehouse services and can vouch for them. it is indeed very conveninet &amp; hssle Free</p>

                                                <div className="testimonial-name">
                                                    <img className="img-circle" src="image/demo.png" alt="" />
					                                Mr Damodar Gupta <br /> VP Production
				                                </div>
                                            </div>
                                        </div></div><div className="owl-item cloned" style={{ width: "1110px" }}><div className="item">
                                            <div className="shadow-effect">
                                                <p>I dont need to wait ages to get the right warehouse. ITs all there at the click of button. Why didnt I come here before?</p>
                                                <div className="testimonial-name"><img className="img-circle" src="image/demo.png" alt="" /> Name<br /> Designation</div>
                                            </div>

                                        </div></div></div></div><div className="owl-nav"><button type="button" role="presentation" className="owl-prev"><i className="fa fa-long-arrow-left"></i></button><button type="button" role="presentation" className="owl-next"><i className="fa fa-long-arrow-right"></i></button></div><div className="owl-dots disabled"></div></div>
                                </div>
                            </div>
                        </div>
            </section> */}
                </div>
                <section className="blog-section">
                    <div className="container">
                        <div className="sec-head mb-4">
                            <h2>Blogs</h2>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-4 mb-3">
                                <div className="blog">
                                    <div className="blog-img">
                                        <img src={blog_cms.blog_data[0].blog_image.image} className="w-100" alt={blog_cms.blog_data[0].blog_image.alt} />
                                    </div>

                                    <div className="blog-text">
                                        <h4>{blog_cms.blog_data[0].text} </h4>
                                        <h5>{blog_cms.blog_data[0].sub_text}</h5>
                                        <p>{blog_cms.blog_data[0].description}</p>
                                        <NavLink to={`/blogs/${blog_cms.blog_data[0].url}`} className="btn"> Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-4 mb-3">
                                <div className="blog">
                                    <div className="blog-img">
                                        <img src={blog_cms.blog_data[1].blog_image.image} className="w-100" alt={blog_cms.blog_data[1].blog_image.alt} />
                                    </div>

                                    <div className="blog-text">
                                        <h4>{blog_cms.blog_data[1].text}</h4>
                                        <h5>{blog_cms.blog_data[1].sub_text}</h5>
                                        <p>{blog_cms.blog_data[1].description}</p>

                                        <NavLink to={`/blogs/${blog_cms.blog_data[1].url}`} className="btn"> Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-4 mb-3">
                                <div className="blog">
                                    <div className="blog-img">
                                        <img src={blog_cms.blog_data[2].blog_image.image} className="w-100" alt={blog_cms.blog_data[2].blog_image.alt} />
                                    </div>

                                    <div className="blog-text">
                                        <h4>{blog_cms.blog_data[2].text} </h4>
                                        <h5>{blog_cms.blog_data[2].sub_text}</h5>
                                        <p>{blog_cms.blog_data[2].description}</p>

                                        <NavLink to={`/blogs/${blog_cms.blog_data[2].url}`} className="btn"> Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                                    </div>

                                </div>
                            </div>
                            <div className="text-center col-md-12 mt-5">
                                <NavLink to="/blogs" className="btn">View All</NavLink>
                            </div>
                        </div>
                    </div>
                </section>
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
                <CookieConsent
                    location="bottom"
                    buttonText="I Accept"
                    cookieName="myAwesomeCookieName2"
                    style={{ background: "#707070" }}
                    buttonStyle={{ background: "#ffffff", color: "#000000", fontSize: "13px" }}
                    expires={150}
                >
                    I Accept Terms and Conditions, Privacy Policy and Cookies{" "}
                </CookieConsent>
            </div>
        );
    }
}

export default Home;