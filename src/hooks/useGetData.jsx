import { useEffect, useState } from "react";
import { Api } from "../services/api";

export const useGetData = (token, endpoint, search, pagenumber, rowspage, orderby) => {
  const [data, setData] = useState(null);

  useEffect(()=> {    
    const headers = {
      'Content-Type': 'application/json',
      'x-access-token': token,
    }

    Api.call.post(endpoint, {'search':search, 'pagenumber':pagenumber, 'rowspage':rowspage, 'orderby':orderby},{ headers:headers })
    .then (res => {
      setData(res.data);
    })
    .catch (err => console.log(err));
    
  },[])

  return { data };
}