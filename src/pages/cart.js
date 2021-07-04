import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router";
import Footer from "../components/Footer";
import axios from "../config";
import Header from "../components/Header";
import { Button } from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { v4 as uuidv4 } from "uuid";
import Terms from "../components/Terms";

class Cart extends Component {
    state = {
        cartproducts: [],
        quantity: null,
        total: 0,
        gst: 0,
        subtotal: 0,
        cart: localStorage.getItem("cart"),
        open: false,
    };
    componentDidMount = async () => {
        if (!localStorage.getItem("authenticated")) {
            this.props.history.push("/");
        }

        try {
            const cartproducts = await axios.get(
                `/cart/${localStorage.getItem("email")}`,
                { withCredentials: true }
            );
            let quantity;
            if (cartproducts.data.quantity > 1) {
                quantity = `${cartproducts.data.quantity} items`;
            } else {
                quantity = `${cartproducts.data.quantity} item`;
            }

            this.setState({
                cartproducts: cartproducts.data.cartproducts,
                quantity: quantity,
                total: cartproducts.data.total,
                subtotal: cartproducts.data.subtotal,
                gst: cartproducts.data.gst,
            });
        } catch (e) {
            localStorage.clear();
            this.props.history.push("/");
        }
    };

    removeCart = async (name) => {
        const remove = await axios.post(
            "/removecart",
            {
                email: localStorage.getItem("email"),
                product_name: name,
            },
            { withCredentials: true }
        );
        let quantity;
        if (remove.data.cart > 1) {
            quantity = `${remove.data.cart} items`;
        } else {
            quantity = `${remove.data.cart} item`;
        }

        localStorage.setItem("cart", remove.data.cart);
        this.setState({
            cart: remove.data.cart,
            cartproducts: remove.data.items,
            quantity: quantity,
            total: remove.data.total,
            subtotal: remove.data.subtotal,
            gst: remove.data.gst,
        });
    };

    proceed = async () => {
        const cartproducts = await axios.get(
            `/cart/${localStorage.getItem("email")}`,
            { withCredentials: true }
        );

        const total = cartproducts.data.total;
        const razor_response = await axios.post("/razorpay", {
            amount: total,
            email: localStorage.getItem("email"),
        });
        localStorage.setItem("order_id", razor_response.data.id);

        this.props.history.push(`/payment/${razor_response.data.id}`);
    };
    proceed = async () => {
        const id = uuidv4();
        sessionStorage.setItem("id", id);
        this.props.history.push(`/address/${id}`);
    };

    render() {
        return (
            <div>
                <div id="total-container"></div>
                <Header cart={this.state.cart} />
                {this.state.open ? (
                    <Terms
                        open={this.state.open}
                        handleClose={() => {
                            this.setState({ open: false });
                        }}
                    />
                ) : null}

                <div id="cart-main">
                    <h1>Shopping Cart</h1>
                    <div id="cart-main-sub">
                        <Container id="cartpage">
                            {this.state.cartproducts.length > 0 ? (
                                <Container id="mobile-cartpage-total">
                                    <div class="card" id="mobile-subtotal">
                                        <div id="mobile-finalprice">
                                            <h5>
                                                Total ({this.state.quantity}):
                                            </h5>
                                            <h5>
                                                Rs.
                                                {this.state.total.toLocaleString(
                                                    "en-US"
                                                )}
                                            </h5>
                                        </div>
                                        <div id="mobile-finalprice">
                                            <h5>GST (18%):</h5>

                                            <h5>
                                                Rs.
                                                {this.state.gst.toLocaleString(
                                                    "en-US"
                                                )}
                                            </h5>
                                        </div>
                                        <div id="mobile-finalprice">
                                            <h4>
                                                Subtotal ({this.state.quantity}
                                                ):
                                            </h4>
                                            <h5>
                                                Rs.
                                                {this.state.subtotal.toLocaleString(
                                                    "en-US"
                                                )}
                                            </h5>
                                        </div>

                                        <p
                                            id="tnc"
                                            onClick={() => {
                                                this.setState({ open: true });
                                            }}
                                        >
                                            Terms and Return Policy.
                                        </p>
                                        {this.state.total > 0 ? (
                                            <Button
                                                id="mobile-proceed"
                                                onClick={() => {
                                                    this.proceed();
                                                }}
                                            >
                                                Proceed to Checkout
                                            </Button>
                                        ) : null}
                                    </div>
                                </Container>
                            ) : null}

                            {this.state.cartproducts.length > 0 ? (
                                this.state.cartproducts.map((product) => (
                                    <div class="card" id="cart-card">
                                        <div id="cart-card-img">
                                            <img
                                                src={product.Product.image_src}
                                                class="card-img-top"
                                                id="cart-imgs"
                                                alt="NO IMAGE"
                                            />
                                        </div>
                                        <div class="cart-card-body">
                                            <h5 class="cart-card-title">
                                                {product.Product.name}
                                            </h5>
                                            <h6
                                                id="price"
                                                style={{
                                                    textDecoration:
                                                        "line-through",
                                                }}
                                            >
                                                Rs.{product.Product.price}
                                            </h6>

                                            <h5 id="price">
                                                Rs.
                                                {Math.round(
                                                    parseInt(
                                                        product.Product.price.replaceAll(
                                                            ",",
                                                            ""
                                                        )
                                                    ) -
                                                        (parseInt(
                                                            product.Product.price.replaceAll(
                                                                ",",
                                                                ""
                                                            )
                                                        ) *
                                                            25) /
                                                            100
                                                ).toLocaleString("en-US")}
                                            </h5>
                                            <button
                                                disabled={true}
                                                id="quantity-button"
                                            >
                                                Quantity: {product.quantity}
                                            </button>
                                        </div>
                                        <div id="removecart-div">
                                            <button
                                                id="removecart"
                                                onClick={() => {
                                                    this.removeCart(
                                                        product.Product.name
                                                    );
                                                }}
                                            >
                                                Remove
                                                <DeleteForeverOutlinedIcon />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h5>No Items in the cart..</h5>
                            )}
                        </Container>

                        <Container id="cartpage-total">
                            <div class="card" id="subtotal">
                                <div id="finalprice">
                                    <h5>Total ({this.state.quantity}):</h5>
                                    <h5>
                                        Rs.
                                        {this.state.total.toLocaleString(
                                            "en-US"
                                        )}
                                    </h5>
                                </div>
                                {parseInt(localStorage.getItem("cart")) > 0 ? (
                                    <>
                                        <div id="finalprice">
                                            <h5>GST (18%):</h5>
                                            <h5>
                                                Rs.
                                                {this.state.gst.toLocaleString(
                                                    "en-US"
                                                )}
                                            </h5>
                                        </div>
                                        <div id="finalprice">
                                            <h4>
                                                Subtotal ({this.state.quantity}
                                                ):
                                            </h4>
                                            <h5>
                                                Rs.
                                                {this.state.subtotal.toLocaleString(
                                                    "en-US"
                                                )}
                                            </h5>

                                            <br />
                                        </div>
                                        <p id="fd">Free Delivery</p>
                                    </>
                                ) : null}
                                <p
                                    id="tnc"
                                    onClick={() => {
                                        this.setState({ open: true });
                                    }}
                                >
                                    Terms and Return Policy.
                                </p>

                                {this.state.total > 0 ? (
                                    // <a href="https://pages.razorpay.com/pl_HJfxxgd0eLIM26/view">
                                    <Button
                                        id="mobile-proceed"
                                        onClick={() => {
                                            this.proceed();
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                ) : // </a>
                                null}
                            </div>
                        </Container>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default withRouter(Cart);
