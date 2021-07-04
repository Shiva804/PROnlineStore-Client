import React, { Component } from "react";
import "../App.css";
import ReactPaginate from "react-paginate";
import noresult from "../images/no-result.png";
import Footer from "../components/Footer";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import axios from "../config";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { Container } from "react-bootstrap";

export default class SearchResult extends Component {
    state = {
        search: JSON.parse(localStorage.getItem("result")),
        pageCount: 0,
        products: [],
        currentpage: localStorage.getItem("searchselected")
            ? parseInt(localStorage.getItem("searchselected"))
            : 0,
        cart: localStorage.getItem("cart"),
        open: false,
        image: null,
        openlogin: false,
    };

    componentDidMount = () => {
        document.getElementById("product").style.color = "#cc2129";

        const pagecount = Math.ceil(
            JSON.parse(localStorage.getItem("result")).length / 10
        );

        this.setState({ pageCount: pagecount });

        if (localStorage.getItem("searchselected") != undefined) {
            this.setState({
                currentPage: parseInt(localStorage.getItem("searchselected")),
            });
            const temp = this.state.search;
            const pagesVisited =
                parseInt(localStorage.getItem("searchselected")) * 10;
            const products = temp.slice(pagesVisited, pagesVisited + 10);
            this.setState({ products: products });
        } else {
            this.setState({ currentPage: 0 });
            const temp = this.state.search;
            const tempproducts = temp.slice(0, 11);
            this.setState({ products: tempproducts });
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            JSON.stringify(prevState.search) != localStorage.getItem("result")
        ) {
            const pagecount = Math.ceil(
                JSON.parse(localStorage.getItem("result")).length / 10
            );
            localStorage.setItem("searchselected", 0);

            console.log(this.state.currentpage);
            this.setState({ pageCount: pagecount });
            this.setState({
                search: JSON.parse(localStorage.getItem("result")),
            });
            const temp = JSON.parse(localStorage.getItem("result"));
            const products = temp.slice(0, 11);
            this.setState({ products: products });
            window.location.reload();
        }
    };

    handleChange = (e) => {
        localStorage.setItem("searchselected", e.selected);
        this.setState({ currentPage: e.selected });
        const temp = this.state.search;
        const pagesVisited = e.selected * 10;
        const products = temp.slice(pagesVisited, pagesVisited + 10);
        this.setState({ products: products });
        window[`scrollTo`]({ top: 0, behavior: `smooth` });
    };

    addtocart = async (name) => {
        if (localStorage.getItem("authenticated")) {
            let quantity;
            if (this.state[name] != undefined) {
                quantity = this.state[name];
            } else {
                quantity = 1;
            }

            const addtocart = await axios.post(
                "/addcart",
                {
                    email: localStorage.getItem("email"),
                    product_name: name,
                    quantity: quantity,
                },
                { withCredentials: true }
            );
            console.log(name);

            document.getElementById(`${name}-cart`).classList.add("clicked");
            setTimeout(() => {
                document
                    .getElementById(`${name}-cart`)
                    .classList.remove("clicked");
            }, 1000);

            this.setState({ cart: addtocart.data.cart });
            localStorage.setItem("cart", addtocart.data.cart);
        } else {
            this.setState({ openlogin: true });
        }
    };
    handleIncrement = (name) => {
        let newState = {};
        console.log(name);

        if (this.state[name]) {
            newState[name] = this.state[name] + 1;
        } else {
            newState[name] = 2;
        }
        this.setState(newState);
    };

    handleDecrement = (name) => {
        let newState = {};

        if (this.state[name] && this.state[name] > 1) {
            newState[name] = this.state[name] - 1;
        }
        this.setState(newState);
    };

    handleZoom = (name) => {
        document.getElementById(`${name}-img`).style.transform = "scale(1.3)";
    };

    handleZoomOut = (name) => {
        document.getElementById(`${name}-img`).style.transform = "scale(1)";
    };
    handleZoom = (img) => {
        this.setState({ image: img });
        this.setState({ open: true });
    };

    render() {
        return (
            <div>
                <Header
                    cart={this.state.cart}
                    open={this.state.openlogin}
                    close={() => {
                        this.setState({ openlogin: false });
                    }}
                />
                {/* Mobile View */}
                <div id="product-main">
                    <h5 id="searchfor">
                        Search Results for: &nbsp;
                        {localStorage.getItem("searchfor")}
                    </h5>

                    {this.state.open ? (
                        <Modal
                            img={this.state.image}
                            open={this.state.open}
                            handleClose={() => {
                                this.setState({ open: false });
                            }}
                        />
                    ) : null}

                    <div id="order-main-sub">
                        <Container id="orderpage">
                            {this.state.products.length > 0
                                ? this.state.products.map((product) => (
                                      <div class="card" id="cart-card">
                                          {/* <img src={img} id="percent" /> */}

                                          <ZoomOutMapIcon
                                              id="zooms"
                                              className="zoom"
                                              onClick={() => {
                                                  this.handleZoom(
                                                      product.item.image_src
                                                  );
                                              }}
                                          />
                                          <div id="cart-card-img">
                                              <img
                                                  src={product.item.image_src}
                                                  class="card-img-top"
                                                  id="cart-imgs"
                                                  alt="NO IMAGE"
                                              />
                                          </div>
                                          <div class="cart-card-body">
                                              <h5 class="cart-card-title">
                                                  {product.item.name}
                                              </h5>
                                              <h6
                                                  id="price"
                                                  style={{
                                                      textDecoration:
                                                          "line-through",
                                                  }}
                                              >
                                                  Rs.{product.item.price}
                                              </h6>

                                              <h5 id="price">
                                                  Rs.
                                                  {Math.round(
                                                      parseInt(
                                                          product.item.price.replaceAll(
                                                              ",",
                                                              ""
                                                          )
                                                      ) -
                                                          (parseInt(
                                                              product.item.price.replaceAll(
                                                                  ",",
                                                                  ""
                                                              )
                                                          ) *
                                                              25) /
                                                              100
                                                  ).toLocaleString("en-US")}
                                              </h5>
                                          </div>
                                          <div>
                                              <ButtonGroup
                                                  size="small"
                                                  aria-label="small outlined button group"
                                                  id="quantity-btns"
                                              >
                                                  <Button
                                                      id="btn-inc"
                                                      onClick={() => {
                                                          this.handleIncrement(
                                                              product.item.name
                                                          );
                                                      }}
                                                  >
                                                      +
                                                  </Button>
                                                  <input
                                                      disabled
                                                      className="quantity"
                                                      defaultValue="1"
                                                      value={
                                                          this.state[
                                                              product.item.name
                                                          ]
                                                      }
                                                  ></input>
                                                  <Button
                                                      id="btn-inc"
                                                      onClick={() => {
                                                          this.handleDecrement(
                                                              product.item.name
                                                          );
                                                      }}
                                                  >
                                                      -
                                                  </Button>
                                              </ButtonGroup>

                                              <button
                                                  class="cart-button"
                                                  id={`${product.name}-cart`}
                                                  onClick={() => {
                                                      this.addtocart(
                                                          product.item.name
                                                      );
                                                  }}
                                              >
                                                  Add to cart
                                              </button>
                                          </div>
                                      </div>
                                  ))
                                : null}
                        </Container>
                    </div>

                    {this.state.pageCount > 0 ? (
                        <ReactPaginate
                            pageCount={this.state.pageCount}
                            onPageChange={(e) => {
                                this.handleChange(e);
                            }}
                            forcePage={this.state.currentpage}
                            containerClassName={"paginationBttns"}
                            pageClassName={"bttn"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    ) : null}
                    <Footer />
                </div>

                <div id="display-search">
                    {this.state.open ? (
                        <Modal
                            img={this.state.image}
                            open={this.state.open}
                            handleClose={() => {
                                this.setState({ open: false });
                            }}
                        />
                    ) : null}

                    <Header cart={this.state.cart} />
                    <h4 id="searchfor">
                        Search Results for: &nbsp;
                        {localStorage.getItem("searchfor")}
                    </h4>
                    <div id="product-container">
                        {this.state.products.length > 0 ? (
                            this.state.products.map((product) => (
                                <div class="card" id="card">
                                    {/* <img src={img} id="percent" /> */}

                                    <ZoomOutMapIcon
                                        id="zooms"
                                        className="zoom"
                                        onClick={() => {
                                            this.handleZoom(
                                                product.item.image_src
                                            );
                                        }}
                                    />
                                    <div id="card-img">
                                        <div id={`${product.item.name}-img`}>
                                            <img
                                                src={product.item.image_src}
                                                className="card-img-top"
                                                id="imgs"
                                                alt="NO IMAGE"
                                            />
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <h4
                                            className="card-title"
                                            id="card-title"
                                        >
                                            {product.item.name}
                                        </h4>
                                        <div id="price-div">
                                            <h6
                                                id="price"
                                                style={{
                                                    textDecoration:
                                                        "line-through",
                                                }}
                                            >
                                                Rs.{product.item.price}
                                            </h6>

                                            <h5 id="price">
                                                Rs.
                                                {Math.round(
                                                    parseInt(
                                                        product.item.price.replaceAll(
                                                            ",",
                                                            ""
                                                        )
                                                    ) -
                                                        (parseInt(
                                                            product.item.price.replaceAll(
                                                                ",",
                                                                ""
                                                            )
                                                        ) *
                                                            25) /
                                                            100
                                                ).toLocaleString("en-US")}
                                            </h5>
                                        </div>
                                    </div>

                                    <div>
                                        <ButtonGroup
                                            size="small"
                                            aria-label="small outlined button group"
                                            id="quantity-btns"
                                        >
                                            <Button
                                                id="btn-inc"
                                                onClick={() => {
                                                    this.handleIncrement(
                                                        product.item.name
                                                    );
                                                }}
                                            >
                                                +
                                            </Button>
                                            <input
                                                disabled
                                                className="quantity"
                                                defaultValue="1"
                                                value={
                                                    this.state[
                                                        product.item.name
                                                    ]
                                                }
                                            ></input>
                                            <Button
                                                id="btn-inc"
                                                onClick={() => {
                                                    this.handleDecrement(
                                                        product.item.name
                                                    );
                                                }}
                                            >
                                                -
                                            </Button>
                                        </ButtonGroup>
                                        <button
                                            class="cart-button"
                                            id={`${product.item.name}-cart`}
                                            onClick={() => {
                                                this.addtocart(
                                                    product.item.name
                                                );
                                            }}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div id="noresult">
                                <img src={noresult} />
                            </div>
                        )}
                    </div>
                    {this.state.pageCount > 0 ? (
                        <ReactPaginate
                            pageCount={this.state.pageCount}
                            onPageChange={(e) => {
                                this.handleChange(e);
                            }}
                            forcePage={this.state.currentpage}
                            containerClassName={"paginationBttns"}
                            pageClassName={"bttn"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    ) : null}

                    <Footer />
                </div>
            </div>
        );
    }
}
