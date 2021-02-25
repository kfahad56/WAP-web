import React, { Component } from 'react';
import './warehouseslider.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rightArrow from '../images/rightArrow.png';
import * as warehouseAPI from '../../Apis/Warehouse';
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
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none", background: "green" }}
            onClick={onClick}
        />
    );
}
class WarehouseSlider extends Component {
    state = {
        nav1: null,
        nav2: null,
        getImages: []
    }
    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
        warehouseAPI.getWarehouseById(this.props.data, (data) => {
            // console.log(data)
            this.setState({ getImages: data.images })
        }, () => { }, () => { })
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: this.state.getImages.length === 1 ? 1 : 2,
            slidesToScroll: 1,
            focusOnSelect: false,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className="warehouseSliderContainer">
                <div className="adjustSlider">
                    <Slider {...settings} asNavFor={this.state.nav2}
                        ref={slider => (this.slider1 = slider)}
                    >
                        {this.state.getImages.map(item => {
                            return <div className="imageContainer">
                                <img src={item.file} alt="" />
                                <div className="imageDesc">{item.description}</div>
                            </div>
                        })}
                    </Slider>
                </div>
                <div className="adjustSlider2">
                    <Slider asNavFor={this.state.nav1}
                        ref={slider => (this.slider2 = slider)}
                        slidesToShow={this.state.getImages.length}
                        swipeToSlide={true}
                        focusOnSelect={true}
                    >
                        {this.state.getImages.map(item => {
                            return <div className="thumbImageContainer">
                                <img src={item.file} alt="" />
                            </div>
                        })}
                    </Slider>
                </div>
            </div >
        );
    }
}

export default WarehouseSlider;