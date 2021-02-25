import React, { Component } from 'react';
import './aboutslidercard.css';
import meeting from '../images/meeting.png';
class AboutSliderCard extends Component {
    state = {}
    render() {
        return (
            <div className="aboutSliderCardContainer">
                <div className="leftSection">
                    <div className="SliderImage">
                        <img src={meeting} alt="" />
                    </div>
                </div>
                <div className="rightSection">
        <h3>{this.props.title}</h3>
        <p>{this.props.des}</p>
                </div>
            </div>
        );
    }
}

export default AboutSliderCard;