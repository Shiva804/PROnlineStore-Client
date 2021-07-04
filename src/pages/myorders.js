import React, { Component } from "react";
import axios from "../config";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";

export default class Myorders extends Component {
    state = {
        orders: [],
    };
    componentDidMount = async () => {
        const orders = await axios.get(
            `/myorders/${localStorage.getItem("email")}`,
            { withCredentials: true }
        );

        this.setState({ orders: orders.data.orders });
    };
    render() {
        return (
            <div>
                <Header cart={this.state.cart} />

                <div id="order-main">
                    <div id="order-main-sub">
                        <h1 data-aos="fade-left">Your Orders</h1>

                        <Container id="orderpage" data-aos="fade-down">
                            {this.state.orders.length > 0 ? (
                                this.state.orders.map((order) => (
                                    <div class="card" id="cart-card">
                                        <div id="cart-card-img">
                                            <img
                                                src={order.Product.image_src}
                                                class="card-img-top"
                                                id="cart-imgs"
                                                alt="NO IMAGE"
                                            />
                                        </div>
                                        <div class="cart-card-body">
                                            <h5 class="cart-card-title">
                                                {order.Product.name}
                                            </h5>
                                            <h6 id="price">
                                                Rs.
                                                {Math.round(
                                                    parseInt(
                                                        order.Product.price.replaceAll(
                                                            ",",
                                                            ""
                                                        )
                                                    ) -
                                                        (parseInt(
                                                            order.Product.price.replaceAll(
                                                                ",",
                                                                ""
                                                            )
                                                        ) *
                                                            25) /
                                                            100
                                                ).toLocaleString("en-US")}
                                            </h6>
                                            <button
                                                disabled={true}
                                                id="quantity-button"
                                            >
                                                Quantity: {order.quantity}
                                            </button>

                                            <h6 id="purchased-on">
                                                Order ID:
                                                <span>{order.order_id}</span>
                                            </h6>

                                            <h6 id="purchased-on">
                                                Purchased On:
                                                <span>
                                                    {order.purchased_date}
                                                </span>
                                            </h6>

                                            <h6 id="purchased-on">
                                                Status:
                                                {order.delivered == 1 ? (
                                                    <span
                                                        style={{
                                                            color: "green",
                                                        }}
                                                    >
                                                        Delivered
                                                    </span>
                                                ) : (
                                                    <span>Order Received</span>
                                                )}
                                            </h6>
                                        </div>
                                        <div id="order-address">
                                            <h5>Shipping Address:</h5>
                                            <br></br>
                                            <p>{order.shipping_address}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div id="noorder">
                                    <h3>No orders yet...</h3>
                                </div>
                            )}
                        </Container>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
