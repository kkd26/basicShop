import axios from 'axios';

const API_URL = '/api'

//TODO: Need to add Bearer authorization when sending any request

export const addAuthHeaders = (token) => {
  if (!token) return;
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

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

export const signUp = async (user) => {
  await axios.post(API_URL + '/user', user);
}

export const signIn = async (user) => {
  const res = await axios.post(API_URL + '/user/login', user);
  if (res.data && res.data.accessToken) {
    setCookie("jwt", res.data.accessToken);
    console.log(res.data.accessToken);
    addAuthHeaders(res.data.accessToken);
  }
}

export const signOut = () => {
  setCookie("jwt", "", -1);
}

/**
 * Set a cookie with an expiry value.
 * @param {String} cname cookie name
 * @param {String} cvalue cookie value
 * @param {String} exdays number of days to expire
 */
const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get a cookie value by name. If cookie doesn't exist returns undefined.
 * @param {String} cname cookie name
 */
export const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (var cookie of cookieArray) {
    cookie = cookie.trimStart();
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length);
    }
  }
  return undefined;
}