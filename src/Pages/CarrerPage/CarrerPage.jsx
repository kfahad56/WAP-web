/* eslint-disable */
import React, { Component } from 'react';
import './carrerpage.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import VacanciesButton from '../../components/VacanciesButton/VacanciesButton';
import incase from '../../components/images/career.svg';
import vacancies from '../../components/images/vacancies.jpg';
import TextField from '@material-ui/core/TextField';
import BackButton from '../../components/BackButton/BackButton';
import illustration from '../../components/images/mail_sent.svg'
import { Popup } from '../../components/Popup/Popup';
import * as base from "../../Apis/base";
import * as careerAPI from '../../Apis/career';
import Cookie from "js-cookie";
import img from '../../components/images/careerimage.png'
import $ from 'jquery'
import Loader from "react-loader-spinner";
import { Helmet } from "react-helmet";
import * as cmsData from "../../cms_pages/career.json"
import ReactMarkdown from 'react-markdown';
class CarrerPage extends Component {
    state = {
        fullName: "",
        Email: "",
        experience: "",
        jobType: "",
        mobile_no: "",
        jobTypeData: [
            "Select your type",
            "Full Time",
            "Part Time"
        ],
        vacanciesPart1: true,
        vacanciesPart2: false,
        error: "",
        fileSelected: "",
        cv: "",
        status: "",
        isPopupOpen: false,
        responseData: []
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value, error: "" });
    };
    attachCv = (e) => {
        e.preventDefault();
        this.setState({ cv: e.target.files[0] })
    }
    handleChange2 = (e) => {
        if (isNaN(e.target.value)) {
            return;
        }
        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
        this.setState({ [e.target.name]: onlyNums, error: "" });
    };
    submit = () => {
        this.setState({ isLoading: true })
        // let errors = []
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.Email)
        if (!(this.state.fullName.length > 0)) this.setState({ error: 'Full Name Cannot Be Empty' })
        else if (!(this.state.Email.length > 0)) this.setState({ error: 'Email Cannot Be Empty' })
        else if (!regex) this.setState({ error: 'Enter a valid email' })
        else if (!(this.state.experience.length > 0)) this.setState({ error: 'Experience Cannot Be Empty' })
        else if (!(this.state.jobType.length > 0)) this.setState({ error: 'Job type Cannot Be Empty' })
        else if (!(this.state.mobile_no.length === 10)) this.setState({ error: 'Mobile Number Cannot Be Empty and should be 10 digits' })
        else if (isNaN(Number(this.state.mobile_no))) this.setState({ error: "Please enter a valid Phone number" })
        else if (!(this.state.cv.length > 0)) this.setState({ error: 'Please upload your cv' })
        let formData = new FormData()
        formData.append('full_name', this.state.fullName),
            formData.append('email_id', this.state.Email),
            formData.append('experience', this.state.experience),
            formData.append('job_type', this.state.jobType),
            formData.append('mobile', this.state.mobile_no),
            formData.append('cv', this.state.cv)
        careerAPI.career(
            formData,
            (json, status) => {
                this.setState({
                    isLoading: false,
                    status: status,
                    isPopupOpen: true,
                    responseData: json,
                    fullName: '',
                    Email: '',
                    experience: '',
                    jobType: '',
                    mobile_no: '',
                    cv: '',
                    error: ''
                })
                if (this.state.status === 502) {
                    this.setState({ error: "Some Error Occured Try Again" })
                    return;
                }
                $('#attach').val('')
            },
            (errors) => {
                return this.setState({ error: errors[0] })
            }
        )
    }
    componentDidMount() {
        $(window).scrollTop(0)
        // $('.attachCVText').on('click', function () {
        //     $('#attach').trigger('click');
        // });
        // $('input[type="file"]').change(function (e) {
        //     let fileName = e.target.files[0].name;
        //     $('.fileSelected').text(`The file ${fileName} has been selected.`)
        // });
    }
    componentDidUpdate() {
        if (this.state.error !== "") {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        }
    }
    render() {
        return (
            <div className="carrerPageContainer">
                <Helmet>
                    <title>{cmsData.seo.title}</title>
                    <meta
                        name="description"
                        content={cmsData.seo.description}
                    />
                    <meta
                        name="keywords"
                        content={cmsData.seo.keywords}
                    />
                </Helmet>
                {this.state.isPopupOpen ?
                    <Popup
                        illustration={illustration}
                        text="Email has been sent, Thank you!"
                        handleClose={() => this.setState({ isPopupOpen: false })}
                        isPopupOpen={this.state.isPopupOpen}
                    /> : <React.Fragment />}
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                {this.state.vacanciesPart1 ? <React.Fragment>
                    {/* <div className="carrerContentSection">
                        <div className="leftSection">
                            <h3>Hubshub Values</h3>
                            <p>Hubshub is an equal opportunities provider. We are a technology oriented company leveraging the modern technological tools to improve efficiencies in the current logistics industry.</p>
                        </div>
                        <div className="rightSection">
                            <div className="carrerImage">
                                <img src={img} alt="" />
                            </div>
                        </div>
                    </div> */}
                    <section className="about">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    <div className="content">
                                        <div className="sec-head">
                                            <h2>Opportunities at Hubshub</h2>
                                        </div>
                                        {/* <p>Hubshub is an equal opportunities employer. We are a technology-oriented company looking to disrupt the warehousing and logistics solutions space in India. Explore the vacancies below to join us on this enriching journey!</p> */}
                                        <p><ReactMarkdown>{cmsData.opportunities_at_hubshub.description}</ReactMarkdown></p>
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <img src={cmsData.opportunities_at_hubshub.image.image} className="w-100" alt={cmsData.opportunities_at_hubshub.image.alt} />
                                    {/* <img src={img} className="w-100" alt="" /> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <div className="parahSection">
                        <div className="titleText">Need content from client</div>
                        <div className="parahText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </div> */}
                    <section className="ourvalues">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <div className="sec-head">
                                        <h2>Vacancies</h2>
                                    </div>
                                </div>
                                {cmsData.vacancies.map(item => {
                                    return <div className="col-md-4">
                                        <div className="vacan">
                                            <div>
                                                <h3>{item.type}</h3>
                                            </div>
                                        </div>
                                    </div>
                                })}
                                {/* <div className="col-md-4">
                                    <div className="vacan">
                                        <div>
                                            <h3>Key Account Manager</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="vacan">
                                        <div>
                                            <h3>Accountant</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="vacan">
                                        <div>
                                            <h3>Content Editor</h3>
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="col-md-4">
                                    <div className="vacan">
                                        <div style={{ cursor: "pointer" }}>
                                            <h3>Account Manager</h3>
                                            <p>View more details</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="vacan">
                                        <div style={{ cursor: "pointer" }}>
                                            <h3>Store Keeper</h3>
                                            <p>View more details</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="vacan">
                                        <div style={{ cursor: "pointer" }}>
                                            <h3>Business Development</h3>
                                            <p>View more details</p>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </section>
                    {/* <div className="vacanciesContainer">
                        <h3>Vacancies</h3>
                        <div className="vacanciesTabContainer">
                            <VacanciesButton headText="Bussiness Development" />
                            <VacanciesButton headText="Accounts Manager" onClick={() => this.setState({ vacanciesPart2: true, vacanciesPart1: false })} />
                            <VacanciesButton headText="Accounts Manager" onClick={() => this.setState({ vacanciesPart2: true, vacanciesPart1: false })} />
                            <VacanciesButton headText="Bussiness Development" onClick={() => this.setState({ vacanciesPart2: true, vacanciesPart1: false })} />
                            <VacanciesButton headText="Accounts Manager" onClick={() => this.setState({ vacanciesPart2: true, vacanciesPart1: false })} />
                            <VacanciesButton headText="Accounts Manager" onClick={() => this.setState({ vacanciesPart2: true, vacanciesPart1: false })} />
                        </div>
                    </div> */}
                    <section class="about">
                        <div class="container">
                            <div class="row ">
                                <div class="col-md-6">
                                    <div class="contact-inner contact-inner1">
                                        <h2>Did not Find Your Perfect Fit?</h2>
                                        <p>Leave us your details here and we'll get in touch when a relevant opportunity comes up!</p>
                                        <form>
                                            <div class="mail">
                                                <input type="text" id="fullName" value={this.state.fullName}
                                                    onChange={this.handleChange}
                                                    onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.submit()
                                                        }
                                                    }}
                                                    name="fullName" />
                                                <label>Full Name</label>
                                            </div>

                                            <div class="mail">
                                                <input type="text" id="emailId" value={this.state.Email}
                                                    onChange={this.handleChange}
                                                    onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.submit()
                                                        }
                                                    }}
                                                    name="Email" />
                                                <label>Email Address</label>
                                            </div>

                                            <div class="mail">
                                                <input type="text" id="experience" value={this.state.experience}
                                                    onChange={this.handleChange2}
                                                    onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.submit()
                                                        }
                                                    }}
                                                    name="experience" />
                                                <label>Enter years of experience </label>
                                            </div>

                                            <div class="mail">
                                                <select name="cars" id="jobType" value={this.state.jobType}
                                                    onChange={this.handleChange}
                                                    onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.submit()
                                                        }
                                                    }}
                                                    name="jobType">
                                                    {this.state.jobTypeData.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                <label>Job Type</label>
                                            </div>

                                            <div class="mail">
                                                <input type="text" id="phoneNo" value={this.state.mobile_no}
                                                    name="mobile_no"
                                                    onChange={this.handleChange2} onKeyPress={(event) => {
                                                        if (event.key === "Enter") {
                                                            this.state.isLoading ? "" : this.submit()
                                                        }
                                                    }} maxLength="10" />
                                                <label>Phone No.</label>
                                            </div>

                                            <div class="mail">
                                                <input type="file" id="attach" onChange={this.attachCv} accept="application/pdf" />
                                                <label>Attch CV</label>
                                            </div>
                                            <div className="error">{this.state.error}</div>
                                            {this.state.isLoading ? (
                                                <div className="loader">
                                                    <Loader
                                                        type="TailSpin"
                                                        color="#0055FF"
                                                        height={60}
                                                        width={60}
                                                    />
                                                </div>
                                            ) : null}
                                            <div class="mail">
                                                <div tabIndex="0" class={this.state.isLoading ? "btn mb-2 btn2 btn-disabled" : "btn mb-2 btn2"} onClick={() => { this.state.isLoading ? "" : this.submit() }} onKeyPress={(event) => {
                                                    if (event.key === "Enter") {
                                                        this.state.isLoading ? "" : this.submit()
                                                    }
                                                }}>Submit</div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div class="col-md-1"></div>
                                <div class="col-md-5">
                                    <img src={incase} class="w-100 team-up" alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment> : <React.Fragment />}
                {this.state.vacanciesPart2 ? <React.Fragment>
                    <h1 className="pt-100" style={{ textAlign: "center", marginBottom: "100px" }}>No Vacancies Available</h1>
                </React.Fragment> : <React.Fragment />}
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
            </div>
        );
    }
}

export default CarrerPage;