import axios from 'axios';

const API_URL = 'http://localhost/api'

export const getAllProducts = async () => {
    const res = await axios.get(API_URL + '/products');
    console.log(res);
    return res.data;
}

export const addProduct = async (product) => {
    axios.post(API_URL + '/products', product);
}