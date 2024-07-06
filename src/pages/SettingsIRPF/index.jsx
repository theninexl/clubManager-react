import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSaveData } from "../../hooks/useSaveData";
import { useGetData } from "../../hooks/useGetData";
import { AsideMenu } from "../../components/AsideMenu";
import { HalfContainer, HalfContainerAside, HalfContainerBody } from "../../components/UI/layout/containers";
import { CentralBody, CentralBody__Header, HeadContent, HeadContentTitleBar, TitleBar__Title } from "../../components/UI/layout/centralContentComponents";
import { ButtonMousePrimary } from "../../components/UI/objects/buttons";
import { FormSimplePanel, FormSimplePanelRow, FormSimpleRow, LabelElementAssist, LabelElementNumber, LabelElementNumberAssist, LabelElementToggle, LabelSelectElementAssist } from "../../components/UI/components/form simple/formSimple";
import { FormTabs, FormTabs__ContentWrapper, TabContent } from "../../components/UI/components/formTabs/formTabs";
import { TableDataRow } from "../../components/UI/layout/tableData";


export default function SettingsIRPFpage () {
  //navegar
  const navigate = useNavigate();

  //estados locales
  const [seasonsList, setSeasonsList] = useState();
  const [seasonSelected, setSeasonSelected] = useState({
    desc_anyo_fiscal:'',
    flag_residencia:0,
  })
  const [seasonDetails, setSeasonDetails] = useState([]);
  //error formulario
  const [errorFirstLoad, setErrorFirstLoad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setErrorFirstLoad(null);
    getSeasonsList();
  },[])

  useEffect(()=>{
    if (seasonSelected.desc_anyo_fiscal != '') {
      getSeasonDetails(seasonSelected.desc_anyo_fiscal,seasonSelected.flag_residencia)
    } else {
      // setError('Tienes que seleccionar una temporada');
    }
  },[seasonSelected])

  //pedir temporadas
  const getSeasons = useSaveData();

  const getSeasonsList = () => getSeasons.uploadData('/config/getTemporadas',{})

  useEffect(()=>{
    if (getSeasons.responseUpload) {
      if (getSeasons.responseUpload.status == "ok") {
        // console.log(getSeasons.responseUpload)
        setSeasonsList(getSeasons.responseUpload.data);
      } else {
        setErrorFirstLoad('No hay datos disponibles, vuelve a intentarlo más tarde')
      }
    }
  },[getSeasons.responseUpload])
  

  //pedir detalle de temporadas
  const getSeasonDetail = useSaveData();

  const getSeasonDetails = (season, residencia) => {
    getSeasonDetail.uploadData('config/getTemporadaDetail',{'desc_anyo_fiscal':season, 'flag_residencia':residencia})
  }
  
  useEffect (() => {
    if (getSeasonDetail.responseUpload) {
      if (getSeasonDetail.responseUpload.status == 'ok') {
        setSeasonDetails(getSeasonDetail.responseUpload.data[0])
      } else {
        setError('No hay datos para la temporada seleccionada. Selecciona otra o vuelve más tarde.');
        setSeasonDetails([])

      }
    }    
  },[getSeasonDetail.responseUpload])

  //hook guardar datos      
  const updateSeason = useSaveData();

  const handleUpdateSeasonSettings = (e) => {
    e.preventDefault();
    updateSeason.uploadData('/config/updateTemporada',{'id_conf':seasonDetails.id_conf, 'flag_residencia':seasonDetails.flag_residencia, 'val_pct_irpf_aplicable':seasonDetails.val_pct_irpf_aplicable});
    }

  useEffect (() => {
    if (updateSeason.responseUpload) {
      if (updateSeason.responseUpload.status == 'ok'){
        //console.log(updateSeason.responseUpload);
        setError('Los datos se han guardado correctamente');
        setSeasonsList();
        setSeasonSelected({
          desc_anyo_fiscal:'',
          flag_residencia:0,
        })
        setSeasonDetails([]);
        getSeasonsList();
      }
    }    
  },[updateSeason.responseUpload])


  return (
    <>
      <HalfContainer  id='usersList'>
        <HalfContainerAside>
          <AsideMenu />
        </HalfContainerAside>
        <HalfContainerBody className='cm-u-spacer-mt-medium'>
          <HeadContent>
            <HeadContentTitleBar>
              <TitleBar__Title>Configuración IRPF</TitleBar__Title>
            </HeadContentTitleBar>
          </HeadContent>

          <CentralBody>
            <CentralBody__Header>Opciones</CentralBody__Header>
            <FormSimplePanel
              autoComplete='off'>
                <FormTabs>
                {errorFirstLoad ?
                  <TableDataRow  className='cm-u-centerText'>
                    <span className='error'>{errorFirstLoad}</span>
                  </TableDataRow>
                  :
                  <>
                    <FormTabs__ContentWrapper>
                      <TabContent>
                        <FormSimplePanelRow>
                          <LabelSelectElementAssist
                            htmlFor='newUserDepartment'
                            labelText='Temporadas'
                            assistanceText=''
                            handleOnChange={(e) => {
                              if (e.target.selectedOptions[0].value != '') {
                                // console.log('remporada:',e.target.selectedOptions[0].value)
                                const oldSeasonSelected = {...seasonSelected};
                                oldSeasonSelected['desc_anyo_fiscal'] = e.target.selectedOptions[0].value;
                                setSeasonSelected(oldSeasonSelected)
                                // getSeasonDetails(e.target.selectedOptions[0].value)
                              } else {
                                setSeasonDetails([])
                              }
                            }}
                            >
                              <option value=''>Selecciona</option>
                              { seasonsList?.map(item => {
                                  return (
                                    <option key={item.id_conf} value={item.id_conf}>{item.desc_anyo_fiscal}</option>
                                  )
                                })}
                          </LabelSelectElementAssist>
                        </FormSimplePanelRow>
                        <FormSimplePanelRow>
                          <LabelElementToggle
                            htmlFor='seasonResidencia'
                            checked={(seasonSelected.flag_residencia === 1 || seasonSelected.flag_residencia === '1' || seasonSelected.flag_residencia === true) ? 'checked':''}
                            handleOnChange={e => {
                              const checked = e.target.checked === true ? 1 : 0;
                              const oldSeasonSelected = {...seasonSelected};
                              oldSeasonSelected['flag_residencia'] = checked;
                              setSeasonSelected(oldSeasonSelected)  
                              //setSeasonDetails({...seasonDetails, flag_residencia: checked})
                              }}
                            >
                            Permiso residencia
                          </LabelElementToggle>
                        </FormSimplePanelRow>
                        { Object.keys(seasonDetails).length > 0 ?
                          <>
                             
                              <FormSimplePanelRow>
                                <LabelElementNumberAssist
                                  htmlFor='seasonIRPF'
                                  suffix={'%'}
                                  type='text'
                                  className='panel-field-long'
                                  autoComplete='off'
                                  placeholder='Cantidad expresada en %'
                                  value={seasonDetails.val_pct_irpf_aplicable ? seasonDetails.val_pct_irpf_aplicable : ''}
                                  handleOnChange={values => {
                                    setSeasonDetails({...seasonDetails, val_pct_irpf_aplicable: Number(values.value)})}}
                                  >
                                  IRPF
                                </LabelElementNumberAssist>
                              </FormSimplePanelRow>
                              <FormSimplePanelRow className='cm-u-centerText cm-u-spacer-mb-huge'>                                              
                                <ButtonMousePrimary
                                  onClick={handleUpdateSeasonSettings}
                                  >
                                  Actualizar
                                </ButtonMousePrimary>           
                              </FormSimplePanelRow>
                          </>
                          :
                          <>
                            {error &&
                              <FormSimpleRow className='cm-u-centerText'>
                                <span className='error'>{error}</span>
                              </FormSimpleRow>
                            }
                          </>
                        }
                      </TabContent>
                    </FormTabs__ContentWrapper>
                  </>
                }
                </FormTabs>
            </FormSimplePanel>
          </CentralBody>
        </HalfContainerBody>
      </HalfContainer>
    </>
  );
}