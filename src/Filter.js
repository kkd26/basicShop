import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.filterProducts = props.filterProducts;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.checked }, () => {
      var arr = [];
      for (const id in this.state) {
        if (Object.hasOwnProperty.call(this.state, id)) {
          const element = this.state[id];
          if (element) arr.push(id);
        }
      }
      this.filterProducts(arr);
    });
  };

  render() {
    const { allCategories } = this.props;
    return (
      <FormGroup className="filter">
        {allCategories.map(cat =>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state[cat._id] ? true : false}
                onChange={this.handleChange.bind(this)}
                name={cat._id}
                value={cat._id}
                color="primary"
              />
            }
            key={cat._id}
            label={cat.name}
          />)}
      </FormGroup>
    );
  }
}

export default Filter;
