import React, { Component } from 'react';
import getAllProducts from './Api';
import './Shop.scss';
import Product from './Product';


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: []
    }
  }

  async componentDidMount() {
    const allProducts = await getAllProducts();
    this.setState({ allProducts: allProducts });
  }

  render() {
    var { allProducts } = this.state;
    return (
      <div className="products-container">
      {allProducts.map(p => <Product key={p.id} id={p.id} name={p.name} price={p.price} />)}
      </div>
    );
  }
}

export default Shop;