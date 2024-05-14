import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../UI/components/modal/modal"
import { ButtonCatPrimary, ButtonCatTransparent } from "../UI/objects/buttons"

export const ModalDeletePlayer = ({ state, setState, playerDelete }) => {
  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      {state &&
        <ModalContainer>
          <ModalContent__Small>
            <ModalBody
              className='cm-u-spacer-mb-bigger'>
                <h3 className="cm-u-text-black-cat">{`¿Estas seguro de borrar a ${editPlayerContext.playerDataDetails?.desc_nombre} ${editPlayerContext.playerDataDetails?.desc_apellido1}?`}</h3>
              </ModalBody>
            <ModalFooter>
              <ButtonCatTransparent
                onClick={() => setState(!state)}>
                  Cancelar
              </ButtonCatTransparent>
              <ButtonCatPrimary
                onClick={playerDelete}>
                Borrar jugador
              </ButtonCatPrimary>
            </ModalFooter>
          </ModalContent__Small>
        </ModalContainer>
      }
    </>
  )
}