/* eslint-disable */
import React, { Component } from 'react';
import './blog.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import BlogCard from '../../components/BlogCard/BlogCard';
import blogmeeting from '../../components/images/blogmeeting.jpg';
import search from '../../components/images/search.png';
import Data from './data';
import $ from "jquery";
import blogCms from '../../cms_pages/blog.json';
import Cookie from "js-cookie";
import { NavLink } from 'react-router-dom';
import * as base from "../../Apis/base";
import { Helmet } from "react-helmet";
class Blog extends Component {
    state = {
        blogIndex: "",
        Email: ""
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    };
    componentDidMount() {
        $(window).scrollTop(0)

    }
    render() {
        return (
            <div className="blogContainer">
                <Helmet>
                    <title>{blogCms.seo.title}</title>
                    <meta
                        name="description"
                        content={blogCms.seo.description}
                    />
                    <meta
                        name="keywords"
                        content={blogCms.seo.keywords}
                    />
                </Helmet>
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                {/* <div className="blogSearchContainer">
                    <div className="blogText">Blogs by hubshub</div>
                </div> */}
                <section class="blogs">
                    <div class="container">
                        <div class="row">
                            <div class="sec-head mt-4">
                                <h2>Latest Blogs and News</h2>
                            </div>
                        </div>
                        <div class="row mt-4">
                            {blogCms.blog_data.map(item => {
                                return <div class="col-md-4 mb-3">
                                    <NavLink to={`/blogs/${item.url}`}><BlogCard imgSRC={item.blog_image.image} alt={item.blog_image.alt} Text={item.text} subtext={item.sub_text} desc={item.description} /></NavLink>
                                </div>
                            })}
                        </div>
                    </div>
                </section>
                {/* <div className="latestBlogsContainer">
                    <h3>Latest Blogs and News</h3>
                    <div className="blogDataContainer">
                        {Data.map((item, index) => {
                            return <NavLink to={`/blogs/${item.url}`}><BlogCard imgSRC={item.img} Text={item.Text} subtext={item.subtext} desc={item.desc} /></NavLink>
                        })}
                    </div>
                    <div className="nextButtonContainer">
                        <div className="numberButton">
                            <div className="numberText">1</div>
                        </div>
                        <div className="numberButton">
                            <div className="numberText">2</div>
                        </div>
                        <div className="numberButton">
                            <div className="numberText">3</div>
                        </div>
                    </div>
                </div> */}
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
            </div>
        );
    }
}

export default Blog;