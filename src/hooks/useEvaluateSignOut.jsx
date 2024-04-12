import { useGlobalContext } from "../providers/globalContextProvider";

export const useEvaluateSignOut = () => {
  //guardar contexto global
    const context = useGlobalContext();

    const signOUT = localStorage.getItem('CMSign-out');
    const parsedSignOut = JSON.parse(signOUT);
    const isUserSignedOut = context.signOut || parsedSignOut;

   return {isUserSignedOut} 
}