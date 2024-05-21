import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { BasicTable } from "./BasicTable";
import { TanStack } from "./tanStack";

export default function Home () {
  //esta página está vacía


  

  return (
    <>    
      <HalfContainer>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody>
          <>
            <BasicTable />
          </>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}