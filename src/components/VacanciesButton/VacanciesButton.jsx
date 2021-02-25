import React, { Component } from 'react';
import './vacanciesbutton.css';
class VacanciesButton extends Component {
    state = {}
    render() {
        return (
            <div className="vacanciesButtonContainer" onClick={this.props.onClick}>
                <div className="vacanciesHeadText">{this.props.headText}</div>
                <div className="viewMoredetails">View more details</div>
            </div>
        );
    }
}

export default VacanciesButton;