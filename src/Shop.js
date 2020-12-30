import React, { Component } from 'react';
import { getAllProducts, addProduct, deleteProduct, addCategory, getAllCategories } from './Api';
import './Shop.scss';
import Product from './Product';
import Select from 'react-select'

const PRODUCT_TYPE = 'product_type', CATEGORY_TYPE = 'category_type';


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      allCategories: [],
      newProduct: {},
      newCategory: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async componentDidMount() {
    this.updateData();
  }

  async updateData() {
    const allProducts = await getAllProducts();
    const allCategories = await getAllCategories();
    this.setState({ allProducts: allProducts, allCategories: allCategories });
  }

  async deleteProduct(id) {
    await deleteProduct(id);
    this.updateData();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.type === "file" ? target.files[0] : target.value;
    const name = target.name.replace(/^(add-|cat-)/, "");
    const form = target.closest("form");
    const type = form.getAttribute("data-type");
    const itemName = type === PRODUCT_TYPE ? "newProduct" : "newCategory";

    this.setState({
      [itemName]: {
        ...this.state[itemName],
        [name]: value
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    target.reset();
    const type = target.getAttribute("data-type");
    const itemName = type === PRODUCT_TYPE ? "newProduct" : "newCategory";
    const handler = type === PRODUCT_TYPE ? addProduct : addCategory;
    await handler(this.state[itemName]);
    this.setState({ [itemName]: {} });
    this.updateData();
  }

  handleSelect(options) {
    const data = options ? options.map(e => e.value) : [];
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        categories: data
      }
    })
  }

  render() {
    var { allProducts } = this.state;
    const catOptions = this.state.allCategories.map(cat => { return { value: cat._id, label: cat.name } });
    return (
      <>
        <div className="products-container">
          {allProducts.map(p =>
            <Product
              key={p._id}
              id={p._id}
              name={p.name}
              price={p.price}
              deleteProduct={this.deleteProduct}
            />)}
        </div>

        <form data-type={PRODUCT_TYPE} className="product" onSubmit={this.handleSubmit}>
          <h3>Add product</h3>
          <label htmlFor="add-name">Name:</label>
          <input id="add-name" name="add-name" type="text" onChange={this.handleChange} />
          <label htmlFor="add-price">Price:</label>
          <input id="add-price" name="add-price" type="number" step=".01" onChange={this.handleChange} />
          {/* <label htmlFor="add-image">Image:</label>
      <input id="add-image" name="add-image" type="file" onChange={this.handleChange.bind(this)} /> */}
          <Select
            isMulti
            name="categories"
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(options) => this.handleSelect(options)}
          />
          <input id="add-submit" type="submit" value="Submit" />
        </form>

        <form data-type={CATEGORY_TYPE} className="product" onSubmit={this.handleSubmit}>
          <h3>Add Category</h3>
          <label htmlFor="cat-name">Name:</label>
          <input id="cat-name" name="cat-name" type="text" onChange={this.handleChange} />
          <input id="cat-submit" type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default Shop;