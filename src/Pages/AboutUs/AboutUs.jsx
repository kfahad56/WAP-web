/* eslint-disable */
import React, { Component } from 'react';
import './aboutus.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import about from '../../components/images/about.png';
import aboutus from '../../components/images/aboutus.svg';
import workplace from '../../components/images/aboutus2.svg';
import AboutSliderCard from '../../components/AboutSliderCard/AboutSliderCard'
import rightArrow from '../../components/images/rightArrow.png';
import leftArrow from '../../components/images/leftArrow.png';
import icon1 from './images/customer-service.png';
import icon2 from './images/brain.png';
import icon3 from './images/like.png';
import icon4 from './images/heart.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookie from "js-cookie";
import * as base from "../../Apis/base";
import $ from 'jquery';
import aboutcms from '../../cms_pages/about.json';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import { Helmet } from "react-helmet";
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="rightArrowContainer"
            onClick={onClick}
        >
            <div className="rightButton">
                <img src={rightArrow} alt="" />
            </div>
        </div>
    );
}
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className="leftArrowContainer"
            onClick={onClick}
        >
            <div className="leftButton">
                <img src={leftArrow} alt="" />
            </div>
        </div>
    );
}
class AboutUs extends Component {
    state = {
        matches: window.matchMedia("(min-width: 480px)").matches,
        aboutData: []
    }
    componentDidMount() {
        const handler = e => this.setState({ matches: e.matches });
        window.matchMedia("(min-width: 480px)").addListener(handler);
        $(window).scrollTop(0)
    }
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        // const aboutData = () => {
        //     let aboutData = aboutcms
        //     return <p className="mt-3">{aboutData.desc1}</p>
        // }
        return (
            <div className="aboutUsContainer">
                {/* <React.Fragment> */}
                <Helmet>
                    <title>{aboutcms.seo.title}</title>
                    <meta
                        name="description"
                        content={aboutcms.seo.description}
                    />
                    <meta
                        name="keywords"
                        content={aboutcms.seo.keywords}
                    />
                </Helmet>
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                <section className="about">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-5">
                                <img src={aboutcms.aboutContent.aboutImage} className="w-100" alt="" />
                            </div>

                            <div className="col-md-7">
                                <div className="content">
                                    <div className="sec-head secAdjust">
                                        <h2>About Us</h2>
                                    </div>
                                    {/* {aboutData()} */}
                                    <p className="mt-3">{aboutcms.aboutContent.desc1}</p>
                                    <p>{aboutcms.aboutContent.desc2}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-12">
                                <ReactMarkdown allowDangerousHtml={true} source={aboutcms.extra_below_about_us} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className="aboutUsSection">
                    <div className="leftSection">
                        <div className="aboutImage">
                            <img src={about} alt="" />
                        </div>
                    </div>
                    <div className="rightSection">
                        <h3>About Us</h3>
                        <p>The Hubshub Model is setting the new normal in warehousing and is seeking to change the regular way of conducting business.
                        This new agile, lean and efficient model is aiding businesses & brands to move their goods faster in a nimble and hassle-free manner.
                            The end result is a Happier Customer . <br />
                            The Hubshub "core team" consists of a group of experts from supply chain logistics, manufacturing, technology and transportation backgrounds having varied experience with the best in industry. The founders bring in more than 80 years of combined industry experience & thus offer valuable insights to the needs of the Warehousing Industry.
                            <br /><br />
                        </p>
                    </div>
                </div> */}
                {/* <div className="aboutSliderContainer">
                    <Slider {...settings}>
                        <div>
                            <AboutSliderCard
                                title="Customer First"
                                des="The core of the Hubshub Model is “Customer First”... always. We are here for the long haul (both literally & figuratively!!). Our customers love the Hubshub model & given our customer centric approach, the model has seamlessly evolved into a more agile and adaptable one, thanks to the inputs &  trust put in by thousands of our existing customers."
                            />
                        </div>
                        <div>
                            <AboutSliderCard
                                title="Technology"
                                des="Hubshub Model uses Technology as one of the pillars. We use the latest technological tools for a seamless and convenient experience, including Data analytics, Lean Modelling**, an all online paperless system ( well .. almost) , modular approach harnessing the very best in current technological tools to increase revenue  and optimize costs."
                            />
                        </div>
                        <div>
                            <AboutSliderCard
                                title="Simplicity"
                                des="The Hubshub Model aims to keep things holistically simple for all stakeholders. The result is solutions that are beautiful in their efficiency & clarity , scalable and easier to adapt to varying situations."
                            />
                        </div>
                        <div>
                            <AboutSliderCard
                                title="Passion"
                                des="We’re on a mission and we will use our drive & commitment to energize , engage & inspire others. We have a passion & the tools to build something big. We know this is the future. Join us and Scale up your business to new heights."
                            />
                        </div>
                    </Slider>
                </div> */}
                <section className="ourvalues">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="sec-head">
                                    <h2>Our Values</h2>
                                </div>
                            </div>
                            {aboutcms.values.map(item => {
                                return <div className="col-md-6">
                                    <div className="content">
                                        <h3><span><img src={item.icon} alt="" /></span> {item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            })}
                            {/* <div className="col-md-6">
                                <div className="content">
                                    <h3><span><img src={aboutcms.values[0].icon} alt="" /></span> {aboutcms.values[0].title}</h3>
                                    <p>{aboutcms.values[0].description}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="content">
                                    <h3><span><img src={aboutcms.values[1].icon} alt="" /></span>  {aboutcms.values[1].title}</h3>
                                    <p>{aboutcms.values[1].description}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="content">
                                    <h3><span><img src={aboutcms.values[2].icon} style={{ width: "38px" }} alt="" /></span>  {aboutcms.values[2].title}</h3>
                                    <p>{aboutcms.values[2].description}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="content">
                                    <h3><span><img src={aboutcms.values[3].icon} alt="" /></span>  {aboutcms.values[3].title}</h3>
                                    <p>{aboutcms.values[3].description}</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="row">
                            <div class="col-md-12">
                                <ReactMarkdown allowDangerousHtml={true} source={aboutcms.extra_below_our_values} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className="ourValuesContainer">
                    <h3>Our Values</h3>
                    <div className="bottomCardContainer">
                        <div className="textCard">
                            <div className="titleText">Customer First</div>
                            <p>The core of the Hubshub Model is “Customer First”... always. We are here for the long haul (both literally &amp; figuratively!!). Our customers love the Hubshub model &amp; given our customer centric approach, the model has seamlessly evolved into a more agile and adaptable one, thanks to the inputs &amp;  trust put in by thousands of our existing customers.</p>
                        </div>
                        <div className="textCard">
                            <div className="titleText">Technology</div>
                            <p>Hubshub Model uses Technology as one of the pillars. We use the latest technological tools for a seamless and convenient experience, including Data analytics, Lean Modelling**, an all online paperless system ( well .. almost) , modular approach harnessing the very best in current technological tools to increase revenue  and optimize costs.</p>
                        </div>
                        <div className="textCard">
                            <div className="titleText">Simplicity</div>
                            <p>The Hubshub Model aims to keep things holistically simple for all stakeholders. The result is solutions that are beautiful in their efficiency &amp; clarity , scalable and easier to adapt to varying situations.</p>
                        </div>
                        <div className="textCard">
                            <div className="titleText">Passion</div>
                            <p>We’re on a mission and we will use our drive &amp; commitment to energize , engage &amp; inspire others. We have a passion &amp; the tools to build something big. We know this is the future. Join us and Scale up your business to new heights.</p>
                        </div>
                    </div>
                </div> */}
                <section className="about">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <div className="content">
                                    <div className="sec-head">
                                        <h2>Join Our Team</h2>
                                    </div>
                                    <p>{aboutcms.team.desc}</p>

                                    <NavLink to="/career" className="btn mb-3">
                                        Join the team
						            </NavLink>
                                </div>
                            </div>

                            <div class="col-md-5">
                                <img src={workplace} class="w-100" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <div className="theTeamContainer">
                    <div className="leftSection">
                        <h3>Join Our Team</h3>
                        <p>Hubshub is at the forefront of disrupting the Rupees  XX Trillion logistics &amp; supply chain industry in India. We are constantly  looking for suitable Professionals in the supply chain &amp; logistics industries. If you are passionate about working for a new age fast growing technology oriented logistics &amp; supply chain solutions provider do contact us at XXXXXXXXXXXXX.</p>
                        <NavLink to="/career"> <div className="joinButton">
                            <div className="joinText">Join the team</div>
                        </div>
                        </NavLink>
                    </div>
                    <div className="rightSection">
                        <h3>Join Our Team</h3>
                        <div className="teamImage">
                            <img src={workplace} alt="" />
                        </div>
                    </div>
                </div> */}
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
                {/* </React.Fragment> */}
            </div>
        );
    }
}

export default AboutUs;