/* eslint-disable */
import React, { Component } from 'react';
import './faqpage.css';
import '../../components/css/animate.css';
import '../../components/css/bootstrap.css';
import '../../components/css/responsive.css';
import '../../components/css/style.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import vacancies from '../../components/images/faq.jpg';
import * as base from "../../Apis/base";
import Cookie from "js-cookie";
import Accordion from '../../components/Accordion/Accordion';
import $ from 'jquery';
import faq from '../../cms_pages/faq.json';
import home from '../../cms_pages/home.json';
import ReactMarkdown from 'react-markdown';
import { Helmet } from "react-helmet";
class FaqPage extends Component {
    state = {}
    componentDidMount() {
        $(window).scrollTop(0)
        let faqdata = faq
        console.log(faqdata)
    }
    render() {
        return (
            <div className="faqPageContainer">
                <Helmet>
                    <title>{`${faq.seo.title} | Hubshub`}</title>
                    <meta
                        name="description"
                        content={faq.seo.description}
                    />
                    <meta name="keywords" content={faq.seo.keywords} />
                </Helmet>
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                {/* <div className="vacanciesImage">
                    <img src={vacancies} alt="" />
                </div> */}
                <section className="faq">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="faq-list">
                                    <li><a href="#general" className="btn btnAdjust">General</a></li>
                                    <li><a href="#warehouseowner" className="btn btnAdjust">For The Warehouse Owner</a></li>
                                    <li><a href="#warehouseservice" className="btn btnAdjust">For The Warehouse Service Provider</a></li>
                                    <li><a href="#warehouseuser" className="btn btnAdjust">For The Warehouse User</a></li>
                                </ul>
                            </div>
                            <div className="col-md-12">
                                <div id="general">
                                    <div className="sec-head mt-4">
                                        <h2>General</h2>
                                    </div>
                                    <div className="accordion" id="accordion">
                                        {faq.general.map(item => {
                                            return <div className="card">
                                                <div className="card-header collapsed" data-toggle="collapse" href={`#${item.tag}`}>
                                                    <a className="card-link">{item.question}</a>

                                                </div>
                                                <div id={item.tag} className="card-body collapse" aria-labelledby={item.tag} data-parent="#accordion">
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col-md-12" style={{ marginTop: 20 }}>
                                        <ReactMarkdown allowDangerousHtml={true} source={faq.below_general} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="pt-100" id="warehouseowner">
                                    <div className="sec-head mt-4">
                                        <h2>For the Warehouse Owner</h2>
                                    </div>
                                    <div className="accordion" id="accordion1">
                                        {faq.warehouseOwner.map(item => {
                                            return <div className="card">
                                                <div className="card-header collapsed" data-toggle="collapse" href={`#${item.tag}`}>
                                                    <a className="card-link">{item.question}</a>
                                                </div>
                                                <div id={item.tag} className="card-body collapse" aria-labelledby={item.tag} data-parent="#accordion1">
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col-md-12" style={{ marginTop: 20 }}>
                                        <ReactMarkdown allowDangerousHtml={true} source={faq.below_warehouse_owner} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pt-100" id="warehouseservice">
                                    <div className="sec-head mt-4">
                                        <h2>For the Warehouse Service Provider</h2>
                                    </div>
                                    <div className="accordion" id="accordion2">
                                        {faq.warehouseServiceProvider.map(item => {
                                            return <div className="card">
                                                <div className="card-header collapsed" data-toggle="collapse" href={`#${item.tag}`}>
                                                    <a className="card-link">{item.question}</a>
                                                </div>
                                                <div id={item.tag} className="card-body collapse" aria-labelledby={item.tag} data-parent="#accordion2">
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col-md-12" style={{ marginTop: 20 }}>
                                        <ReactMarkdown allowDangerousHtml={true} source={faq.below_warehouse_service_provider} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="pt-100" id="warehouseuser">
                                    <div className="sec-head mt-4">
                                        <h2>For the Warehouse User</h2>
                                    </div>
                                    <div className="accordion" id="accordion3">
                                        {faq.warehouseUser.map(item => {
                                            return <div className="card">
                                                <div className="card-header collapsed" data-toggle="collapse" href={`#${item.tag}`}>
                                                    <a className="card-link">{item.question}</a>
                                                </div>
                                                <div id={item.tag} className="card-body collapse" aria-labelledby={item.tag} data-parent="#accordion3">
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col-md-12" style={{ marginTop: 20 }}>
                                        <ReactMarkdown allowDangerousHtml={true} source={faq.below_warehouse_user} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                    </div>
                </section>
                {/* <div className="faqContentContainer">
                    <h3>General</h3>
                    <Accordion
                        // active={0}
                        collapses={[
                            {
                                title: "What is Hubshub ? How does it work?",
                                // image:{undraw3},
                                content:
                                    "Hubshub is the leading technological partner in warehousing and logistical industry. We provide convenient , simple and reliable services to the industry. We create tailormade solutions for the most common issues using technology interventions, subject matter expertise and best practices. Thousands of Hubshub partners have experienced and continuing to experience the convenience of single platform for all warehousing, logistics needs. You can contact Hubshub to know how we can partner for a symbiotic relationship"
                            },
                            {
                                title: "How will Hubshub provide convenience for my logistics needs?",
                                content:
                                    "Hubshub has a wide geographical coverage from metros to tier 3/4 cities . The platform can provide ready solutions for warehousing needs at distant and varied locations thus reducing the hassles for the user to search for a suitable storage solution in a particular geography. Hubshub has partnered with proven local partners to provide allied services like packaging, last mile delivery, security services, distribution services, etc. All these can be monitored using a single dashboard for added convenience and maintain total control of all logistics needs"
                            },
                            {
                                title: "What Are Hubshub charges?",
                                content:
                                    "Hubshub takes Zero Brokerage. The charges for allied and warehouse services are in line with industry norms in an area and agreed mutually . These prices are benchmarked regularly to provide the most competitive rates. ",
                            },
                            {
                                title: "How does the payment mechanism and billing work?",
                                content: "Hubshub uses prprietary financial software to generate regular invoices. The payment mechanism is thorugh the dashboard and without any human interface.  All data is secured through industry leading SSL technology. Hubshub requests partners to process the invoices within the due dates ."
                            },
                            {
                                title: "What is the hubshub Index",
                                content: "Hubshub index is a patented tool developed by Hubshub. This is a benchmarking tool to grade various warehouses so that the owner and end users can take an informed decision. "
                            },
                            {
                                title: "How can I access my Dashboard?",
                                content: "Use your login credential and click on the name ( Top Right corner) on landing page. Select dashboard in the dropdown."
                            },
                            {
                                title: "I registered on Hubshub and am facing issues with my account",
                                content: "You can check and edit your account from your login dashboard. If the issue still persists, please raise a ticket from My dashboard and we will revert ."
                            },
                            {
                                title: "I was contacted by Hubshub Agent requesting transfer of money to an account. Can I go ahead?",
                                content: "Hubshub will never contact you on phone to make any monetary transfer. Please do not share sensitive information like Account details,passwords,  card numbers and PIN over telephone to anyone . For payments please use our SSL encrypted payment mechanism or use my dashboard to check any payment notices . Hubshub employees will never demand or accept Cash from any of our partners."
                            },
                        ]} />
                    <div>
                        <h3>For the Warehouse Owner</h3>
                        <Accordion
                            // active={0}
                            collapses={[
                                {
                                    title: "How can I list my warehouse on Hubshub?",
                                    content:
                                        "Please click 'Become a Partner'. This Video shows step by step procedure how a Warehouse owner can partner with us. "
                                },
                                {
                                    title: "Can I list more than one warehouse on Hubshub?",
                                    content:
                                        "You can list as many warehouses. The on boarding process is the same for every warehouse. Each listed warehouse on Hubshub is vetted as per a predefined checklist to ensure a level playing field."
                                },
                                {
                                    title: "Are Warehouses subject to any checks?",
                                    content:
                                        "All warehouses are subject to regular audits. In addition Hubshub utilizes a benchmarking process called Hubshub Index . The Hubshub index score determines the audit frequency",
                                },
                                {
                                    title: "I have a part of My warehouse available only . Can I list part warehouse only?",
                                    content: "Our Warehouse on demand service enables warehouse owners to utilize empty / part empty warehouse in the short term. You can get in touch with Hubshub to become an on demand warehouse partner. "
                                },
                                {
                                    title: "Do I need to buy my own insurance policy?",
                                    content: "We recommend mandatory insurance to cover any liabilities arising to the warehouse owner. The requirement for scope and extent of insurance varies with location. Type of warehouse, nature of goods etc. WE also provide assistance through collaboration with leading insurance companies to obtain insurance"
                                },
                                {
                                    title: "Do I need to upgrade my warehouse? Will Hubshub provide a loan?",
                                    content: "Warehouse upgradation as a service is available by Hubshub. IT is known that a type A warehouse earns more revenue as compared to Type B . Hubshub can provide fee based services for warehouse assessment and upgradation if you so desire. WE also have partners who specialize in carrying out the warehouse upgradation in a cost effective and efficient manner. DO get in touch with us in case of any specific query. Hubshub has partners with leading financial and leasing companies who can assist in providing credit for warehouse upgradation."
                                },
                                {
                                    title: "Is there a minimum size of warehouse which can be listed on Hubshub?",
                                    content: "Currently we are partnering with warehouse owners with property sizes more than 3000 sq. feet."
                                },
                                {
                                    title: "How does the billing process work?",
                                    content: "See Billing"
                                },
                                {
                                    title: "Who is in charge of security?",
                                    content: "Warehouse security will be mutually agreed and decided. Hubshub can provide access to security service partners for individual warehouses at competitive rates."
                                }
                            ]} />
                    </div>
                    <div>
                        <h3>For the Warehouse Service Provider</h3>
                        <Accordion
                            // active={0}
                            collapses={[
                                {
                                    title: "How can I provide my services to Warehouses listed on Hubshub?",
                                    content:
                                        "We have a repository of high quality service partners. If You are passionate about the logistics and warehousing industry in India, please contact us to forge a beneficial "
                                },
                                {
                                    title: "How can I register on your platform?",
                                    content:
                                        "Use the Contact us to initiate the query. Our business support executive will respond within 48 hrs."
                                },
                                {
                                    title: "How can Hubshub assist me?",
                                    content:
                                        "AS a Hubshub partner, you get preferential access to wide geographies and customers who wish to utilize your services but may not know . Hubshub is a great platform to engage and build on logistics services and expand your network.",
                                }
                            ]} />
                    </div>
                    <div>
                        <h3>For the Warehouse User</h3>
                        <Accordion
                            // active={0}
                            collapses={[
                                {
                                    title: "How can I select a Warehouse?",
                                    content:
                                        "On Homepage enter the location you wish to search a warehouse or storage solution, Add details of approximate area and expected duration, click search. The page lists all warehouses / storage solutions available at or near the searched location. You can save , share the listing. you can check Out more details like amenities, services, photos of warehouse . you can even request a tour of the location, or reserve the space immediately. if you still have any further questions, please get in touch with us by clicking 'Contact Us'"
                                },
                                {
                                    title: "I like a warehouse . Can I visit it before finalizing?",
                                    content:
                                        "Sure. You can arrange a visit by clicking 'Book a visit'. This service is free of charge."
                                },
                                {
                                    title: "Do you take any brokerage for arranging the warehouse?",
                                    content:
                                        "Hubshub takes zero brokerage from warehouse users. The costing involves value addition to the warehouse & allied services.",
                                },
                                {
                                    title: "I booked a space but Now I need to extend the lease . Will I need to pay the same price",
                                    content: "Hubshub uses Telescopic pricing strategy . The exact price will be determined case to case but will always be in line with benchmarked prices in the location"
                                },
                                {
                                    title: "I had an issue with my goods stored . Whom do I contact?",
                                    content: "You can create a ticket for any issue faced with the goods directly from your dashboard. If your issue is not resolved you can contact your account manager . Details of account manager are available on your dashboard."
                                },
                                {
                                    title: "Do I need insurance for the goods being stored",
                                    content: "We strongly recommend comprehensive insurance commensurate with the quality , quantity and nature of items being stored or transported. Hubshub has partnered with inleading insurance companies and can arrange a suitable quote based on your requirements"
                                },
                                {
                                    title: "I want to store goods at multiple locations can I use a single ID?",
                                    content: "Sure. Using your dashboard, you can manage all the warehouse where you have stored from a single point. "
                                },
                                {
                                    title: "The goods I want to store require a HAZMAT certification. Can Hubshub arrange that?",
                                    content: "Hubshub has a wide variety of warehouses on its platform. You can check the warehouse certifications for specialized handling like Hazmat, HACCP, Bio medical etc. Hubshub recommends following the local government regulations whilst storing and transporting all goods especially specialized goods. "
                                },
                                {
                                    title: "Do I need to provide some security deposit when booking a warehouse",
                                    content: "Hubshub does not require any deposit for Booking a warehouse. The charges are agreed mutually on a case to case basis as per local prevalent norms. Alternate means like bank guarantees etc. are encouraged. "
                                },
                                {
                                    title: "What services are presently available?",
                                    content: "Hubshub is constantly adding new value added services for the convenience of out customers and partners. For a list of additional services available please browse through individual listings . If you need any additional information please do not hesitate to contact us."
                                }
                            ]} />
                    </div>
                </div> */}
                <Footer />
            </div>
        );
    }
}

export default FaqPage;