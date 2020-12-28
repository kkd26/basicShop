import React, { Component } from 'react';
import { getAllProducts, addProduct } from './Api';
import './Shop.scss';
import Product from './Product';
import axios from 'axios';


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      newProduct: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.updateProducts();
  }

  async updateProducts() {
    const allProducts = await getAllProducts();
    this.setState({ allProducts: allProducts });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.type === "file" ? target.files[0] : target.value;
    const name = target.name.replace(/^add-/, "");

    this.setState({
      newProduct: {
        ...this.state.newProduct,
        [name]: value
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    console.log("submit");
    await addProduct(this.state.newProduct);
    this.setState({ newProduct: {} });
    this.updateProducts();
  }

  render() {
    var { allProducts } = this.state;
    return (
      <div className="products-container">
        {allProducts.map(p => <Product key={p.id} id={p.id} name={p.name} price={p.price} />)}
        <form className="product" onSubmit={this.handleSubmit}>
          <label htmlFor="add-name">Name:</label>
          <input id="add-name" name="add-name" type="text" onChange={this.handleChange} />
          <label htmlFor="add-price">Price:</label>
          <input id="add-price" name="add-price" type="number" step=".01" onChange={this.handleChange} />
          {/* <label htmlFor="add-image">Image:</label>
          <input id="add-image" name="add-image" type="file" onChange={this.handleChange.bind(this)} /> */}
          <input id="add-submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Shop;