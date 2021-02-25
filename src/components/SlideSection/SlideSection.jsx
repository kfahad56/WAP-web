/* eslint-disable */
import React, { Component } from 'react';
import './slidesection.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from '../images/icon/01.png';
import Slider2 from '../images/icon/02.png';
import Slider3 from '../images/icon/03.png';
import Slider4 from '../images/icon/04.png';
import Slider5 from '../images/icon/05.png';
import Slider6 from '../images/icon/06.png';
import Slider7 from '../images/icon/07.png';
import rightArrow from '../images/rightArrow.png';
import title1 from '../../components/images/icon/technology.svg';
import title2 from '../../components/images/icon/revenue.svg';
import title3 from '../../components/images/icon/deal.svg';
import rightundraw1 from '../../components/images/rightImage/tec.svg';
import rightundraw2 from '../../components/images/rightImage/invest.svg';
import rightundraw3 from '../../components/images/rightImage/part.svg';

import cms_data from "../../cms_pages/home.json";


function SampleNextArrow(props) {
    const { onClick, style } = props;
    return (
        <div
            className="rightArrowContainer"
            onClick={onClick}
        >
            <div className="rightButton" style={{ ...style}}>
                <img src={rightArrow} alt="" />
            </div>
        </div>
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className="leftArrowContainer"
            onClick={onClick}
        >
            <div className="rightButton" style={{ ...style}}>
                <img src={rightArrow} alt="" />
            </div>
        </div>
    );
}
class SlideSection extends Component {
    state = {
        title: "Title 1",
        title2: "Title 1",
    }
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 4000,
            slidesToShow: 3,
            slidesToScroll: 1,
            focusOnSelect: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
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
        const renderItems = () => {
            return cms_data.why_hubshub_users.map((item, index) => 
            <div class={"owl-item owl-itemAdjust" + (index === 1 ? "": "active")} >
                <div class="item" >
                    <div class="shadow-effect">
                        <img class="img-responsive" src={item.image} alt={item.alt} />
                        <div class="item-details">
                            <h5>{item.heading}</h5>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        return (
            <div id="user" class="owl-carousel owl-loaded owl-drag owl-hidden">
                <div class="owl-stage-outer"><div class="owl-stage">
                    <Slider {...settings}>
                        {renderItems()}
                    {/* <div class="owl-item owl-itemAdjust" >
                            <div class="item" >
                                <div class="shadow-effect">
                                    <img class="img-responsive" src={Slider5} alt="" />
                                    <div class="item-details">
                                        <h5>One-stop  Warehousing &amp; Logistics Solution</h5>
                                        <p>Hubshub takes care of all your warehousing and secondary distribution needs, making it so easy for you to enter a new geographical market or launch a new product. We have a wide geographical reach to help you access even the remotest locations with ease.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="owl-item active owl-itemAdjust" >
                            <div class="item" >
                                <div class="shadow-effect">
                                    <img class="img-responsive" src={Slider6} alt="" />
                                    <div class="item-details">
                                        <h5>High Visibility of Options</h5>
                                        <p>Now you can view all the warehousing &amp; logistics options available at a certain location and the details for each, including space and rates, with the click of a few buttons. No more hassle of dealing with local agents or sending your team to the area!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="owl-item active owl-itemAdjust">
                            <div class="item" >
                                <div class="shadow-effect">
                                    <img class="img-responsive" src={Slider7} alt="" />
                                    <div class="item-details">
                                        <h5>Vetted &amp; Secure Warehouses</h5>
                                        <p>Hubshub ensures that its warehousing partners adhere to strict compliance and security protocols. Since these spaces and services are vetted by Hubshub, you have an added layer of reassurance of quality</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="owl-item cloned owl-itemAdjust" >
                            <div class="item" >
                                <div class="shadow-effect">
                                    <img class="img-responsive" src={Slider2} alt="" />
                                    <div class="item-details">
                                        <h5>Online Real-time Visibility</h5>
                                        <p>Get updates of your inventory and supply chain status anytime anywhere with Hubshub’s dashboard. Control your products and their movement using tools that give you 24/7 visibility.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="owl-item cloned owl-itemAdjust" >
                            <div class="item" >
                                <div class="shadow-effect">
                                    <img class="img-responsive" src={Slider3} alt="" />
                                    <div class="item-details">
                                        <h5>Addition &amp; Standardization of Services</h5>
                                        <p>Hubshub goes above and beyond just linking demand and supply when it comes to warehousing options by providing an array of standardised value-added services, including packaging, insurance, sorting, manpower contracting, analytics, equipment leasing and fulfillment. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="owl-item cloned owl-itemAdjust" >
                            <div class="item" >
                                <div class="shadow-effect">
                                    <img class="img-responsive" src={Slider4} alt="" />
                                    <div class="item-details">
                                        <h5>Access to Latest Technology </h5>
                                        <p>Hubshub relies on the most efficient tools and technology for inventory benchmarking and optimization. Our Hubshub Index helps benchmark your supply chain and inventory status to allow for constant improvements.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="owl-item cloned owl-itemAdjust">
                            <div class="item" >
                                <div class="shadow-effect">
                                    <img class="img-responsive" src={Slider1} alt="" />
                                    <div class="item-details">
                                        <h5>KPI/SLA-driven Services</h5>
                                        <p>Just like your customers' satisfaction is important for you, your satisfaction is our first priority. Our dashboard keeps us accountable to stick to mutually agreed KPIs and SLAs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                     */}
                    </Slider>
                </div>
                </div>
                <div class="owl-nav disabled">
                    <button type="button" role="presentation" class="owl-prev"><i class="fa fa-angle-left"></i></button>
                    <button type="button" role="presentation" class="owl-next"><i class="fa fa-angle-right"></i></button>
                </div>
                <div class="owl-dots disabled">
                </div>
            </div>
        );
    }
}

export default SlideSection;