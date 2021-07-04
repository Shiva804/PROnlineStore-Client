import React, { Component } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import f1 from "../images/P1_1.jpg";
import f3 from "../images/P4.jpg";
import f4 from "../images/P5_5.jpg";
import "../App.css";
import { Carousel } from "react-bootstrap";

export default class HomeCarousel extends Component {
    render() {
        return (
            <Carousel id="carousel" fade={true}>
                <Carousel.Item interval={3000} id="carousel-item">
                    <img
                        className="d-block w-100"
                        src={f1}
                        alt="First slide"
                        loading="lazy"
                    />

                    <div class="jumbotron" id="jumbo1" data-aos="fade-down">
                        <h1>Welcome to PR Online Store!</h1>
                        <h5>A Unit of PR Consultants </h5>
                        <hr class="my-4" />
                        <p>
                            You can get the best exterior finishes with the most
                            durable raw material and get the best design in
                            terms of look and application.
                            <br />
                        </p>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={3000} id="carousel-item">
                    <img
                        className="d-block w-100"
                        src={f4}
                        alt="Second slide"
                        loading="lazy"
                    />
                    <div class="jumbotron" id="jumbo1" data-aos="fade-down">
                        <h1>One stop shop for all furniture needs!</h1>
                        <hr class="my-4" />
                        <h5>
                            PR online store is a one stop furniture shop for
                            office, home, organizations, institutes, libraries,
                            hospitals and customer service products.
                            <br />
                            <br />
                            We manufacture and deliver the products all over the
                            world.
                        </h5>
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={3000} id="carousel-item">
                    <img
                        className="d-block w-100"
                        src={f3}
                        alt="Third slide"
                        loading="lazy"
                    />
                    <div class="jumbotron" id="jumbo1">
                        <h1>Furniture at its best!</h1>
                        <hr class="my-4" />
                        <h5>
                            Shop all you want, For all your needs buy what you
                            eyed! Spend less and save more!
                            <br />
                            <br />
                            We have earned a reputation for delivering
                            outstanding value, continuous innovation and
                            exceptional customer experience.
                        </h5>
                    </div>
                </Carousel.Item>
            </Carousel>
        );
    }
}
