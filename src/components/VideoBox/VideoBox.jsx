/* eslint-disable */
import React, { Component } from 'react';
import './videobox.css';
class VideoBox extends Component {
    state = {}
    render() {
        return (
            <div className="col-md-6">
                <p>{this.props.videoHeading}</p>
                <iframe src="https://www.youtube.com/embed/FtPLY0HbNgc" width="500px" height="325px" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            </div>
            // <div className={"videoBoxContainer " + this.props.className}>
            //     <div className="videoText">{this.props.videoHeading}</div>
            //     <div className="videoSection">
            //         <div className="videoImage">
            //             <iframe src="https://www.youtube.com/embed/FtPLY0HbNgc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default VideoBox;