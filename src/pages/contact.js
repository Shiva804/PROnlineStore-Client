import React, { Component } from "react";
import Footer from "../components/Footer";
import MessageIcon from "@material-ui/icons/Message";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import pexel from "../images/pexels.jpg";
import axios from "../config";
import Alert from "@material-ui/lab/Alert";
import Header from "../components/Header";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class Contact extends Component {
    state = {
        email: null,
        phone: null,
        message: null,
        error: null,
        success: null,
        loading: false,
        openlogin: false,
    };
    componentDidMount = () => {
        document.getElementById("contact").style.color = "#cc2129";
    };

    handleInput = (e) => {
        if (e.target.id == "contact-email")
            this.setState({ email: e.target.value });

        if (e.target.id == "contact-phone")
            this.setState({ phone: e.target.value });

        if (e.target.id == "message")
            this.setState({ message: e.target.value });
    };

    handleMessage = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("authenticated")) {
            if (this.state.email && this.state.message) {
                try {
                    let messagebody;
                    if (this.state.phone) {
                        messagebody = {
                            email: this.state.email,
                            message: this.state.message,
                            phone: this.state.phone,
                        };
                    } else {
                        messagebody = {
                            email: this.state.email,
                            message: this.state.message,
                        };
                    }
                    this.setState({ loading: true });
                    await axios.post("/message", messagebody, {
                        withCredentials: true,
                    });

                    this.setState({
                        success: "Message sent successfully",
                    });
                    document.getElementById("message").value = "";
                    document.getElementById("contact-phone").value = "";
                    document.getElementById("contact-email").value = "";
                    this.setState({ loading: false });

                    setTimeout(() => {
                        this.setState({ success: null });
                    }, 5000);
                } catch (e) {
                    this.setState({ loading: false });

                    this.setState({ error: "Error Occuered!" });
                    setTimeout(() => {
                        this.setState({ error: null });
                    }, 3000);
                }
            } else {
                this.setState({ error: "Please enter your email and message" });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 3000);
            }
        } else {
            this.setState({ openlogin: true });
        }
    };

    render() {
        return (
            <div id="contactpage">
                <Header
                    open={this.state.openlogin}
                    close={() => {
                        this.setState({ openlogin: false });
                    }}
                />
                <div id="contactpage-div">
                    <img src={pexel} id="pexel" data-aos="fade-down" />
                    <div id="contactform" data-aos="fade-up">
                        <form>
                            <div class="form-group">
                                <label for="contact-email">
                                    <EmailIcon /> &nbsp; <b> Email address</b>
                                </label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="contact-email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(e) => {
                                        this.handleInput(e);
                                    }}
                                />
                                <small
                                    id="emailHelp"
                                    class="form-text text-muted"
                                >
                                    We'll never share your email with anyone
                                    else.
                                </small>
                            </div>
                            <div class="form-group">
                                <label for="contact-phone">
                                    <PhoneIcon />
                                    &nbsp;<b>Phone Number</b>
                                </label>
                                <input
                                    type="number"
                                    maxLength="10"
                                    class="form-control"
                                    id="contact-phone"
                                    placeholder="Phone Number (Optional)"
                                    onChange={(e) => {
                                        this.handleInput(e);
                                    }}
                                />
                            </div>
                            <div class="form-group">
                                <label for="message">
                                    <MessageIcon />
                                    &nbsp;
                                    <b>Message</b>
                                </label>
                                <textarea
                                    class="form-control"
                                    id="message"
                                    rows="3"
                                    onChange={(e) => {
                                        this.handleInput(e);
                                    }}
                                ></textarea>
                            </div>

                            {this.state.error ? (
                                <Alert severity="error" id="alert">
                                    {this.state.error}
                                </Alert>
                            ) : null}

                            {this.state.loading ? (
                                <LinearProgress color="secondary" />
                            ) : null}

                            {this.state.success ? (
                                <Alert severity="success" id="alert">
                                    {this.state.success}
                                </Alert>
                            ) : null}
                            <div id="button">
                                <button
                                    type="message"
                                    id="sendmessage"
                                    class="btn btn-primary"
                                    onClick={(e) => {
                                        this.handleMessage(e);
                                    }}
                                >
                                    Send Message &nbsp;
                                    <i
                                        class="fa fa-paper-plane"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
