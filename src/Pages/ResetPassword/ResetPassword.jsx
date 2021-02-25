/* eslint-disable */
import React, { Component } from 'react';
import './resetpassword.css';
import logo from '../../components/images/logo.png';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Loader from "react-loader-spinner";
import * as resetPasswordAPI from '../../Apis/resetPassword';
import queryString from 'query-string';
class ResetPassword extends Component {
    state = {
        password: "",
        repassword: "",
        error: "",
        success: "",
        isLoading: false,
        showPassword: false,
        showPassword2: false
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value, error: "", isLoading: false });
    };
    resetPassword = () => {
        this.setState({ isLoading: true });
        if (this.state.password !== this.state.repassword) {
            this.setState({ error: "The password does not match" })
            return;
        }
        resetPasswordAPI.resetpassword(
            new resetPasswordAPI.ResetPassword({
                password: this.state.password,
                token: this.props.match.params.token
            }),
            (status, data) => {
                if (status === 403 || status === 400 || status === 404 || status === 422) {
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                    }, 500)
                }
                this.setState({
                    success: "Successfully Reset",
                    isLoading: false,
                    status: status,
                    responseData: data
                })
                setTimeout(() => {
                    this.setState({ success: "" })
                    window.location.replace('/login')
                }, 3000);
            },
            (error) => { this.setState({ error: error[0] }) })
    }
    componentDidUpdate() {
        $(window).scrollTop(0)
        if (this.state.error !== "") {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
        }
    }
    render() {
        const handleClickShowPassword = () => {
            this.setState({ ...this.state, showPassword: !this.state.showPassword });
        };
        const handleClickShowPassword2 = () => {
            this.setState({ ...this.state, showPassword2: !this.state.showPassword2 });
        };
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        return (
            <div className="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="sign">
                                <div className="logoContainer">
                                    <NavLink to="/"><img src={logo} alt="" /></NavLink>
                                </div>
                                <div className="contact-inner">
                                    <div className="sec-head sec-head-login">
                                        <h2>Reset Password</h2>
                                    </div>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mail">
                                                    <input type={this.state.showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter Password" value={this.state.password}
                                                        onChange={this.handleChange}
                                                        onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.resetPassword()
                                                            }
                                                        }} />
                                                    <i className={this.state.showPassword ? "fa fa-eye" : "fa fa-eye-slash"} id="togglePassword" onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}></i>
                                                    <label>Password</label>
                                                </div>
                                                <div className="mail">
                                                    <input type={this.state.showPassword2 ? "text" : "password"} name="repassword" id="password" placeholder="Enter your password again" value={this.state.repassword}
                                                        onChange={this.handleChange}
                                                        onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.resetPassword()
                                                            }
                                                        }} />
                                                    <i className={this.state.showPassword2 ? "fa fa-eye" : "fa fa-eye-slash"} id="togglePassword" onClick={handleClickShowPassword2}
                                                        onMouseDown={handleMouseDownPassword}></i>
                                                    <label>Re-enter password</label>
                                                </div>
                                                <div className="errorMessage">{this.state.error}</div>
                                                {this.state.isLoading ? (
                                                    <div className="loader">
                                                        <Loader
                                                            type="TailSpin"
                                                            color="#0055FF"
                                                            height={50}
                                                            width={50}
                                                        />
                                                    </div>
                                                ) : null}
                                                <div className="col-md-12 text-center mt-5">
                                                    <div tabIndex="0" className={this.state.isLoading ? "btn btn-disabled" : "btn"} onClick={() => { this.state.isLoading ? "" : this.resetPassword() }} onKeyPress={(event) => {
                                                            if (event.key === "Enter") {
                                                                this.state.isLoading ? "" : this.resetPassword()
                                                            }
                                                        }}>Proceed</div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <div className="resetPasswordMainContainer">
            //     <div className="resetPasswordSection">
            // <div className="logoContainer">
            //     <NavLink to="/"><img src={logo} alt="" /></NavLink>
            // </div>
            //         <div className="resetPasswordText">Reset Password</div>
            //         <TextField
            //             id="outlined-full-width"
            //             type={this.state.showPassword ? "text" : "password"}
            //             label="Password"
            //             placeholder="Enter your password"
            //             fullWidth
            //             value={this.state.password}
            //             name="password"
            //             onChange={this.handleChange}
            //             InputProps={{
            //                 endAdornment:
            //                     <InputAdornment position="end">
            //                         <IconButton
            //                             aria-label="toggle password visibility"
            //                             onClick={handleClickShowPassword}
            //                             onMouseDown={handleMouseDownPassword}
            //                             edge="end"
            //                         >
            //                             {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
            //                         </IconButton>
            //                     </InputAdornment>
            //             }}
            //             onKeyPress={(event) => {
            //                 if (event.key === "Enter") {
            //                     this.resetPassword(this.state.password, this.state.repassword)
            //                 }
            //             }}
            //             InputLabelProps={{
            //                 shrink: true,
            //             }}
            //             variant="outlined"
            //         />
            //         <TextField
            //             id="outlined-full-width"
            //             type={this.state.showPassword2 ? "text" : "password"}
            //             label="Re-enter Password"
            //             placeholder="Enter your password again"
            //             fullWidth
            //             value={this.state.repassword}
            //             name="repassword"
            //             onChange={this.handleChange}
            //             InputProps={{
            //                 endAdornment:
            //                     <InputAdornment position="end">
            //                         <IconButton
            //                             aria-label="toggle password visibility"
            //                             onClick={handleClickShowPassword2}
            //                             onMouseDown={handleMouseDownPassword}
            //                             edge="end"
            //                         >
            //                             {this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
            //                         </IconButton>
            //                     </InputAdornment>
            //             }}
            //             onKeyPress={(event) => {
            //                 if (event.key === "Enter") {
            //                     this.resetPassword(this.state.password, this.state.repassword)
            //                 }
            //             }}
            //             InputLabelProps={{
            //                 shrink: true,
            //             }}
            //             variant="outlined"
            //         />
            //         <div className="errorMessage">{this.state.error}</div>
            //         <div className="successMessage">{this.state.success}</div>
            //         {this.state.isLoading ? (
            //             <div className="resetLoader">
            //                 <Loader
            //                     type="TailSpin"
            //                     color="#0055FF"
            //                     height={60}
            //                     width={60}
            //                 />
            //             </div>
            //         ) : null}
            //         <div className="signInWithMobileContainer proceedButton" onClick={() => this.resetPassword(this.state.password, this.state.repassword)}>
            //             <div className="btnText">Proceed</div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default ResetPassword;