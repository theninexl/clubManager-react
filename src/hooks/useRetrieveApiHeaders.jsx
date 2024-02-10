import { useGlobalContext } from "../providers/globalContextProvider";

export const useRetrieveApiHeaders = () => {
  //contexto global
  const context = useGlobalContext();

  //guardar token peticiones
  const account = localStorage.getItem('CMAccount');
  const parsedAccount = JSON.parse(account);
  const token = context.account.token || parsedAccount.token

  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': token
  }

  return {headers}
}