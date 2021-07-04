import React, { Component } from "react";
import axios from "../config";
import Footer from "../components/Footer";
import ReactPaginate from "react-paginate";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { Container } from "react-bootstrap";

export default class Product extends Component {
    state = {
        category: localStorage.getItem("category")
            ? localStorage.getItem("category")
            : null,
        products: [],
        pageCount: 0,
        tempproducts: [],
        subcategory: [],
        cart: localStorage.getItem("cart"),
        open: false,
        image: null,
        openlogin: false,
        currentPage: localStorage.getItem("selected")
            ? parseInt(localStorage.getItem("selected"))
            : 0,

        loaded: false,
    };

    componentDidMount = async () => {
        document.getElementById("product").style.color = "#cc2129";
        const { category } = this.props.match.params;
        localStorage.setItem("category", category);
        const products = await axios.get(`/products/${category}`);
        const subcategory = await axios.get(`/subcategory/${category}`);
        if (subcategory.data.length > 0) {
            this.setState({
                subcategory: subcategory.data,
            });
        } else {
            this.setState({
                subcategory: [],
            });
        }

        this.setState({ category: category });
        this.setState({ products: products.data });
        const pagecount = Math.ceil(this.state.products.length / 10);
        this.setState({ pageCount: pagecount });

        if (localStorage.getItem("selected") != undefined) {
            this.setState({
                currentPage: parseInt(localStorage.getItem("selected")),
            });
            const temp = this.state.products;
            const pagesVisited =
                parseInt(localStorage.getItem("selected")) * 10;
            const products = temp.slice(pagesVisited, pagesVisited + 10);
            this.setState({ tempproducts: products });
        } else {
            const temp = this.state.products;
            const tempproducts = temp.slice(0, 11);
            this.setState({ tempproducts: tempproducts });
        }

        this.setState({ loaded: true });
    };
    componentDidUpdate = async (prevProps, prevState) => {
        const { category } = this.props.match.params;

        if (category != this.state.category) {
            localStorage.setItem("category", category);

            localStorage.removeItem("selected");

            const products = await axios.get(`/products/${category}`);
            const subcategory = await axios.get(`/subcategory/${category}`);
            if (subcategory.data.length > 0) {
                this.setState({
                    subcategory: subcategory.data,
                });
            } else {
                this.setState({
                    subcategory: [],
                });
            }

            this.setState({ products: products.data });
            this.setState({ category: category });
        }
        if (prevState.products != this.state.products) {
            this.setState({ currentPage: 0 });

            const temp = this.state.products;
            const tempproducts = temp.slice(0, 11);
            this.setState({ tempproducts: tempproducts });

            const pagecount = Math.ceil(this.state.products.length / 10);
            this.setState({ pageCount: pagecount });
        }
    };

    handleSubcategory = async (e) => {
        if (e.target.value == "lth") {
            let products = this.state.products;

            products = products.sort((a, b) =>
                parseInt(a.price.replaceAll(",", "")) >
                parseInt(b.price.replaceAll(",", ""))
                    ? 1
                    : -1
            );

            this.setState({ products: products });
            this.setState({ currentPage: 0 });

            const temp = this.state.products;
            const tempproducts = temp.slice(0, 11);
            this.setState({ tempproducts: tempproducts });

            const pagecount = Math.ceil(this.state.products.length / 10);
            this.setState({ pageCount: pagecount });
        } else if (e.target.value == "htl") {
            let products = this.state.products;

            products = products.sort((a, b) =>
                parseInt(a.price.replaceAll(",", "")) <
                parseInt(b.price.replaceAll(",", ""))
                    ? 1
                    : -1
            );

            this.setState({ products: products });
            this.setState({ currentPage: 0 });

            const temp = this.state.products;
            const tempproducts = temp.slice(0, 11);
            this.setState({ tempproducts: tempproducts });

            const pagecount = Math.ceil(this.state.products.length / 10);
            this.setState({ pageCount: pagecount });
        } else if (e.target.value == "filter") {
            window.location.reload();
        } else {
            const products = await axios.get(
                `/products/${this.state.category}/${e.target.value}`
            );
            this.setState({ products: products.data });
        }
    };

    handleChange = (e) => {
        localStorage.setItem("selected", e.selected);
        this.setState({ currentPage: e.selected });
        const temp = this.state.products;
        const pagesVisited = e.selected * 10;
        const products = temp.slice(pagesVisited, pagesVisited + 10);
        this.setState({ tempproducts: products });
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

            this.setState({ cart: addtocart.data.cart });
            localStorage.setItem("cart", addtocart.data.cart);
        } else {
            this.setState({ openlogin: true });
        }
    };

    handleIncrement = (name) => {
        let newState = {};

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
                    <h3 id="heading">{this.state.category}</h3>

                    {!this.state.loaded ? (
                        <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    ) : null}
                    <select
                        class="form-select"
                        id="sub-select-mobile"
                        aria-label="Default select example"
                        onChange={(e) => {
                            this.handleSubcategory(e);
                        }}
                    >
                        <option selected value="filter">
                            Filter
                        </option>
                        {this.state.subcategory != null
                            ? this.state.subcategory.map((sub) => (
                                  <option value={sub}>{sub}</option>
                              ))
                            : null}
                        <option value="lth">Price: low to high</option>
                        <option value="htl">Price: high to low</option>
                    </select>
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
                        <Container id="productpage">
                            {this.state.tempproducts.length > 0
                                ? this.state.tempproducts.map((product) => (
                                      <div
                                          class="card"
                                          id="cart-card"
                                          key={product.name}
                                      >
                                          {/* <img src={img} id="percent" /> */}

                                          <ZoomOutMapIcon
                                              id="zooms"
                                              className="zoom"
                                              onClick={() => {
                                                  this.handleZoom(
                                                      product.image_src
                                                  );
                                              }}
                                          />
                                          <div id="cart-card-img">
                                              <img
                                                  src={product.image_src}
                                                  class="card-img-top"
                                                  id="cart-imgs"
                                                  alt="NO IMAGE"
                                              />
                                          </div>
                                          <div class="cart-card-body">
                                              <h5 class="cart-card-title">
                                                  {product.name}
                                              </h5>
                                              <h6
                                                  id="price"
                                                  style={{
                                                      textDecoration:
                                                          "line-through",
                                                  }}
                                              >
                                                  Rs.{product.price}
                                              </h6>

                                              <h5 id="price">
                                                  Rs.
                                                  {(
                                                      parseInt(
                                                          product.price.replaceAll(
                                                              ",",
                                                              ""
                                                          )
                                                      ) -
                                                      (parseInt(
                                                          product.price.replaceAll(
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
                                                              product.name
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
                                                              product.name
                                                          ]
                                                      }
                                                  ></input>
                                                  <Button
                                                      id="btn-inc"
                                                      onClick={() => {
                                                          this.handleDecrement(
                                                              product.name
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
                                                          product.name
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
                            forcePage={this.state.currentPage}
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

                {/* DESKTOP VIEW */}
                <div id="main-furniture">
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

                    <h3 id="heading">{this.state.category}</h3>

                    {!this.state.loaded ? (
                        <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    ) : null}

                    <select
                        class="form-select"
                        id="sub-select"
                        aria-label="Default select example"
                        onChange={(e) => {
                            this.handleSubcategory(e);
                        }}
                    >
                        <option selected value="filter">
                            Filter
                        </option>
                        {this.state.subcategory != null
                            ? this.state.subcategory.map((sub) => (
                                  <option value={sub}>{sub}</option>
                              ))
                            : null}
                        <option value="lth">Price: low to high</option>
                        <option value="htl">Price: high to low</option>
                    </select>

                    <div id="product-container">
                        {this.state.tempproducts.length > 0
                            ? this.state.tempproducts.map((product) => (
                                  <div
                                      class="card"
                                      id="card"
                                      key={product.name}
                                  >
                                      {/* <img src={img} id="percent" /> */}
                                      <ZoomOutMapIcon
                                          id="zooms"
                                          className="zoom"
                                          onClick={() => {
                                              this.handleZoom(
                                                  product.image_src
                                              );
                                          }}
                                      />
                                      <div id="card-img">
                                          <div id={`${product.name}-img`}>
                                              <img
                                                  src={product.image_src}
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
                                              {product.name}
                                          </h4>
                                          <div id="price-div">
                                              <h6
                                                  id="price"
                                                  style={{
                                                      textDecoration:
                                                          "line-through",
                                                  }}
                                              >
                                                  Rs.
                                                  {parseInt(
                                                      product.price.replaceAll(
                                                          ",",
                                                          ""
                                                      )
                                                  ).toLocaleString("en-US")}
                                              </h6>

                                              <h5 id="price">
                                                  Rs.
                                                  {Math.round(
                                                      parseInt(
                                                          product.price.replaceAll(
                                                              ",",
                                                              ""
                                                          )
                                                      ) -
                                                          (parseInt(
                                                              product.price.replaceAll(
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
                                                          product.name
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
                                                      this.state[product.name]
                                                  }
                                              ></input>
                                              <Button
                                                  id="btn-inc"
                                                  onClick={() => {
                                                      this.handleDecrement(
                                                          product.name
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
                                                  this.addtocart(product.name);
                                              }}
                                          >
                                              Add to cart
                                          </button>
                                      </div>
                                  </div>
                              ))
                            : null}
                    </div>

                    {this.state.pageCount > 0 ? (
                        <ReactPaginate
                            pageCount={this.state.pageCount}
                            onPageChange={(e) => {
                                this.handleChange(e);
                            }}
                            forcePage={this.state.currentPage}
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
