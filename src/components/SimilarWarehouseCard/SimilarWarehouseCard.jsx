import React, { Component } from 'react';
import './similarwarehousecard.css';
import Skeleton from 'react-loading-skeleton';
class SimilarWarehouseCard extends Component {
    state = {}
    render() {
        return (
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="similarCard">
                    <div className="cardImage">
                        {
                            this.props.imgSRC ?
                                <img src={this.props.imgSRC} alt="" /> :
                                <Skeleton style={{
                                    width: "100%",
                                    height: "100%"
                                }} />
                        }
                    </div>
                    <div className="storage-cap">
                        <h3>{this.props.title || <Skeleton />}</h3>
                        <p>{this.props.location || <Skeleton />}</p>
                        {this.props.whiteArrow && <div onClick={this.props.onArrowClick} className="btn explore">Explore <i className="fa fa-long-arrow-right"></i></div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default SimilarWarehouseCard;