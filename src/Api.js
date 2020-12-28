import axios from 'axios';

const API_URL = 'http://localhost/api'

const getAllProducts = async () => {
    const res = await axios.get(API_URL + '/products');
    console.log(res);
    return res.data;
}

const addProduct = async (product) => {
    axios.post(API_URL + '/products', product);
}

export default getAllProducts;