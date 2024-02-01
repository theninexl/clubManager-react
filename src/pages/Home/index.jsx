import { useGlobalContext } from "../../providers/globalContextProvider";
import { MainNavbar } from "../../components/AppComponents/MainNavbar";

export default function Home () {
  //guardar contexto global
  const context = useGlobalContext();
  

  return (
    <>
      <MainNavbar />
      Estoy en la Home porque estoy logueado
    </>
  );
}