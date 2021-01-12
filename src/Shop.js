import React, { Component } from 'react';
import { getAllProducts, getAllCategories, getAllGroups, deleteProduct } from './Api';
import './Shop.scss';
import Admin from './Admin';
import Filter from './Filter';
import ProductGroup from './ProductGroup';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      allCategories: [],
      allGroups: [],
      filteredProducts: [],
      checkedCategories: []
    }

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async componentDidMount() {
    this.updateData();
  }

  async updateData() {
    const allProducts = await getAllProducts();
    const allCategories = await getAllCategories();
    const allGroups = await getAllGroups();
    var checked = this.state.checkedCategories;
    console.log(checked, this.state.checkedCategories);
    this.setState(
      { allProducts: allProducts, allCategories: allCategories, allGroups: allGroups, checkedCategories: checked },
      () => this.filterProducts(checked)
    );
  }

  filterProducts(arr) {
    console.log(arr, this.state.allProducts);
    var filteredProducts = this.state.allProducts.filter(prod => {
      const categories = prod.categories ? prod.categories : [];
      return arr.some(item => categories.indexOf(item) !== -1);
    });

    if (arr.length === 0) filteredProducts = [...this.state.allProducts];

    this.setState({ checkedCategories: arr, filteredProducts: filteredProducts });
  }

  async deleteProduct(id) {
    await deleteProduct(id);
    this.updateData();
  }

  categoriesNamesFromIds(arr) {
    const { allCategories } = this.state;
    return allCategories.filter(cat => arr.indexOf(cat._id) !== -1).map(cat => cat.name);
  }

  groupProductsById(products, groupId) {
    return products.filter(product => {
      console.log(product);
      return product.group === groupId;
    });
  }

  render() {
    const { filteredProducts, allCategories, allGroups } = this.state;

    return (
      <>
        <div className="two-columns">
          <Filter
            allCategories={allCategories}
            filterProducts={this.filterProducts.bind(this)}
          />

          {allGroups.map(group =>
            <ProductGroup
              products={this.groupProductsById(filteredProducts, group._id)}
              groupName={group.name}
              categoriesNamesFromIds={this.categoriesNamesFromIds.bind(this)}
              deleteProduct={this.deleteProduct}
            />)
          }
        </div>

        <Admin
          allCategories={allCategories}
          allGroups={allGroups}
          updateData={this.updateData.bind(this)}
        />
      </>
    );
  }
}

export default Shop;