import axios from 'axios';

const API_URL = '/api'

export const getAllProducts = async () => {
    const res = await axios.get(API_URL + '/products');
    console.log(res);
    return res.data;
}

export const addProduct = async (product) => {
    await axios.post(API_URL + '/products', product);
}

export const deleteProduct = async (id) => {
    await axios.delete(API_URL + `/products/${id}`);
}