import { InitializeLocalStorage } from "../providers/globalContextProvider";
import { Api } from "./api";

InitializeLocalStorage();

//guardar token peticiones
const account = localStorage.getItem('CMAccount');
const parsedAccount = JSON.parse(account);
const token = parsedAccount.token;

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': token,
}

//getData
export const getData = async (endpoint, search, pagenumber, rowspage, order, token) => {    
  const { data } = await Api.call.post(endpoint, {
    "search":search,
    "pagenumber":pagenumber,
    "rowspage":rowspage,
    "orderby":order
  },{ headers: {
    'Content-Type': 'application/json',
    'x-access-token': token,
  }})
  return data;
}

//get Data without parameters
export const getSimpleData = async (endpoint, token) => {
  const { data } = await Api.call.post(endpoint, {},{ headers:{
    'Content-Type': 'application/json',
    'x-access-token': token,
  }})
  return data;
}