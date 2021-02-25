import React, { Component } from 'react';
import './imagetexttile.css';
class ImageTextTile extends Component {
    state = {}
    render() {
        return (
            <div className="ImageTextTileContainer">
                <div className="imageArea">
                    {this.props.icon}
                </div>
                <div className="textArea">{this.props.textArea}</div>
            </div>
        );
    }
}

export default ImageTextTile;