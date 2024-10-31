import { useEditPlayerDataContext } from "../../providers/EditPlayeProvider";
import { ModalBody, ModalContainer, ModalContent__Small, ModalFooter } from "../UI/components/modal/modal"
import { ButtonCatPrimary, ButtonCatTransparent } from "../UI/objects/buttons"

export const ModalConfirmPlayerAction = ({ state, setState, msgText, action, actionMsg }) => {
  const editPlayerContext = useEditPlayerDataContext();

  return (
    <>
      {state &&
        <ModalContainer>
          <ModalContent__Small>
            <ModalBody
              className='cm-u-spacer-mb-bigger'>
                <h3 className="cm-u-text-black-cat">{ msgText }</h3>
              </ModalBody>
            <ModalFooter>
              <ButtonCatTransparent
                onClick={() => setState(!state)}>
                  Cancelar
              </ButtonCatTransparent>
              <ButtonCatPrimary
                onClick={() => {
                  action();
                  setState(!state);
                }}>
                { actionMsg }
              </ButtonCatPrimary>
            </ModalFooter>
          </ModalContent__Small>
        </ModalContainer>
      }
    </>
  )
}