import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";

export default function Home () {
  //esta página está vacía
  return (
    <>    
      <HalfContainer>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody>
          <></>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}