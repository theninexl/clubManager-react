import { useRef, useState } from "react";
import { Api } from "../../services/api";
import { useGlobalContext } from "../../providers/globalContextProvider";
import { FormSimple, FormSimpleRow, LabelElement } from "../../components/UI/components/form simple/formSimple";
import { MainContent, ThirdContainer } from "../../components/UI/layout/containers";
import { LogoShield } from "../../components/UI/objects/Logo";
import { Button } from "../../components/UI/objects/buttons";

export default function Login () {
  //guardar contexto global
  const context = useGlobalContext();
  //evalua signout
  const signOUT = localStorage.getItem('CMSign-out');
  const parsedSignOut = JSON.parse(signOUT);
  const isUserSignOut = context.signOut || parsedSignOut;

  // console.log('context.signOut',context.signOut);
  // console.log('parsedSignOut',parsedSignOut);
  // console.log('isUserSignOut',isUserSignOut);

  //estados locales
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  //error para form
  const [error, setError] = useState(null);
  //ref form
  const form = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      email: formData.get('loginEmail'),
      password: formData.get('loginPwd')
    }
    Api.call.post('users/login',{
      desc_email:data.email,
      password:data.password,
    })
    .then (res => {
      const stringifiedAccount = JSON.stringify(res.data);
      localStorage.setItem('CMAccount', stringifiedAccount);
      context.setAccount(res.data);
      handleSignIn()

    }).catch(err => {
      console.log(err);
      if (err.code === 'ERR_NETWORK') setError('Error en la base de datos, inténtelo más tarde')
      else if (err.response.status === 409) setError('Email o contraseña incorrectos')
      else setError('Error al realizar la solicitud')
    })
  }

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('CMSign-out', stringifiedSignOut)
    context.setSignOut(false);
  }


  return (
    <>
      <MainContent className='cm-u-centerVer'>
        <ThirdContainer>
          <div className='cm-o-logo--centered cm-u-spacer-mb-big'>
            <LogoShield />
            Club Manager
          </div>
          <FormSimple 
            className='cm-u-spacer-mb-big'
            innerRef={form} 
            autoComplete="off">
            <FormSimpleRow>
              <LabelElement
                htmlFor='loginEmail'
                type='email'
                autoComplete='off'
                >
                  Email
              </LabelElement>
            </FormSimpleRow>
            <FormSimpleRow>
              <LabelElement
                htmlFor='loginPwd'
                type='password'
                autoComplete='new-password'
                >
                  Contraseña
              </LabelElement>
            </FormSimpleRow>
            {error &&
            <FormSimpleRow className='cm-u-centerText'>
              <span className='error'>{error}</span>
            </FormSimpleRow>
            }
            <FormSimpleRow>
              <Button 
                type='submit'
                className='cm-o-button-dog--primary cm-u-centerText'
                defaultValue='Login'
                onClick={handleLogin}>Login</Button>
            </FormSimpleRow>
            
          </FormSimple>
        </ThirdContainer>
      </MainContent>
    </>
  );
}