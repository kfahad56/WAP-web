/* eslint-disable */
import React, { Component } from 'react';
import './mainslider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from '../images/banner/4.jpg';
import Slider2 from '../images/banner/5.jpg';
import Slider3 from '../images/banner/slider4.jpg';
import rightArrow from '../images/rightArrow.png';
import leftArrow from '../images/rightArrow.png';
import homeCms from '../../cms_pages/home.json';
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
class MainSlider extends Component {
    state = {}

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            focusOnSelect: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className="MainSliderContainer">
                <div className="adjustSlider">
                    <Slider {...settings}>
                        {homeCms.banner_images.map(item => {
                            return <div className="imageContainer">
                                <img src={item.image} alt={item.alt} />
                            </div>
                        })}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default MainSlider;