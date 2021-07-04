import { withRouter } from "react-router";
import React, { Component } from "react";
import Terms from "./Terms";

class Footer extends Component {
    state = { open: false };
    render() {
        return (
            <div id="footer">
                {this.state.open ? (
                    <Terms
                        open={this.state.open}
                        handleClose={() => {
                            this.setState({ open: false });
                        }}
                    />
                ) : null}
                <footer id="footer" class="footer-1">
                    <div class="main-footer widgets-dark typo-light">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-sm-6 col-md-3">
                                    <div class="widget subscribe no-box">
                                        <h5 class="widget-title">
                                            PR Online Store<span></span>
                                        </h5>
                                        <p>
                                            PR Online Store, a unit of PR
                                            Consultants. This is an one stop to
                                            pick your needs.
                                            <br />
                                            We provide extensive services to
                                            various small scale and large scale
                                            industries and various organisation.
                                            Now getting it better and simpler.
                                            <br />
                                        </p>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-3">
                                    <div class="widget no-box">
                                        <h5 class="widget-title">
                                            Quick Links<span></span>
                                        </h5>
                                        <ul class="thumbnail-widget">
                                            <li>
                                                <div class="thumb-content">
                                                    <a
                                                        onClick={() => {
                                                            window[`scrollTo`]({
                                                                top: 0,
                                                                behavior: `smooth`,
                                                            });

                                                            this.props.history.push(
                                                                "/"
                                                            );
                                                        }}
                                                    >
                                                        Home
                                                    </a>
                                                </div>
                                            </li>
                                            <br />
                                            <li>
                                                <div class="thumb-content">
                                                    <a
                                                        id="about"
                                                        onClick={(e) => {
                                                            window[`scrollTo`]({
                                                                top: 0,
                                                                behavior: `smooth`,
                                                            });

                                                            this.props.history.push(
                                                                "/" +
                                                                    e.target.id
                                                            );
                                                        }}
                                                    >
                                                        About Us
                                                    </a>
                                                </div>
                                            </li>
                                            <br />

                                            <li>
                                                <div class="thumb-content">
                                                    <a
                                                        id="contact"
                                                        onClick={(e) => {
                                                            window[`scrollTo`]({
                                                                top: 0,
                                                                behavior: `smooth`,
                                                            });

                                                            this.props.history.push(
                                                                "/" +
                                                                    e.target.id
                                                            );
                                                        }}
                                                    >
                                                        Contact Us
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-3">
                                    <div class="widget no-box">
                                        <h5 class="widget-title">
                                            Get Started<span></span>
                                        </h5>
                                        <p>
                                            Sign In, Book your order and get it
                                            delivered within 2-3 weeks!
                                            <br /> For All Office And Industry
                                            Furnitures, Go Ahead!
                                            <br></br>
                                            <br></br>
                                            Happy Shopping!
                                        </p>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-3">
                                    <div class="widget no-box">
                                        <h5 class="widget-title">
                                            Contact Us<span></span>
                                        </h5>
                                        <ul id="ctct-li">
                                            <li>M G Thangaraj</li>
                                            <li>
                                                No:5/10, 3rd Cross Street,
                                                Thirupathi Nagar, Kolathur.
                                                <br />
                                                Chennai-600 099
                                            </li>
                                            <br />

                                            <li>+91 98408 99464</li>
                                            <li>info@pronlinestore.com</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p
                                id="f-tnc"
                                onClick={() => {
                                    this.setState({ open: true });
                                }}
                            >
                                Terms and Return Policy
                            </p>
                            <p style={{ color: "white", fontSize: "13px" }}>
                                Copyright &copy; 2021 PROnlineStore. All Rights
                                Reserved
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
export default withRouter(Footer);
