import { Api } from "./api";

//guardar token peticiones
const account = localStorage.getItem('CMAccount');
const parsedAccount = JSON.parse(account);
const token = parsedAccount.token;

const headers = {
  'Content-Type': 'application/json',
  'x-access-token': token,
}

//getData
export const getData = async (token,endpoint, search, pagenumber, rowspage, order) => {    
  const { data } = await Api.call.post(endpoint, {
    "search":search,
    "pagenumber":pagenumber,
    "rowspage":rowspage,
    "orderby":order},
    { headers:headers })
  return data;
}

//get Data without parameters
export const getSimpleData = async (endpoint) => {
  const { data } = await Api.call.post(endpoint, {},{ headers:headers })
  return data;
}