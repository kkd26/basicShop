import React, {Component} from 'react';
import './Product.scss';

class Product extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {id, name, price} = this.props;
        return (
            <div className="product">
                <div className="name">{name}</div>
                <div className="price">{price}</div>
            </div>
        );
    }
}

export default Product;