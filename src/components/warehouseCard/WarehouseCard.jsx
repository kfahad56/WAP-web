/* eslint-disable */
import React, { Component } from 'react';
import './warehousecard.css';
// import top20 from '../images/top20.png';
import heart from '../images/heart.png';
import selectHeart from '../images/selectedHeart.png';
import whatsapp from '../images/whatsapp.svg';
import mail from '../images/gmail.svg';
import whiteArrow from '../images/whiteArrow.png';
import { NavLink } from 'react-router-dom';
import * as shortlistedWarehouseAPI from '../../Apis/Warehouse';
import * as baseAPI from '../../Apis/base';
import BlogButton from '../BlogButton/BlogButton';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import { Redirect } from 'react-router';
import { EmailShareButton, WhatsappShareButton } from 'react-share';
class WarehouseCard extends Component {
    state = {
        enquire: false,
        selectedHeart: false,
        isLoading: false,
        highlight: false,
        redirect: false,
        shareURL: "https://share.hubshub.in/warehouse/"
    }
    shortlistedClick = () => {
        // Add Popup For Anonymous User
        if (!baseAPI.isLogin()) {
            this.props.history.push('/login')
            return;
        }
        this.setState({ isLoading: true })

        shortlistedWarehouseAPI.shortlistedWarehouse(
            this.props.data.warehouseVersionId,
            () => {
                this.setState({ selectedHeart: !this.state.selectedHeart, isLoading: false })
            },
            () => { }
        )
    }
    // stopBubbling = (evt) => {
    //     evt.stopPropagation();
    //     evt.cancelBubble = true;
    // }
    handleOnClick = (e) => {
        e.preventDefault();
        this.setState({ redirect: true });
    }
    componentDidMount = () => {
        this.setState({ selectedHeart: this.props.data.shortlisted })
        // this.stopBubbling()
    }
    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/viewwarehouse/${this.props.data.warehouseVersionId}`} />
        }
        return (
            // <div
            //     id={"warehouse-card-" + this.props.id}
            //     onClick={() => this.props.onHover(!this.props.data.highlight)}
            //     onMouseOver={() => this.props.onHover(true)}
            //     onMouseLeave={() => this.props.onHover(false)}
            //     className={this.props.data.highlight ? "warehouseCardContainer highlight" : "warehouseCardContainer"}
            // >
            //     <div className="leftPart">
            //         <div className="warehouseImage">
            //             <NavLink to={`/viewwarehouse/${this.props.data.warehouseVersionId}`}><img src={this.props.data.image.file} alt="" /></NavLink>
            //         </div>
            //         <div className="heartImageContainer" onClick={() => this.state.isLoading ? {} : this.shortlistedClick()}>
            //             <div className="heartImage">
            //                 {this.state.selectedHeart ? <img src={selectHeart} alt="" /> : <img src={heart} alt="" />}
            //             </div>
            //         </div>
            //     </div>
            //     <div className="whatsappImage">
            //         <a href={`whatsapp://send?text=https://hubshub.in/viewwarehouse/${this.props.data.warehouseVersionId}`} title="Share by Whatsapp" data-action="share/whatsapp/share"><WhatsAppIcon /></a>
            //     </div>

            //     <div className="mailImage">
            //         <a href={`mailto:?subject=I wanted you to check this warehouse&body=Check this https://hubshub.in/viewwarehouse/${this.props.data.warehouseVersionId}`} title="Share by Email"> <EmailIcon /></a>
            //     </div>
            //     <NavLink to={`/viewwarehouse/${this.props.data.warehouseVersionId}`}><div className={"rightpart"}>
            //         <div className="dataTopContainer">
            //             <h3>{this.props.data.name}</h3>
            //             <div className="enquireButton" onClick={this.props.onClick}>
            //                 <div>Enquire</div>
            //             </div>
            //         </div>
            //         <div className="secondText">{this.props.data.state}</div>
            //         <div className="tagsContainer">
            //             {this.props.services.map((item, index) => {
            //                 if (index < 6) {
            //                     return <BlogButton tags={item.name} />
            //                 }
            //             })}
            //             {this.props.services.length > 4 && <BlogButton tags="+" onClick={() => this.props.history.push(`/viewwarehouse/${this.props.data.warehouseVersionId}`)} />}
            //         </div>
            //     </div></NavLink>
            // </div>
            <div className={this.props.data.highlight ? "course highlight" : "course"} id={"warehouse-card-" + this.props.id}
                onClick={() => this.props.onHover(!this.props.data.highlight)}
                onMouseOver={() => this.props.onHover(true)}
                onMouseLeave={() => this.props.onHover(false)}
            >
                <div className="course-preview">
                    <div className="imageAdjustContainer">
                        <NavLink to={`/viewwarehouse/${this.props.data.warehouseVersionId}`}><img src={this.props.data.image.file} className="w-100" /></NavLink>
                    </div>
                    <div className="heartImageContainer" onClick={() => this.state.isLoading ? {} : this.shortlistedClick()}>
                        <div className="heartImage">
                            {this.state.selectedHeart ? <img src={selectHeart} alt="" /> : <img src={heart} alt="" />}
                        </div>
                    </div>
                </div>
                <div className="course-info" onClick={(e) => this.handleOnClick(e)}>
                    <div className="left">
                        <h2>{this.props.data.name}</h2>
                        <p>{this.props.data.state}</p>
                    </div>
                    <div className="tagsContainer left">
                        {this.props.services.map((item, index) => {
                            if (index < 6) {
                                return <BlogButton tags={item.name} />
                            }
                        })}
                        {this.props.services.length > 4 && <BlogButton tags="+" onClick={() => this.props.history.push(`/viewwarehouse/${this.props.data.warehouseVersionId}`)} />}
                    </div>
                </div>
                <div className="right">
                    {/* <div className="email"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `mailto:?subject=I wanted you to check this warehouse&body=Check this https://hubshub.in/viewwarehouse/${this.props.data.warehouseVersionId}`
                        }}
                        title="Share by Email">
                        <i className="fa fa-envelope-o"></i>
                    </div> */}
                    {/* <EmailShareButton className="email" url={"https://hubshub.in/viewwarehouse/" + this.props.data.warehouseVersionId} subject="I wanted you to check this warehouse" body={"https://hubshub.in/viewwarehouse/" + this.props.data.warehouseVersionId}>
                        <div className="icon-button envelope-o">
                            <i className="fa fa-envelope-o"></i><span></span>
                        </div>
                    </EmailShareButton>
                    <WhatsappShareButton className="whatsapps" url={"https://hubshub.in/viewwarehouse/" + this.props.data.warehouseVersionId}>
                        <div className="icon-button whatsapp">
                            <i className="fa fa-whatsapp"></i><span></span>
                        </div>
                    </WhatsappShareButton> */}
                    <EmailShareButton className="email" url={this.state.shareURL + this.props.data.warehouseVersionId} subject="I wanted you to check this warehouse"
                    // body={this.state.shareURL + this.props.data.warehouseVersionId}
                    >
                        <div className="icon-button envelope-o">
                            <i className="fa fa-envelope-o"></i><span></span>
                        </div>
                    </EmailShareButton>
                    <WhatsappShareButton className="whatsapps" url={this.state.shareURL + this.props.data.warehouseVersionId}>
                        <div className="icon-button whatsapp">
                            <i className="fa fa-whatsapp"></i><span></span>
                        </div>
                    </WhatsappShareButton>
                </div>
            </div>
        );
    }
}

export default WarehouseCard;