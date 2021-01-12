import React, { Component } from 'react';
import Product from './Product';

class ProductGroup extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = props.deleteProduct;
    this.categoriesNamesFromIds = props.categoriesNamesFromIds;
  }

  render() {
    const { products, groupName } = this.props;
    return (
      <div className="product-group">
        <h1>{groupName}</h1>
        <div className="products-container">
          {products.map(p => {
            return <Product
              key={p._id}
              id={p._id}
              name={p.name}
              price={p.price}
              categories={this.categoriesNamesFromIds(p.categories ?? [])}
              deleteProduct={this.deleteProduct}
            />;
          })
          }
        </div>
      </div>
    );
  }
}

export default ProductGroup;