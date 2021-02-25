/* eslint-disable */
import React, { Component } from 'react';
import './cardview.css';
import whiteArrow from '../images/whiteArrow.png';
import eye from '../images/eye.png';
import Skeleton from 'react-loading-skeleton';

class CardView extends Component {
    state = {}
    render() {
        return (
            <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="storage-inner">
                    <div className="storage-inner-image-adjust">
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
            // <div className={"cardViewContainer " + this.props.className}>
            //     <div className="cardImage">
            //         {
            //             this.props.imgSRC ?
            //                 <img src={this.props.imgSRC} alt="" /> :
            //                 <Skeleton style={{
            //                     width: "100%",
            //                     height: "100%"
            //                 }} />
            //         }
            //     </div>
            //     <div className="cardBottomContainer">
            //         <div className="cardText">
            //             <div>{this.props.title || <Skeleton />}</div>
            //             <div>{this.props.location || <Skeleton />}</div>
            //         </div>
            //         {this.props.whiteArrow && <div onClick={this.props.onArrowClick} className="rightArrowContainer">
            //             <div className="rightButton">
            //                 <img src={whiteArrow} alt="" />
            //             </div>
            //         </div>}
            //         {this.props.eye && <div className="eyeContainer">
            //             <div className="eyeButton">
            //                 <img src={eye} alt="" />
            //             </div>
            //         </div>}
            //     </div>
            // </div>
        );
    }
}

export default CardView;