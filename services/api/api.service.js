import { fetch } from "../fetch.services";
import { API_PATH, GOOGLE_API_PATH } from "../../constants/path"
import { AUTH_TOKEN, GOOGLE_API_KEY } from '../../constants/token'

export const CategoriesService = () => {
  return fetch("get", API_PATH + `categories`, {}, {});
}

export const ProductService = () => {
  return fetch("get", API_PATH + `products`, {}, {});
}

export const ProductServiceById = (id) => {
  return fetch("get", API_PATH + `products`, {}, {});
}

export const ProductByCategoryId = (id) => {
  return fetch("get", API_PATH + `productbyCatId&category_id=${id}`, {}, {});
}

export const getGeoLocation = (lat, long) => {
  return fetch("get", GOOGLE_API_PATH + `latlng=${lat},${long}&key=${GOOGLE_API_KEY}`, {}, {});
}

export const getGeoLocationAddress = (address) => {
  return fetch("get", GOOGLE_API_PATH + `address=${address}&sensor=true&key=${GOOGLE_API_KEY}`, {}, {});
}

export const Savechat = (udi, msg, product_id, product_owner_id) => {
  return fetch("get", API_PATH + `saveChat&uid=${udi}&message=${msg}&product_id=${product_id}&product_owner_id=${product_owner_id}`, {}, {});
}

export const ViewChat = (params) => {
  return fetch("get", API_PATH + `viewChatLogsUser&uid=${params}`, {}, {});
}

export const SavePost = (options) => {
  return fetch("post", API_PATH + `savePost`, JSON.stringify(options), {});
}

export const coustomerProfile = (params) => {
  return fetch("get", API_PATH + `customerProfile&uid=${params}`, {}, {});
}

export const UpdatePost = (options) => {
  return fetch("post", API_PATH + `updatePost`, JSON.stringify(options), {});
}
export const updateProfile = (options) => {
  return fetch("post", API_PATH + `profileUpdate`, JSON.stringify(options), {}
  );
}
export const ViewChatData = (params) => {
  return fetch("get", API_PATH + `viewChatLogs&uid=${params}`, {}, {});
}
export const userRegistration = (options) => {
  return fetch("post", API_PATH + `customerReg`, JSON.stringify(options), {});
}
export const SaveChat = (options) => {
  return fetch("post", API_PATH + `saveChat`, JSON.stringify(options), {});
}
export const CustomerName = (params) => {
  return fetch("get", API_PATH + `customerNames&uid=${params}`, {}, {});
}

export const ProductsByProductId = (product_id) => {
  return fetch("get", API_PATH + `productbyProdId&product_id=${product_id}`, {}, {});
}
export const informationDetails = (p_id) => {
  return fetch("get", API_PATH + `InformationDetails&page_id=${p_id}`, {}, {});
}
export const informationPage = () => {
  return fetch("get", API_PATH + 'InformationPages', {}, {});
}
export const ProductServiceByCustomerId = (customer_id) => {
  return fetch("get", API_PATH + `productbyCustomerId&customer_id=${customer_id}`, {}, {});
}
export const authTokenExpiration = (token_Id) => {
  return fetch("get", API_PATH + `logout&sessToken=${token_Id}`, {}, {});
}
export const deletePost = (product_Id) => {
  return fetch("get", API_PATH + `deletePost&product_id=${product_Id}`, {}, {});
}
