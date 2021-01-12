import axios from 'axios';

const API_URL = '/api'

export const getAllProducts = async () => {
    const res = await axios.get(API_URL + '/products');
    return res.data;
}

export const addProduct = async (product) => {
    await axios.post(API_URL + '/products', product);
}

export const deleteProduct = async (id) => {
    await axios.delete(API_URL + `/products/${id}`);
}

export const getAllCategories = async () => {
    const res = await axios.get(API_URL + '/categories');
    return res.data;
}

export const getAllGroups = async () => {
    const res = await axios.get(API_URL + '/groups');
    return res.data;
}

export const addCategory = async (category) => {
    await axios.post(API_URL + '/categories', category);
}

export const addGroup = async (group) => {
    await axios.post(API_URL + '/groups', group);
} 