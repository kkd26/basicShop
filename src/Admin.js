import React, { Component } from 'react';
import Select from 'react-select'
import { addProduct, addCategory, addGroup } from './Api';

const PRODUCT_TYPE = 'product_type', CATEGORY_TYPE = 'category_type', GROUP_TYPE = 'group_type';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProduct: {},
      newCategory: {},
      newGroup: {}
    }

    this.updateData = props.updateData;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.type === "file" ? target.files[0] : target.value;
    const name = target.name.replace(/^(add-|cat-|group-)/, "");
    const form = target.closest("form");
    const type = form.getAttribute("data-type");
    const itemName = type === PRODUCT_TYPE ? "newProduct" : type === CATEGORY_TYPE ? "newCategory" : "newGroup";

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
    const itemName = type === PRODUCT_TYPE ? "newProduct" : type === CATEGORY_TYPE ? "newCategory" : "newGroup";
    const handler = type === PRODUCT_TYPE ? addProduct : type === CATEGORY_TYPE ? addCategory : addGroup;
    await handler(this.state[itemName]);
    this.setState({ [itemName]: {} }, () => this.updateData());
  }

  handleSelect(options, meta) {
    console.log(meta, options);
    const name = meta.name;
    const data = name === "group" ? options.value : options ? options.map(e => e.value) : [];
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        [name]: data
      }
    })
  }

  render() {
    const catOptions = this.props.allCategories.map(cat => { return { value: cat._id, label: cat.name } });
    const groupOptions = this.props.allGroups.map(group => { return { value: group._id, label: group.name } });

    return (<>
      <form data-type={PRODUCT_TYPE} className="product" onSubmit={this.handleSubmit}>
        <h3>Add product</h3>
        <label htmlFor="add-name">Name:</label>
        <input id="add-name" name="add-name" type="text" onChange={this.handleChange} />
        <label htmlFor="add-price">Price:</label>
        <input id="add-price" name="add-price" type="number" step=".01" onChange={this.handleChange} />
        {/* <label htmlFor="add-image">Image:</label>
      <input id="add-image" name="add-image" type="file" onChange={this.handleChange.bind(this)} /> */}
        <label htmlFor="group">Group:</label>
        <Select
          name="group"
          options={groupOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(options, meta) => this.handleSelect(options, meta)}
        />
        <label htmlFor="categories">Categories:</label>
        <Select
          isMulti
          name="categories"
          options={catOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(options, meta) => this.handleSelect(options, meta)}
        />
        <input id="add-submit" type="submit" value="Submit" />
      </form>

      <form data-type={CATEGORY_TYPE} className="product" onSubmit={this.handleSubmit}>
        <h3>Add Category</h3>
        <label htmlFor="cat-name">Name:</label>
        <input id="cat-name" name="cat-name" type="text" onChange={this.handleChange} />
        <input id="cat-submit" type="submit" value="Submit" />
      </form>

      <form data-type={GROUP_TYPE} className="product" onSubmit={this.handleSubmit}>
        <h3>Add Group</h3>
        <label htmlFor="group-name">Name:</label>
        <input id="group-name" name="group-name" type="text" onChange={this.handleChange} />
        <input id="group-submit" type="submit" value="Submit" />
      </form>
    </>);
  }
}

export default Admin;