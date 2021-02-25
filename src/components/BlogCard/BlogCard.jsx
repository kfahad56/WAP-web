/* eslint-disable */
import React, { Component } from 'react';
import './BlogCard.css';
import BlogButton from '../BlogButton/BlogButton';
import business from '../images/business.png';
class BlogCard extends Component {
    state = {}
    render() {
        return (
            <div className="blog">
                <div className="blog-img">
                    <img src={this.props.imgSRC} className="w-100" alt={this.props.alt} />
                </div>
                <div className="blog-text">
                    <h4>{this.props.Text}</h4>
                    <h5>{this.props.subtext}</h5>
                    <p>{this.props.desc}</p>

                    <a onClick={this.props.onClick} tabIndex="0" className="btn"> Read More <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
            // <div className="blogCardContainer" onClick={this.props.onClick}>
            //     <div className="blogImage">
            //         <img src={this.props.imgSRC} alt="" />
            //     </div>
            //     <h2>{this.props.Text}</h2>
            //     <h4>{this.props.subtext}</h4>
            //     <p>{this.props.desc}</p>
            // </div>
        );
    }
}

export default BlogCard;