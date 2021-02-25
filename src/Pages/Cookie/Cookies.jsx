import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import * as base from "../../Apis/base";
import Cookie from "js-cookie";
import './cookie.css';
import $ from 'jquery';
class Cookies extends Component {
    state = {}
    componentDidMount() {
        $(window).scrollTop(0)
    }
    render() {
        return (
            <div className="cookieContainer">
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                <section class="faq">
                    <div class="container">
                        <div class="sec-head mt-4">
                            <h2>Generic Cookie Policy Template</h2>
                        </div>
                        <div class="row">
                            <div class="col-md-12 privacy">
                                <p>Please read this cookie policy (cookie policy, policy) carefully before using [website] website (“website”, "service") operated by [name] (us, we, our).</p>
                                <h4>What are cookies?</h4>
                                <p>Cookies are simple text files that are stored on your computer or mobile device by a website’s server. Each cookie is unique to your web browser. It will contain some anonymous information such as a unique identifier, website’s domain name, and some digits and numbers.</p>
                                <h4>What types of cookies do we use?</h4>
                                <h5>Necessary cookies</h5>
                                <p>Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our website and using its features. For example, these cookies let us recognize that you have created an account and have logged into that account.</p>
                                <h5>Functionality cookies</h5>
                                <p>Functionality cookies let us operate the site in accordance with the choices you make. For example, we will recognize your username and remember how you customized the site during future visits.</p>
                                <h5>Analytical cookies</h5>
                                <p>These cookies enable us and third-party services to collect aggregated data for statistical purposes on how our visitors use the website. These cookies do not contain personal information such as names and email addresses and are used to help us improve your user experience of the website.</p>
                                <h4>How to delete cookies?</h4>
                                <p>If you want to restrict or block the cookies that are set by our website, you can do so through your browser setting. Alternatively, you can visit <a target="_blank" rel="noopener noreferrer" href="https://www.internetcookies.org">www.internetcookies.org</a>, which contains comprehensive information on how to do this on a wide variety of browsers and devices. You will find general information about cookies and details on how to delete cookies from your device.</p>
                                <h4>Contacting us</h4>
                                <p>If you have any questions about this policy or our use of cookies, please contact us.</p>
                                <p><a href="mailto:contact@WAP.in">Email: contact@WAP.in</a></p>
                            </div>
                        </div>
                    </div>
                </section>
                <button class="btn faqBtn shadow" onClick={() => $(window).scrollTop(0)}><i class="fas fa-chevron-up mr-1"></i></button>
                <Footer />
            </div>
        );
    }
}

export default Cookies;