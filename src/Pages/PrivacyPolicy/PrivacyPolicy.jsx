/* eslint-disable */
import React, { Component } from 'react';
import './privacypolicy.css';
import Header from '../../components/header/Header';
import Footer from '../../components/myFooter/Footer';
import * as base from "../../Apis/base";
import Cookie from "js-cookie";
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
class PrivacyPolicy extends Component {
    state = {}
    componentDidMount() {
        $(window).scrollTop(0)
    }
    render() {
        return (
            <div className="privacyPolicyContainer">
                {Cookie.get(base.customerName) ? <Header activeName={true} /> : <Header SignIn={true} />}
                <section class="faq">
                    <div class="container">
                        <div class="sec-head mt-4">
                            <h2>Privacy Policy</h2>
                        </div>
                        <div class="row">
                            <div class="col-md-12 privacy">
                                <p>We, WAP Technology Service India Private Limited, incorporated under the Companies Act, 1956/2013 (hereinafter referred to as “Company”), having registered office at House No. 36, Mohan Nagar, Durg, CT 491001, India, the creator of this Privacy Policy ensure our firm commitment to your privacy vis-à-vis the protection of your priceless information. In order to endow you with our uninterrupted use of services, we may collect and, in some circumstances, disclose information about you. To enhance better protection of your privacy we provide this notice explaining our information practices and the choices you can make about the way your information is collected and used.</p>
                                <p>All visitors to <a href={`${base.public_url}`}> www.WAP.in </a>(Website) are advised to read and understand our Privacy Policy carefully, as by accessing the Website you agree to be bound by the terms and conditions of the Privacy Policy and consent to the collection, storage and use of information relating to you as provided herein.</p>
                                <p>If you do not agree with the terms and conditions of our Privacy Policy, including in relation to the manner of collection or use of your information, please do not use or access the Site.</p>
                                <p>If you have any questions or concerns regarding this privacy policy, you should contact our customer support desk at <a href={`${public_url}`}> www.WAP.in </a></p>
                                <h4>1. Definitions:</h4>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	“We”, “Our”, and “Us” shall mean and refer to the creators of this privacy policy.</li><br />
                                    <li><b>b.</b>	“You”, “Your”, “Yourself” and “User” shall mean and refer to natural and legal individuals including service providers and service seekers who use the Website.</li><br />
                                    <li><b>c. </b>Website” shall mean and refer to <a href={`${public_url}`}> www.WAP.in </a> created by Us. </li><br />
                                    <li><b>d.</b>	“Personal Information” shall mean and refer to any personally identifiable information that We may collect from You.	</li><br />
                                    <li><b>e.</b>	“Third Parties” refer to any website, company or individual apart from the User and the creator of the Website.</li><br />
                                    <li><b>f.</b>	“Services” shall mean the services provided by the Company on the Website.</li><br />
                                </ul>

                                <h4>2.	The Information that is collected</h4>
                                <p>When You sign up for a WAP Technology account and want to avail the services that are offered by our Website, we safely store all the information that is provided by You in accordance with applicable laws. We make use of an order form whereby we provide the opportunity to our customers to request for information, products &amp; services. We also collect the contact information (email address &amp; mobile number) of our visitors along with the financial information (credit card &amp; debit card). The financial information is not stored by us WAPtsoever. We use contact information to send orders to the customers along with the information of our entity. The information can also be used to communicate with the customers, as and when need arises. The mailing and promotional calls can be stopped by the user if required by following the steps given in Choice/Opt-out below.</p>
                                <p>The information of Your browser along with Your IP address is stored in the form of “cookie”. This makes it easy for us to identify You and the shopping cart with added products &amp; services. Cookie is a tiny data file which is store in Your hard drive. Cookie file neither read stored in Your hard drive nor read the other cookie file. You can reject the storage of the cookie in Your hard drive by simply switching off this option in Your browser. For purchasing, it’s not necessary to switch on the cookie in the browser option.</p>
                                <p>A cookie is a piece of software code that an internet website sends to Your browser when you access information at that site. A cookie is stored as a simple text file on Your computer or mobile device by a website’s server and only that server will be able to retrieve or read the contents of that cookie. Cookies let you navigate between pages efficiently as they store your preferences, and generally improve Your experience of a website. <a href={`${public_url}`}> www.WAP.in</a> may use following types of cookies to enhance Your experience and interactivity:</p>

                                <h4>DOES WAP CONSOLIDATE PERSONAL INFORMATION?</h4>
                                <p>WAP may consolidate the personal information of customers who use WAP Web sites. We use this information to help us better design WAP Web sites and WAP products, to communicate information to you, to enhance our marketing and research activities, and to facilitate other business functions.</p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	Analytics cookies for anonymously remembering your computer or mobile device when You visit our Website to keep track of browsing patterns.</li><br />
                                    <li><b>b.</b>	Service cookies for helping us to make our Website work efficiently, remembering Your registration and login details, settings preferences, and keeping track of the pages You view.</li><br />
                                    <li><b>c.</b>	Non-persistent cookies a.k.a per-session cookies. Per-session cookies serve technical purposes of providing seamless navigation. These cookies do not collect personal information on users and they are deleted as soon as You leave our website. The cookies do not permanently record data and they are not stored on Your computer’s hard drive. The cookies are stored in memory and are only available during an active browser session. Again, once You close your browser, the cookie disappears.</li><br />
                                </ul>
                                <h4>3.	Uses of the collected information</h4>
                                <p>In order to improve the online customer experience, WAP Technology makes use of the information collected. Thus, when You sign in, it authenticates You and send notification through email. Your request can be fulfilled for different product
                                &amp; services. We will use the information for sending order confirmations, dispatch confirmation and other communication that we may need to have with You in the process of the transaction. Information is also used for capturing data insights for internal and external clients and can be used by WAP Technology to fulfil orders, improve overall User experience. You consent to us sending you emails/SMS updates of our products/services from time to time either directly or through third party service providers. You may always opt out of such marketing updates at a later point in time. All such information solely belongs to WAP Technology.</p>

                                <h4>4.	Sharing of Information</h4>
                                <p>You can be assured that WAP Technology does not believe in sharing any personal information with any individual, company or organization. Information is only shared if we have consent from Your end.</p>
                                <p>We from time to time engage with reliable third parties that also accept our terms &amp; conditions and sign a confidentiality agreement to bolster the confidentiality requirements. These third parties are engaged to improve Your experience and for advertising, primarily.</p>
                                <p>We also undertake to respond to court orders or any other legal processes in order to exercise or establish the legal rights for defending any claims.</p>
                                <p>We may also disclose the information of those customers who may come in terms of suspicion for any fraud or illegal transaction. Then their information will be used for legal processes or investigation by the court.</p>
                                <p>This Website may have pop-ups of other websites and the information given to them is not our responsibility. Our Website may contain links to other websites s. Our terms, privacy policy applies only to our Website. If You click on a link to another website, you are requested to read their privacy policy, terms.</p>

                                <h4>5.	Data integrity</h4>
                                <p>WAP Technology collected the customer’s personal information and processes it in accordance with the privacy policy. We ensure that the data we collected, stored for different process practices needed to provide the meaningful online service to You. Thus, we request You to provide the data as accurate as possible.</p>

                                <h4>6.	Security &amp; Confidentiality</h4>
                                <p>WAP Technology restricts access of the personal information to the employees, moderator, contractors and agents for updates, delivery and for improvement of the product and services. They have to abide to the confidentiality agreement failing which they will be terminated.</p>
                                <p>We make use of the best security measures for the protection against the misuse, loss of information that is under our control. We go through the SSL secure commerce server which uses the military grade encryption to protect all the information with specific codes. Each customer is important to us and We consider their approval with due respect.</p>

                                <h4>7.	Choice/Opt-out</h4>
                                <p>Customers can unsubscribe the email at any point of time according to their desire by following the suggestion given at the bottom of the WAP Technology email/newsletter.</p>

                                <h4>8.	Your data protection rights include:</h4>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	The right to access – You have the right to request WAP Technology for copies of your personal data. We may charge you a small fee for this service.</li><br />
                                    <li><b>b.</b>	The right to rectification – You have the right to request that WAP Technology correct any information you believe is inaccurate. You also have the right to request WAP Technology to complete the information you believe is incomplete.</li><br />
                                    <li><b>c.</b>	The right to erasure – You have the right to request that WAP Technology erase your personal data, under certain conditions.</li><br />
                                    <li><b>d.</b>	The right to restrict processing – You have the right to request that WAP Technology restrict the processing of your personal data, under certain conditions.</li><br />
                                    <li><b>e.</b>	The right to object to processing – You have the right to object to WAP Technology’s processing of your personal data, under certain conditions.</li><br />
                                    <li><b>f.</b>	The right to data portability – You have the right to request that WAP Technology transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li><br />
                                </ul>

                                <h4>9.	Changes to our policy</h4>

                                <p>We keep our privacy policy and terms and conditions under regular review and place any updates on the Website and Application. This policy and the terms were last updated on Sept 25, 2020</p>
                                <h4>10.	Contacting WAP Technology</h4>
                                <p>If there are any changes that You would like to make in Your current information, then do remove Your previous contact details so that You don’t get any updates in Your old contacts. You can also be with us through the following contacts:</p>
                                <p>Email: <a href="mailto:contact@WAP.in"> contact@WAP.in</a></p>
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

export default PrivacyPolicy;