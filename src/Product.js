import React, {Component} from 'react';
import { FaTimes } from "react-icons/fa";
import './Product.scss';

class Product extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {id, name, price, categories} = this.props;
        console.log(categories);
        return (
            <div className="product">
                <FaTimes className="delete-button" onClick={() => this.props.deleteProduct(id)}/>  
                <div className="name">{name}</div>
                <div className="price">PRICE: {price ?? "NaN"}</div>
                [{categories.join(',')}]
            </div>
        );
    }
}

export default Product;