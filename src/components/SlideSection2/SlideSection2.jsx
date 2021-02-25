/* eslint-disable */
import React, { Component } from 'react';
import './slidesection2.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rightArrow from '../images/rightArrow.png';
import Slider1 from '../images/icon/08.png';
import Slider2 from '../images/icon/09.png';
import Slider3 from '../images/icon/10.png';
import Slider4 from '../images/icon/11.png';
import Slider5 from '../images/icon/12.png';
import Slider6 from '../images/icon/13.png';
import Slider7 from '../images/icon/14.png';


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
class SlideSection2 extends Component {
    state = {
        title: "Title 1",
        title2: "Title 1",
    }
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
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
        const renderItem = () => {
            return cms_data.why_hubshub_warehousing_partners.map((item,index) => 
            <div class={"owl-item owl-itemAdjust" + (index > 2 ? "cloned": "")}>
                <div class="item">
                    <div class="shadow-effect">
                        <img class="img-responsive" src={item.image} alt={item.alt} />
                        <div class="item-details">
                            <h5>{item.heading}</h5>
                            <p>{item.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        return (
            <div id="user1" class="owl-carousel owl-loaded owl-drag">
                <div class="owl-stage-outer">
                    <div class="owl-stage" style={{ transform: "translate3d(-3330px, 0px, 0px)", transition: "all 0.45s ease 0s" }}>
                        <Slider {...settings}>
                            {renderItem()}
                            {/* <div class="owl-item owl-itemAdjust">
                                <div class="item">
                                    <div class="shadow-effect">
                                        <img class="img-responsive" src={Slider5} alt="" />
                                        <div class="item-details">
                                            <h5>Discoverability</h5>
                                            <p>Reach the right client base for your space through Hubshub and let your target customer know that your space and services are available. Users looking for supply chain solutions can now view your offerings remotely, thus capturing a whole new market for your space.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="owl-item owl-itemAdjust">
                                <div class="item">
                                    <div class="shadow-effect">
                                        <img class="img-responsive" src={Slider6} alt="" />
                                        <div class="item-details">
                                            <h5>Zero Brokerage</h5>
                                            <p>Hubshub doesn't charge any brokerage fees. Now, sit back and enjoy this easy way of renting out your space without paying a hefty brokerage to a middleman. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="owl-item owl-itemAdjust">
                                <div class="item">
                                    <div class="shadow-effect">
                                        <img class="img-responsive" src={Slider7} alt="" />
                                        <div class="item-details">
                                            <h5>Expert Operations Assistance</h5>
                                            <p>Optimise your warehouse space with the guidance of Hubshub’s experts who will help you utilise your space just right. Higher space utilization means higher realization. Hubshub also collaborates with its partners for security and handling services.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="owl-item cloned owl-itemAdjust">
                                <div class="item">
                                    <div class="shadow-effect">
                                        <img class="img-responsive" src={Slider2} alt="" />
                                        <div class="item-details">
                                            <h5>Access to Technology</h5>
                                            <p>Efficiency is of paramount importance to us at Hubshub and we help our partners in this aspect with the latest tools and technology. We link our warehousing partners with our users via a dashboard that gives real-time visibility and status updates.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="owl-item cloned owl-itemAdjust">
                                <div class="item">
                                    <div class="shadow-effect">
                                        <img class="img-responsive" src={Slider3} alt="" />
                                        <div class="item-details">
                                            <h5>Regular Compliance Audits</h5>
                                            <p>Hubshub conducts regular audits for its partners to ensure you stay compliant and that your space remains available for hire without any disruptions. Our experts will work with you to ensure that your warehouse and services meet a certain standard of quality.  </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="owl-item cloned owl-itemAdjust">
                                <div class="item">
                                    <div class="shadow-effect">
                                        <img class="img-responsive" src={Slider4} alt="" />
                                        <div class="item-details">
                                            <h5>Transparent Transactions </h5>
                                            <p>Nothing behind the scenes or under the table here at Hubshub! Transactions are legit, transparent and seamless. This ensures that you get the best possible deal for your property from our users.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="owl-item cloned owl-itemAdjust">
                                <div class="item">
                                    <div class="shadow-effect">
                                        <img class="img-responsive" src={Slider1} alt="" />
                                        <div class="item-details">
                                            <h5>Develop Service Portfolio </h5>
                                            <p>Hubshub works closely with its partners to help you develop a range of value-added services that is bound to attract more business. These services could range from packaging and labeling to managing insurance, manpower and equipment leasing.</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </Slider>
                    </div>
                </div>
                <div class="owl-nav disabled">
                    <button type="button" role="presentation" class="owl-prev"><i class="fa fa-angle-left"></i></button>
                    <button type="button" role="presentation" class="owl-next"><i class="fa fa-angle-right"></i></button>
                </div>
                <div class="owl-dots disabled"></div>
            </div>
        );
    }
}

export default SlideSection2;