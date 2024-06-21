import { useEffect, useState } from "react"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table"
import { useSaveData } from "../../hooks/useSaveData";
import { DATA, STATUSES } from './MOCK_DATA2'
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { EditableClauseCell } from "./EditableClauseCell";
import { EditableCell } from "./EditableCell";
import { ButtonMouse, ButtonMouseGhost, ButtonMouseTransparent, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { TableDataCls, TableDataClsBody, TableDataClsBody__cell, TableDataClsBody__row, TableDataClsHead, TableDataClsHead__cell } from "../../components/UI/layout/tableDataClassic";
import { SymbolDelete } from "../../components/UI/objects/symbols";

export const ActivePlayerTable = ({ activePlayerId, activeContractId }) => {  

  // const monthNames = [
  //   "enero", "febrero", "marzo", "abril", "mayo", "junio",
  //   "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  // ];
  const { status_initial } = STATUSES;

  const emptyLine = [{
    "flag_fixed_clausula": 0,
    "TipoClausula": '',
    "Clausulas": '',
    "Importe": { amount: '', status: STATUSES[0], flag_suma:1},
    "january/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "february/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "march/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "april/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "may/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "june/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "july/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "august/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "september/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "october/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "november/2022": { amount: '', status: STATUSES[0], flag_suma:1},
    "december/2022":{ amount: '', status: STATUSES[0], flag_suma:1},
    "january/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "february/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "march/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "april/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "may/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "june/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "july/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "august/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "september/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "october/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "november/2023": { amount: '', status: STATUSES[0], flag_suma:1},
    "december/2023":{ amount: '', status: STATUSES[0], flag_suma:1},
    "total":""
  }]  
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState([]);
  const [dynamicData,setDynamicData] = useState([]);
  const [infoForColumnDefs, setInfoForColumnDefs] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [sumaRows, setSumaRows] = useState([]);
  const [sumaCols, setSumaCols] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    'Select': false,
    'Importe': false,
  })
  const [columnPinning, setColumnPinning] = useState({
    'left': [
      'Select',
      'Clausulas',
      'Importe',

    ],
    'right': ['total'],
  })
  const [editState, setEditState] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const [rowSelected2, setRowSelected2] = useState(null);
  //estados insertables
  const [regularState, setRegularState] = useState(true);
  const [insertState, setInsertState] = useState(false);
  const [subtractState, setSubtractState] = useState(false);
  const [advancePayState, setAdvancePayState] = useState(false);
  const [deferredPayState, setDeferredPayState] = useState(false);
  const [seizureState, setSeizureState] = useState(false);
  const [insertSelectedCol,setInsertSelectedCol] = useState();
  const [insertSelectedRow, setInsertSelectedRow] = useState();
  const [cellCopy, setCellCopy] = useState([]);
  const [pasteState, setPasteState] = useState(false);
  const [cellPaste, setCellPaste] = useState([]);
  const [pastedCellState, setPastedCellState] = useState(false);
  const [insertSelectedAmount, setInsertSelectedAmount] = useState();
  const [advancePayCalc, setAdvancePayCalc] = useState();
  const [insertAmountError, setInsertAmountError] = useState();
  const [insertCanSave, setInsertCanSave] = useState(false);
  const [clauseTxt, setClauseTxt] = useState()


  //pedir datos del contrato
  const getPayments = useSaveData();

  const getPaymentsDetail = (activeContractId) => {
    console.log('solicito el contrato', activeContractId);
    getPayments.uploadData('players/calendarioRegistros',{'id_contrato':activeContractId})
  }
  
  useEffect (() => {
    if (getPayments.responseUpload) {
      if (getPayments.responseUpload.status == 'ok') {
        // console.log("tengo resultados buenos");
        // console.log(getPayments.responseUpload);
        setData(getPayments.responseUpload.registros);
        setDynamicData(getPayments.responseUpload.registros);
        setErrorMsg(null)
      } else {
        setErrorMsg('No hay datos para el contrato seleccionado, por favor selecciona otro contrato u otro jugador');
        setData([])
        setDynamicData([]);
      }
    }    
  },[getPayments.responseUpload])


  // Función para obtener todas las claves del objeto, incluso las anidadas
  const getKeys = (obj, prefix = '') => {
    let keys = [];
    for (let key in obj) {      
      if (key === 'months') {
        const objeto = obj[key]
        for ( const [key, value] of Object.entries(objeto)){
          console.log('objeto:', value.alignItems)
          //esto lo dejo aquí de cuando Javi me pasaba el value con formato Date por si acaso pero ya no es necesario
          // const ObjectValue = JSON.parse(JSON.stringify(value));
          // const valueToDate = new Date(ObjectValue.mes)
          // const monthNr = valueToDate.getMonth();
          // const yearNr = !isNaN(valueToDate.getFullYear()) ? valueToDate.getFullYear() : '';
          // const monthName = !isNaN(monthNr) ? monthNames[monthNr] : '';
          keys.push({clave:key, valor:`${value.mes}`})
        }
      }
    }
    return keys;
  };

  // Función para generar columnDefs basados en las claves
  const generateColumns = (keys) => {
    return keys.map(key => ({
      accessorKey: `months.${key.clave}`,
      header: key.valor,
      cell: EditableCell,
      // cell: info => console.log(info),
      meta: {
        subtractState,
        insertSelectedCol,
        insertSelectedRow,
        setInsertSelectedAmount,
        setCellCopy,
        setAdvancePayCalc,
        insertSelectedAmount,
        insertAmountError,
        setInsertAmountError,
        insertCanSave,
        setInsertCanSave,
        rowSelected2,
        setInsertState,
        setSubtractState,
      },
      size: 125,
    }));
  };  

  useEffect(()=>{
    if (activePlayerId != 0) {
      if (activeContractId != '' && activeContractId != undefined) {
        setData([]);
        setColumnDefs([]);
        getPaymentsDetail(activeContractId);
      } else {
        console.log('activeContractId', activeContractId)
        setData([])
      }      
    } else {
      setData([])
      setDynamicData([]);
      setInfoForColumnDefs(null);
    }

  },[activePlayerId, activeContractId])


  const sumHelper = (total, row, key) => {
    console.log('sumHelper row', row);
    let number = row.getValue(key)
    let amount = number.flag_suma == 1 ? Number(number.amount) : 0;
    amount >= 0 ? total = total + amount : total = total - Math.abs(amount);    
    return total;
  }

  const columnHelper = createColumnHelper();

  const columnDef = [
    {
      id: 'Select',
      header: 'Sel.',
      cell: ({ row, column, table }) => {
        return (
          <>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-end',
              padding: '8px',}}              
            >
              {row.original.flag_fixed_clausula == 1 ? 
                <>
                  <IndeterminateCheckbox {...{
                    row,
                    column,
                    table,
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                  />
                </>
                :
                <>
                  <IconButtonSmallerPrimary
                    onClick={()=>{ table.options.meta.deleteRow(row.id)}}
                  >
                    <SymbolDelete/>
                  </IconButtonSmallerPrimary>
                </>
              }
            </div>
          </>
        )
        
      },
      footer: 'total',
      meta: {
        setRowSelected,
        rowSelected2,
        setRowSelected2,
      },
      size: 50,
    },
    {
      accessorKey: 'Clausulas',
      header: 'Clausula',
      cell: 'lala' ,
      footer: '',
      size: 180,
      meta: {
        setClauseTxt,
      } 
    },
    {
      accessorKey: 'Importe',
      header: 'Importe total',
      cell: 'lala',
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('Importe').amount, 0)
      ,
      meta: {
        editState,
        setEditState,
        subtractState,
        rowSelected,
        setRowSelected,
        rowSelected2,
      },
      size: 125,      
    },
    {
      accessorKey: 'months.jan22',
      header: 'ene/22',
      cell: 'lala',
      // cell: info => info.getValue().amount,
      // footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'january/2022'), 0),
      meta: {
        subtractState,
        insertSelectedCol,
        insertSelectedRow,
        setInsertSelectedAmount,
        setCellCopy,
        setAdvancePayCalc,
        insertSelectedAmount,
        insertAmountError,
        setInsertAmountError,
        insertCanSave,
        setInsertCanSave,
        rowSelected2,
        setInsertState,
        setSubtractState,
      },
      size: 125,
    },
    columnHelper.accessor('months.feb2022',{
      header: 'feb/22',
      cell: 'lala',
      // footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'february/2022'), 0),
      meta: {
        subtractState,
        insertSelectedCol,
        insertSelectedRow,
        insertSelectedAmount,
        setInsertSelectedAmount,
        setCellCopy,
        setAdvancePayCalc,
        insertAmountError,
        setInsertAmountError,
        insertCanSave,
        setInsertCanSave,
        rowSelected2,
        setInsertState,
        setSubtractState,
      },
      size: 125,
    }),
    // columnHelper.accessor('months.march/2022',{
    //   header: 'mar/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'march/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.april/2022',{
    //   header: 'abr/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'april/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.may/2022',{
    //   header: 'may/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'may/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.june/2022',{
    //   header: 'jun/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'june/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.july/2022',{
    //   header: 'jul/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'july/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.august/2022',{
    //   header: 'ago/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'august/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.september/2022',{
    //   header: 'sep/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'september/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.october/2022',{
    //   header: 'oct/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'october/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.november/2022',{
    //   header: 'nov/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'november/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.december/2022',{
    //   header: 'dic/22',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'december/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // {
    //   accessorKey: 'months.january/2023',
    //   header: 'ene/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'january/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // },
    // columnHelper.accessor('months.february/2023',{
    //   header: 'feb/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'february/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.march/2023',{
    //   header: 'mar/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'march/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.april/2023',{
    //   header: 'abr/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'april/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.may/2023',{
    //   header: 'may/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'may/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.june/2023',{
    //   header: 'jun/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'april/2022'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.july/2023',{
    //   header: 'jul/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'july/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.august/2023',{
    //   header: 'ago/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'august/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.september/2023',{
    //   header: 'sep/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'september/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.october/2023',{
    //   header: 'oct/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'october/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.november/2023',{
    //   header: 'nov/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'november/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    // columnHelper.accessor('months.december/2023',{
    //   header: 'dic/23',
    //   cell: EditableCell,
    //   footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'december/2023'), 0),
    //   meta: {
    //     subtractState,
    //     insertSelectedCol,
    //     insertSelectedRow,
    //     insertSelectedAmount,
    //     setInsertSelectedAmount,
    //     setCellCopy,
    //     setAdvancePayCalc,
    //     insertAmountError,
    //     setInsertAmountError,
    //     insertCanSave,
    //     setInsertCanSave,
    //     rowSelected2,
    //     setInsertState,
    //     setSubtractState,
    //   },
    //   size: 125,
    // }),
    columnHelper.accessor('total',{
      header: 'Total',
      cell: 'lala',
      meta: {
        subtractState,
        insertSelectedCol,
        insertSelectedRow,
        insertSelectedAmount,
        setInsertSelectedAmount,
        setCellCopy,
        setAdvancePayCalc,
        insertAmountError,
        setInsertAmountError,
        insertCanSave,
        setInsertCanSave,
        rowSelected2,
        setInsertState,
        setSubtractState,
      },
      size: 125,
    }),
  ]

  const columnDef2 = [
    {
      id: 'Select',
      header: 'Sel.',
      cell: ({ row, column, table }) => {
        return (
          <>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'flex-end',
              padding: '8px',}}              
            >
              { row.index < 8 ? 
                <>
                  <IndeterminateCheckbox {...{
                    row,
                    column,
                    table,
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                  />
                </>
                :
                <>
                  <IconButtonSmallerPrimary
                    onClick={()=>{ table.options.meta.deleteRow(row.id)}}
                  >
                    <SymbolDelete/>
                  </IconButtonSmallerPrimary>
                </>
              }
            </div>
          </>
        )
        
      },
      footer: 'total',
      meta: {
        setRowSelected,
        rowSelected2,
        setRowSelected2,
      },
      size: 50,
    },
    {
      accessorKey: 'Clausulas',
      header: 'Clausulas',
      cell: EditableClauseCell,
      footer: '',
      size: 180,
      meta: {
        setClauseTxt,
      } 
    },
    {
      accessorKey: 'Importe',
      header: 'Importe total',
      cell: EditableCell,
      // footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('Importe').amount, 0),
      meta: {
        editState,
        setEditState,
        subtractState,
        rowSelected,
        setRowSelected,
        rowSelected2,
      },
      size: 125,      
    },
  ]  

  const lastTotalObject = {
      accessorKey: 'total',
      header: 'Total',
      cell: EditableCell,
      footer: '',
      meta: {
        subtractState,
        insertSelectedCol,
        insertSelectedRow,
        insertSelectedAmount,
        setInsertSelectedAmount,
        setCellCopy,
        setAdvancePayCalc,
        insertAmountError,
        setInsertAmountError,
        insertCanSave,
        setInsertCanSave,
        rowSelected2,
        setInsertState,
        setSubtractState,
      },
      size: 125,
    }

  const getCommonPinningStyles = (column) => {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn =
      isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn =
      isPinned === 'right' && column.getIsFirstColumn('right')
  
    return {
      // backgroundColor: isPinned ? 'white' : undefined,
      // backgroundColor: isLastLeftPinnedColumn ? 'white' : isFirstRightPinnedColumn ? 'white' : undefined,
      // boxShadow: isLastLeftPinnedColumn
      //   ? '-4px 0 10px -10px gray inset'
      //   : isFirstRightPinnedColumn
      //     ? '4px 0 10px -10px gray inset'
      //     : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      // opacity: isPinned ? 0.98 : 1,
      position: isPinned ? 'sticky' : '',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    }
  }

  //los siguientes 3 useEffect se encargan de llenar el estado columnDefs con los datos de la tabla que lleguen
  
  //este rellena columnDefs con las 3 primeras columnas mínimas y explora los datos en busqueda del objeto months que albergará todos los datos de meses, y generará toda la información de meses que se guardará en el estado infoForColumnDefs
  useEffect(()=>{    
    if (dynamicData.length > 0 && columnDefs.length == 0) {
      console.log('añado columnDefs nuevos');
      const columnDefsCopy = [...columnDefs]
      // console.log('columnDefsCopy', columnDefsCopy);
      columnDef2.map(item => columnDefsCopy.push(item))
      setColumnDefs(columnDefsCopy);    
      const keys = getKeys(data[0]);
      setInfoForColumnDefs(generateColumns(keys));
    }
  },[dynamicData])
  //este añadirá a columDefs todos los datos de los meses
  useEffect(()=>{
    if (infoForColumnDefs.length > 0) {
      const columnDefsCopy = [...columnDefs];
      infoForColumnDefs.map(column => {
        columnDef2.push(column)
        columnDefsCopy.push(column)
      });
      setColumnDefs(columnDefsCopy);
    }
  },[infoForColumnDefs])
  //este añadirá la última columna de totales en última posición si no existe aún dentro
  useEffect(()=>{
    console.log('columnDefs han cambiado',columnDefs);
    const hasTotal = columnDefs.some(item => item.accessorKey == 'total');
    if (columnDefs.length > 3 && hasTotal == false) {
      const columnDefsCopy = [...columnDefs]
      columnDefsCopy.push(lastTotalObject)
      setColumnDefs(columnDefsCopy);
    }
  },[columnDefs])

  useEffect (() => {
    console.log("data ha cambiado", data);

    // data.map(item => {
    //   for (let key in item) {
    //     if(key === 'Importe') {
    //       // const stringified = JSON.stringify(item[key]);
    //       console.log('objeto antes:', item[key]);
    //       // const objeto = JSON.parse(stringified);
    //       // console.log('objeto: ', objeto, typeof(objeto));
    //     }
    //   }

    // });
    if (tableInstance.getIsSomePageRowsSelected()) {
      sumaFilas()
    } else {
      sumaTodasFilas();
    }
  },[data])

  useEffect(()=>{
    if (sumaRows.length === 0) {
      sumaTodasFilas();
    } else {
      checkSum()
    }
  },[sumaRows])

  useEffect(()=>{
    if (editState) {
      setColumnVisibility({...columnVisibility, 'Select': true, 'Importe': true})
    } else {
      setColumnVisibility({...columnVisibility, 'Select': false, 'Importe': false})
    }
  },[editState])

  useEffect(()=>{
    checkSum()
  },[rowSelected])

  const tableInstance = useReactTable({
    columns: columnDefs,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        const valueNumber = isNaN(value.amount) ? value.amount : Number(value.amount);
        let newAmountData = [...data]
        newAmountData[rowIndex][columnId] = { amount: valueNumber, status: value.status, flag_suma: value.flag_suma };
        setData(newAmountData);
        // setData(prev => 
        //   prev.map((row,index) =>
        //     index === rowIndex ? {
        //       ...prev[rowIndex], [columnId]: valueNumber
        //     } : row
        //   ))
      },
      updateClause: (rowIndex, columnId, value) => {
        let newData = [...data]
        console.log('newData', newData)
        // setData(newData);
      },
      deleteRow: (row) => {
        const newData = [...data];
        newData.splice(row,1);
        setData(newData);
        setEditState(false);
        tableInstance.resetRowSelection();
      },
      newSanctionLine: (row, columnId, value) => {
        setInsertState(true);
        setInsertSelectedAmount(value.amount);
        console.log('celda que copio: row ',row.id,', col ',columnId.id,' value ',value)
        const copyCell = [];
        copyCell["column"] = {id: columnId.id, index: columnId.getIndex()};
        copyCell["row"]= row.id;
        copyCell["value"] = value;
        setCellCopy(copyCell);
        const pegoCelda = [];
        pegoCelda["column"] = {"id":columnId.id, "index": columnId.getIndex()};
        pegoCelda["row"]= tableInstance.getRowCount();
        setCellPaste(pegoCelda);        
        const newEmptyLine = [...emptyLine]
        newEmptyLine[0]["TipoClausula"] = subtractState ? 'Sanción' : 'Embargo';
        newEmptyLine[0]["Clausulas"] = '';
        const newValue = {...value}
        newValue.amount = -Math.abs(value.amount);
        newValue.flag_suma = subtractState ? 1 : 0;
        newEmptyLine[0][columnId.id] = newValue;
        console.log('emptyLine que copio', newEmptyLine);
        const newData = [...data, newEmptyLine[0]]
        console.log('newData', newData);
        setData(newData);
        setPastedCellState(true);
        setInsertCanSave(true);
      }, 
      newAdvancePayLine: (row, columnId, value) => {
        setInsertState(true);
        setInsertSelectedAmount(value.amount);
        const copyCell = [];
        copyCell["column"] = {id: columnId.id, index: columnId.getIndex()};
        copyCell["row"]= row.id;
        copyCell["value"] = value;
        setCellCopy(copyCell);
        const newEmptyLine = [...emptyLine]
        newEmptyLine[0]["TipoClausula"] = 'Anticipo';
        newEmptyLine[0]["Clausulas"] = '';
        const newValue = {...value}
        newValue.amount = -Math.abs(value.amount);
        newEmptyLine[0][columnId.id] = newValue;
        const newData = [...data, newEmptyLine[0]]
        setData(newData);
        setPasteState(true);
      },
      newDeferedPayLine: (row, columnId, value) => {
        setInsertState(true);
        // console.log('value que copio', value, row.getValue('Clausulas'), columnId.id)
        setInsertSelectedAmount(value.amount);
        const copyCell = [];
        copyCell["column"] = {id: columnId.id, index: columnId.getIndex()};
        copyCell["row"]= row.id;
        copyCell["value"] = value;
        // console.log('copyCell', copyCell)
        setCellCopy(copyCell);
        const newEmptyLine = [...emptyLine]
        newEmptyLine[0]["TipoClausula"] = 'Retraso';
        newEmptyLine[0]["Clausulas"] = '';
        const newValue = {...value}
        newValue.amount = -Math.abs(value.amount);
        newEmptyLine[0][columnId.id] = newValue;
        const newData = [...data, newEmptyLine[0]]
        setData(newData);
        setPasteState(true);
      },  
      pasteCell: (row, columnId) => {
        // console.log('pego desde', cellCopy.column.id, cellCopy.row, cellCopy);
        // console.log('pego. Row:', row, ' Colum:', columnId)
        const pegoCelda = [];
        pegoCelda["column"] = {"id":columnId.id, "index": columnId.getIndex()};
        pegoCelda["row"]= row.id;
        setCellPaste(pegoCelda);
        //pegar en la col bajo celda copiada
        const newData = [...data]
        // console.log('newData', newData)
        const newCell = {...newData[row.id][cellCopy.column.id]}
        // console.log('newCell', newCell)
        newCell.amount = -Math.abs(insertSelectedAmount);
        newData[row.id][cellCopy.column.id] = newCell;
        //pegar en la propia celda
        const newCell2 = {...newData[row.id][columnId.id]}
        newCell2.amount = insertSelectedAmount;
        newData[row.id][columnId.id] = newCell2;
        // newData[cellCopy.row][cellCopy.column.id] = { amount: 0, status: cellCopy.value.status };
        // console.log('newData recien pegado', newData);
        setData(newData);
        setPastedCellState(true);
        setInsertCanSave(true);
      },
      clearStates: () => {
        setRegularState(true);
        setInsertState(false);
        setSubtractState(false);
        setSeizureState(false);
        setInsertCanSave(false);
        setInsertSelectedAmount();
        setInsertSelectedCol();
        setAdvancePayState(false);
        setDeferredPayState(false);
        setAdvancePayCalc();
        setCellCopy([]);
        setPasteState(false);
        setPastedCellState(false);
        setClauseTxt();
      },   
    },
    state: {
      columnVisibility: columnVisibility,
      rowSelection: rowSelected,
      columnPinning: columnPinning,
      data,
      regularState,
      advancePayState,
      subtractState,
      seizureState,
      insertState,
      insertSelectedAmount,
      insertCanSave,
      advancePayCalc,
      deferredPayState,
      cellCopy,
      pasteState,
      cellPaste,
      pastedCellState,
      clauseTxt,
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelected,
    onColumnPinningChange: setColumnPinning,
  })

  const sumaFilas = () => {
    const originalCopy = {...tableInstance.getSelectedRowModel().rows[0].original}
    const { Clausulas, Importe, ...rest } = originalCopy;
    let sumaFila = Object.values(rest).reduce((total, numero) => {
    const isNumber = Number.isInteger(numero.amount) ? numero.amount : 0;
      return total + isNumber
    }, 0)
    const onSumaChange = [...sumaRows];
    onSumaChange[tableInstance.getSelectedRowModel().rows[0].id] = sumaFila;
    setSumaRows(onSumaChange)
  }

  const sumaTodasFilas = () => {
    if (data.length > 0) {
      let rowsSum = []
      tableInstance.getRowModel().rows.map(row => {
        const originalCopy = {...row.original};
        // console.log('originalCopy', originalCopy)
        const { months, ...rest } = originalCopy;
        let sumaFila = Object.values(months).reduce((total, numero) => {
          const isNumber = (Number.isInteger(numero.amount) && numero.flag_suma === 1) ? numero.amount : 0;
          return total + isNumber
        }, 0)
        rowsSum = [...rowsSum, sumaFila]       
      })
      setSumaRows(rowsSum)
    } 
  }

  const sumaColumns = () => {
    if (data.length > 0) {
      let rowsSum = []
      tableInstance.getRowModel().rows.map(row => {
        console.log('row en Sumacolum', row)
        // const originalCopy = {...row.original};
        // const { Clausulas, Importe, TipoClausula, total, ...rest } = originalCopy;
        // let sumaFila = Object.values(rest).reduce((total, numero) => {
        //   const isNumber = (Number.isInteger(numero.amount) && numero.flag_suma === 1) ? numero.amount : 0;
        //   return total + isNumber
        // }, 0)
        // rowsSum = [...rowsSum, sumaFila]       
      })
      
      // setSumaRows(rowsSum)
    } 
  }

  const checkSum = () => {
    const importeSuma = sumaRows[tableInstance.getSelectedRowModel().rows[0]?.id];
    const importeClausula = tableInstance.getSelectedRowModel().rows[0]?.getValue('Importe').amount;

    if (importeClausula > 0 && importeSuma > 0 && importeClausula == importeSuma) {
      setCanSave(true)
    } else {
      setCanSave(false)
    }
  }
  
  return (
    <>
      {errorMsg &&
        <div  className='cm-u-centerText'>
          <span className='error'>{errorMsg}</span>
        </div>
      }
      { (data != null && data.length > 0) &&
        <>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <p>
              <ButtonMouseTransparent
              style={{ marginRight: '24px'}}
              onClick={()=> {
                setEditState(true);
              }}
            >
              Editar pagos
            </ButtonMouseTransparent>
            
            { editState && 
              <>
                <ButtonMouse
                  style={{ marginRight: '8px'}}
                  disabled={ canSave ? false : true }
                  className={ canSave ? 'cm-o-button-mouse--primary' : 'cm-o-button-mouse--inactive'}
                  onClick={()=> {
                    setEditState(false);
                    tableInstance.resetRowSelection();
                  }}
                >
                  Guardar
                </ButtonMouse>                
                <ButtonMouseGhost
                  onClick={()=> {
                    setEditState(false);
                    tableInstance.resetRowSelection();
                  }}
                >
                Cancelar
                </ButtonMouseGhost>
              </>
            }
            </p>
          
            <div className='cm-l-tabledata-cls-container cm-u-spacer-mt-big cm-u-spacer-mb-big'
            >
              <TableDataCls 
                style={{ 
                  width: tableInstance.getTotalSize(), 
                }}
              >
                { tableInstance.getHeaderGroups().map(headerElement => {
                    return (                      
                      <TableDataClsHead key={headerElement.id}>
                        <tr>
                          { headerElement.headers.map(columnElement => {
                            const { column } = columnElement;
                            return (
                              <TableDataClsHead__cell
                              key={columnElement.id}
                              colSpan={columnElement.colSpan}
                              className='tablecell-medium'
                              style={{ ...getCommonPinningStyles(column) }}
                              >
                                { flexRender ( 
                                  columnElement.column.columnDef.header,
                                  columnElement.getContext()
                                )}
                              
                              </TableDataClsHead__cell>
                            )
                          })}
                        </tr>
                      </TableDataClsHead>
                    )
                  })
                }
                <TableDataClsBody>
                  { tableInstance.getRowModel().rows.map(rowElement => {
                    return (
                      <>
                        <TableDataClsBody__row key={rowElement.id}>
                          { rowElement.getVisibleCells().map((cellElement, index) => {
                            const { column } = cellElement;
                            // console.log('visibleCells', rowElement.getVisibleCells().length)
                            return (
                              <>
                                {index === rowElement.getVisibleCells().length - 1 ?
                                  <>
                                    <TableDataClsBody__cell 
                                      key={`suma${rowElement.id}`} 
                                      colSpan='1'
                                      style={{ ...getCommonPinningStyles(column) }}
                                    >
                                      <div className='cell-total'>
                                        {sumaRows[rowElement.id]}
                                      </div>
                                    </TableDataClsBody__cell>
                                  </>
                                  :
                                  <>
                                    <TableDataClsBody__cell 
                                      key={cellElement.id} 
                                      colSpan='1'
                                      style={{ ...getCommonPinningStyles(column) }}
                                      >
                                        {flexRender(cellElement.column.columnDef.cell, cellElement.getContext())}
                                    </TableDataClsBody__cell>
                                  </>
                                }
                              </>
                            )
                          })}
                        </TableDataClsBody__row>
                      </>
                    )
                    })
                  }
                </TableDataClsBody>
                {
                  tableInstance.getFooterGroups().map(footerElement => {
                    return (
                      <TableDataClsHead key={footerElement.id}>
                        <tr>
                          { footerElement.headers.map(footerCol => {
                            const { column } = footerCol;
                            return (                        
                              <>
                                <TableDataClsHead__cell
                                  key={footerCol.id}
                                  className='tablecell-medium'
                                  style={{ ...getCommonPinningStyles(column) }}
                                >
                                  {sumaCols[footerCol.id]}
                                {
                                  footerCol.isPlaceHolder ? null :
                                  flexRender(
                                    footerCol.column.columnDef.footer,
                                    footerCol.getContext()
                                  )
                                }
                                </TableDataClsHead__cell>                      
                              </>
                            )
                          })}
                        </tr>
                      </TableDataClsHead>
                    )
                  })
                }
                


                
              </TableDataCls>
            </div>

            <p>
            { regularState  &&
              <>
                <ButtonMouseTransparent
                  style={{ marginRight: '24px'}}
                  onClick={() => {
                    setRegularState(false);
                    setAdvancePayState(true);
                  }}
                >
                  Anticipar pago
                </ButtonMouseTransparent>
                <ButtonMouseTransparent
                  style={{ marginRight: '24px'}}
                  onClick={() => {
                    setRegularState(false);
                    setDeferredPayState(true);
                  }}
                >
                  Retrasar pago
                </ButtonMouseTransparent>
                <ButtonMouseTransparent
                  style={{ marginRight: '24px'}}
                  onClick={()=>{
                    setRegularState(false);
                    setSubtractState(true);
                  }}
                >Sanción</ButtonMouseTransparent>
                <ButtonMouseTransparent
                  style={{ marginRight: '24px'}}
                  onClick={()=>{
                    setRegularState(false);
                    setSeizureState(true);
                  }}
                >Embargo</ButtonMouseTransparent>
              </>
            }
            {  !regularState && 
              <>
                <ButtonMouse
                  style={{ marginRight: '8px'}}
                  disabled={ insertCanSave ? false : true }
                  className={ insertCanSave ? 'cm-o-button-mouse--primary' : 'cm-o-button-mouse--inactive'}
                  onClick={() => {
                    const newData = [...data]
                    newData[newData.length-1]['Clausulas'] = clauseTxt + ' ' +newData[cellCopy.row]['Clausulas']+ ' ' +cellCopy.column.id;
                    setData(newData)                    
                    tableInstance.options.meta.clearStates();
                  }}
                >
                  Guardar
                </ButtonMouse>
                <ButtonMouseGhost
                  onClick={() => {
                    if (data.length > 8 ) {
                      const newData = [...data];
                      newData.pop()
                      setData(newData);
                    }
                    tableInstance.options.meta.clearStates();
                  }}
                >
                  Cancelar
                </ButtonMouseGhost>
              </>
            }
            </p>
          </div>
        </>        
      }
    </>
  )
}