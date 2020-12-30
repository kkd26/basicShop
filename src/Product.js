import React, {Component} from 'react';
import { FaTimes } from "react-icons/fa";
import { deleteProduct } from './Api';
import './Product.scss';

class Product extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {id, name, price} = this.props;
        return (
            <div className="product">
                <FaTimes className="delete-button" onClick={() => this.props.deleteProduct(id)}/>  
                <div className="name">{name}</div>
                <div className="price">{price}</div>
            </div>
        );
    }
}

export default Product;