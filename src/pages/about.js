import React, { Component } from "react";
import Footer from "../components/Footer";
import f1 from "../images/P3.jpg";
import Header from "../components/Header";
export default class About extends Component {
    componentDidMount = () => {
        document.getElementById("about").style.color = "#cc2129";
    };
    render() {
        return (
            <div id="aboutus">
                <Header />

                <br />
                {/* <div id="ab-1"> */}
                {/* <div>
                        <img src={f1} id="f1" loading="lazy" />
                    </div> */}

                <div id="ab-2" data-aos="fade-up">
                    <p data-aos="fade-down">
                        <h2 id="aboutus-h">About PR Online Store</h2>
                        <br />
                        <br />
                        PR Online Store – One stop shop for all furniture needs
                        and can offer various industrial furniture products. PR
                        Online Store is a unit of PR Consultants. PR Consultants
                        provide all industrial laboratory and furnitures, and
                        established its own identity in the Southern India as
                        reliable, trustworthy supplier for Test equipments,
                        Analytical Instruments and industrial furniture and set
                        up providing technical guidance, selection of basis of
                        workspace with optional accessories, installation of
                        equipment and rendering after sales services.
                        <br />
                        <br />
                        PR Consultants has established excellent report with our
                        valued customers and enjoys complete faith in the
                        products marketed by it.We have also a division that
                        specializes in space planning and interiors, which can
                        provide you with the solution for your office and
                        industrial workspace set up.As is usual, the whole
                        package comes along with the PR Consultants stamp of
                        quality and integrity which is unmatched and unrivalled
                        in the realm of this industry.
                    </p>
                </div>
                {/* </div> */}

                <Footer />
            </div>
        );
    }
}
