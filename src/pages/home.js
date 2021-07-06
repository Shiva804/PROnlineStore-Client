import React, { Component } from "react";
import MainCarousel from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import room from "../images/room_1.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import office from "../images/office.jpg";
import conference from "../images/conference.jpg";
import lobby from "../images/lobby1.jpg";
import garden from "../images/garden.jpg";
import auditorium from "../images/auditorium.jpg";
import hotel from "../images/hotel.jpg";
import waiting from "../images/waiting.jpg";
import school from "../images/school.jpg";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1085 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1085, min: 750 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 750, min: 0 },
        items: 1,
    },
};
export default class Home extends Component {
    handleCategory = (e) => {
        this.props.history.push(`/product/${e.target.id}`);
        window[`scrollTo`]({ top: 0, behavior: `smooth` });
    };
    componentDidMount = () => {
        document.getElementById("home").style.color = "#cc2129";
    };

    render() {
        return (
            <div id="homepage">
                <Header loggedin={this.props.loggedin} />
                <MainCarousel />

                <section id="one" data-aos="fade-right">
                    <div>
                        <br />
                        <h3>PR ONLINE STORE</h3>
                        <hr></hr>
                        PR Online Store, A part of PR Consultants provide
                        various furnitures which mainly concentrates on small
                        and large scale industry.We are humbled to have touched
                        the lives of lot of people with wide range of home and
                        office furniture, Workstations, Conference Set Up,
                        Variety of Chairs and top-grade dining SetUp.
                        <br />
                        <br />
                        We work as a team with mutual trust and shared
                        accountability towards a common goal in a collaborative
                        environment, to meet the needs and expectations of all
                        stakeholders.We always stand behind our promises and act
                        with complete integrity.
                    </div>
                </section>
                <h3 id="ourproducts" data-aos="fade-left">
                    OUR PRODUCTS
                </h3>
                <hr id="prohr"></hr>
                <section id="three">
                    <div id="three-div" data-aos="slide-up">
                        <Carousel
                            responsive={responsive}
                            removeArrowOnDeviceType="[mobile]"
                            autoPlay={
                                this.props.deviceType !== "mobile"
                                    ? true
                                    : false
                            }
                            autoPlaySpeed={3000}
                            infinite={true}
                            focusOnSelect={true}
                        >
                            <div>
                                <h6>OFFICE</h6>

                                <img
                                    src={office}
                                    id="Office Executive"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                            <div>
                                <h6>CONFERENCE</h6>

                                <img
                                    src={conference}
                                    id="Conference"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                            <div>
                                <h6>LOBBY</h6>

                                <img
                                    src={lobby}
                                    id="Lobby Chair"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                            <div>
                                <h6>WAITING</h6>

                                <img
                                    src={waiting}
                                    id="Waiting Lounge"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                            <div>
                                <h6>AUDITORIUM</h6>

                                <img
                                    src={auditorium}
                                    id="Auditorum"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                            <div>
                                <h6>EDUCATIONAL</h6>

                                <img
                                    src={school}
                                    id="Educational Furniture"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                            <div>
                                <h6>HOTEL</h6>

                                <img
                                    src={hotel}
                                    id="Hotel Furniture"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                            <div>
                                <h6>GARDEN</h6>

                                <img
                                    src={garden}
                                    id="Garden Furniture"
                                    loading="lazy"
                                    onClick={(e) => {
                                        this.handleCategory(e);
                                    }}
                                />
                            </div>
                        </Carousel>
                    </div>
                </section>
                <section id="two">
                    <div id="two-img" data-aos="fade-right">
                        <img src={room} loading="lazy" />
                    </div>
                    <div id="two-div" data-aos="fade-left">
                        <br />
                        <div id="two-div-div">
                            <h3>COMPACT AND COMFORT </h3>
                            <hr></hr>

                            <br />
                            <p>
                                For a luxurious spin on industrial metal
                                furniture, PR Online Store has an extensive
                                collection of Bar stools, Chairs, Workstation
                                Sets and Many more. To add a soothing vibe to
                                your garden and lounge, Our garden and lounge
                                furniture is ingeniously designed and
                                manufactured. The extended multiseater and
                                auditorium set up makes a stylish statement with
                                natural knots and follow a variety ranging from
                                simpler styles to more elaborate statement.
                            </p>
                            <br />

                            <p>
                                Large or small, every industry and home needs
                                the right furniture to add comfort. Furnitures
                                have become the most essential part of our
                                life.With More Flexible Workspaces and Increased
                                Interest in Eco-Friendly Furniture, this
                                industry has got its importance And Now shopping
                                of furniture has also become simpler.
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}
