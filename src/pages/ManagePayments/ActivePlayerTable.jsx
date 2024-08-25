import { useEffect, useMemo, useRef, useState } from "react"
import { flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table"
import { useSaveData } from "../../hooks/useSaveData";
import { v4 as uuidv4 } from 'uuid';
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import EditableClauseCell from "./EditableClauseCell";
import { EditableCell } from "./EditableCell";
import { ButtonMouse, ButtonMouseGhost, ButtonMousePrimary, ButtonMouseTransparent, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { TableDataCls, TableDataClsBody, TableDataClsBody__cell, TableDataClsBody__row, TableDataClsHead, TableDataClsHead__cell } from "../../components/UI/layout/tableDataClassic";
import { SymbolDelete } from "../../components/UI/objects/symbols";

export const ActivePlayerTable = ({ activePlayerId, activeContractId }) => {  

  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState([]);
  const [dynamicData,setDynamicData] = useState([]);
  const [emptyLine, setEmptyLine] = useState([]);
  const [totalMonths, setTotalMonths] = useState();
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
  const [rowSelectedIndex, setRowSelectedIndex] = useState(null);
  const selectedRowBackRef = useRef({
    id: null,
    original: null,
  });
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
  const advancePayCalcRef = useRef();
  const [insertAmountError, setInsertAmountError] = useState();
  const [insertCanSave, setInsertCanSave] = useState(false);
  const clauseTxtRef = useRef();

  //pedir datos del contrato
  const getPayments = useSaveData();

  const getPaymentsDetail = (activeContractId) => {
    // console.log('solicito el contrato', activeContractId);
    getPayments.uploadData('players/calendarioRegistros',{'id_contrato':activeContractId})
  }
  
  useEffect (() => {
    if (getPayments.responseUpload) {
      if (getPayments.responseUpload.status == 'ok') {
        console.log("tengo resultados buenos");
        console.log(getPayments.responseUpload);
        // setData(getPayments.responseUpload.registros);
        setDynamicData(getPayments.responseUpload.registros);
        setErrorMsg(null)
      } else {
        setErrorMsg('No hay datos para el contrato seleccionado, por favor selecciona otro contrato u otro jugador');
        setData([])
        setDynamicData([]);
        setInfoForColumnDefs([]);
      }
    }    
  },[getPayments.responseUpload])

  //funcion simple que separa el numero de mes del string de id de mes que crea tanstack
  const monthNumber = (column) => { 
   return Number(column['id'].substring('months_'.length)); 
  }

  // Función para obtener todas las claves del objeto, incluso las anidadas
  const getKeys = (obj) => {
    // console.log('entro en getKeys con obj', obj);
    let keys = [];
    for (let key in obj) {  
      // console.log('obj:', obj)    
      if (key === 'months') {
        const objeto = obj[key]
        for ( const [key, value] of Object.entries(objeto)){
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
    // console.log('entro en generate colums con keys:',keys)

    return keys.map(key => ({
      accessorKey: `months.${key.clave}`,
      header: key.valor,
      cell: ({ row, column, table, getValue }) => (
        <EditableCell
          row={row}
          column={column}
          table={table}
          getValue={getValue}
          objetoGuardado={selectedRowBackRef.current}
          initialAdvancePayCalc={advancePayCalcRef.current != undefined ? advancePayCalcRef.current : table.options.state.insertSelectedAmount}          
          onAdvancePayCalcChange={(newValue) => {
            advancePayCalcRef.current = newValue;
          }}
        />
      ),
      // cell: info => console.log(info),
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, `months_${key.clave}`), 0),
      meta: {
        subtractState,
        insertSelectedCol,
        insertSelectedRow,
        setInsertSelectedAmount,
        setCellCopy,
        // setAdvancePayCalc,
        insertSelectedAmount,
        insertAmountError,
        setInsertAmountError,
        insertCanSave,
        setInsertCanSave,
        setInsertState,
        setSubtractState,
      },
      size: 125,
    }));
  };  

  //este useEffect controla los selectores del header para vaciar el estado si no hay un jugador y un contrato valido seleccionado
  useEffect(()=>{
    if (activePlayerId != 0) {
      if (activeContractId != '' && activeContractId != undefined) {
        setData([]);
        setDynamicData([]);
        setColumnDefs([]);
        getPaymentsDetail(activeContractId);
      } else {
        // console.log('activeContractId', activeContractId)
        setDynamicData([]);
        setData([]);
        setInfoForColumnDefs([]);
        setColumnDefs([]);
      }      
    } else {
      setData([])
      setDynamicData([]);
      setInfoForColumnDefs([]);
      setColumnDefs([]);
    }

  },[activePlayerId, activeContractId])


  const sumHelper = (total, row, key) => {
    let number = row.getValue(key)
    let amount = (number.flag_suma == 1 || number.flag_suma === null || number.flag_suma === undefined || number.flag_suma === '') ? Number(number.amount) : 0;
    amount >= 0 ? total = total + amount : total = total - Math.abs(amount);    
    return total;
  }

  // const columnHelper = createColumnHelper();

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
              { row.original.flag_fixed_clausula == 1 ? 
                <>
                  <IndeterminateCheckbox {...{
                    row,
                    column,
                    table,
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                    onRowSelection: (rowId, rowOriginal)=>{
                      if (selectedRowBackRef.current.id !== rowId) {
                        const objetoAEditar = JSON.parse(JSON.stringify(rowOriginal))
                        selectedRowBackRef.current.id= rowId;
                        selectedRowBackRef.current.original = objetoAEditar;                   
                      } 
                    }
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
      footer: '',
      meta: {
        rowSelectedIndex,
        setRowSelectedIndex
      },
      size: 50,
    },
    {
      accessorKey: 'Clausulas',
      header: 'Clausulas',
      cell: ({ cell, row, column, table, getValue}) => (
        <EditableClauseCell
          cell={cell}
          row={row}
          column={column}
          table={table}
          getValue={getValue}
          initialClauseText={clauseTxtRef.current != undefined ? clauseTxtRef.current : getValue}
          onValueChange={(newValue) => {
            clauseTxtRef.current = newValue;
          }}
        />
      ),
      footer: 'Total',
      size: 180,
    },
    {
      accessorKey: 'Importe',
      header: 'Importe total',
      cell: ({ row, column, table, getValue }) => (
        <EditableCell
          row={row}
          column={column}
          table={table}
          getValue={getValue}
        />
      ),
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('Importe').amount, 0),
      meta: {
        editState,
        setEditState,
        subtractState,
        // rowSelected,
        // setRowSelected,
      },
      size: 125,      
    },
  ]  

  const lastTotalObject = {
      accessorKey: 'total',
      header: 'Total',
      cell: info => info.getValue(),
      // //footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row,'total'), 0),
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
    //no puede rellenar más si columnDefs es mayor que 3, que son las 3 primeras que meto yo a mano.
    if (dynamicData.length > 0 && columnDefs <= 3) {
      setTotalMonths(Object.keys(dynamicData[0]['months']).length);
      // console.log('tamaño dynamicData:', dynamicData)
      const columnDefsCopy = [...columnDefs]
      columnDef2.map(item => columnDefsCopy.push(item))
      setColumnDefs(columnDefsCopy);    
      const keys = getKeys(dynamicData[0]);
      setInfoForColumnDefs(generateColumns(keys));
    }
  },[dynamicData])
  
  //este añadirá a columDefs todos los datos de los meses
  useEffect(()=>{
    //no puede añadir 2 veces     
    if (infoForColumnDefs.length > 0 && (columnDefs.length < (infoForColumnDefs.length + dynamicData.length))) {
      // console.log('añado a columnDefs porque el tamaño de columnDefs, ',columnDefs.length,' es MENOR que la suma de dynamicData y infoForColums', (infoForColumnDefs.length + dynamicData.length) )
      const columnDefsCopy = [...columnDefs];
      infoForColumnDefs.map(column => {
        columnDef2.push(column)
        columnDefsCopy.push(column)
      });
      setColumnDefs(columnDefsCopy);
    } 
    // }
  },[infoForColumnDefs])
  //este añadirá la última columna de totales en última posición si no existe aún dentro
  useEffect(()=>{
    // console.log('columnDefs han cambiado');
    const hasTotal = columnDefs.some(item => item.accessorKey == 'total');

    if ((columnDefs.length === totalMonths+3) && hasTotal == false) {
      const columnDefsCopy = [...columnDefs]
      columnDefsCopy.push(lastTotalObject)
      setColumnDefs(columnDefsCopy);
    } else if (hasTotal == true){
      //console.log('columnDefs ya tiene añadido total y seteo los datos para la tabla', columnDefs)
      setData(dynamicData);
    }
  },[columnDefs])

  const memoizedColumns = useMemo(() => columnDefs, [data]);

  useEffect (() => {
    // console.log("data ha cambiado", data);
    if (data.length > 0) {
      const firstDataElement = data[0];

      const createEmptyLine = () => {
        const newEmptyLine = JSON.parse(JSON.stringify(firstDataElement));

        // Función para limpiar el objeto emptyLine dejando 'flag_suma' como 1
        const clearObject = (obj) => {
          for (let key in obj) {
              if (typeof obj[key] === 'object' && obj[key] !== null) {
                  clearObject(obj[key]);
              } else if (key === 'flag_suma') {
                obj[key] = 1;
              } else if (key === 'flag_fixed_clausula') {
                obj[key] = 0;
              } else if (key !== 'mes') {
                obj[key] = '';
              }
            }
        }
        clearObject(newEmptyLine);
        // console.log('newEmptyLine', newEmptyLine)
        return newEmptyLine;
      }

      // Crear emptyLine después de la actualización de estado
      const updatedEmptyLine = createEmptyLine();
      setEmptyLine([updatedEmptyLine]);
    }

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
    columns: memoizedColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, column, value) => {
        // console.log('updateData');
        // console.log('update data ANTES row:',rowIndex,', column:',column,', value:',value);
        let valueNumber = isNaN(value.amount) ? value.amount : Number(value.amount);
        let newAmountData = [...data]

        if (column['id'].startsWith('months_')) {
          // console.log('column empieza con months')
          // console.log('state tabla', tableInstance.getState())
          const number = monthNumber(column);
          //si estoy retrasando o anticipando el mes donde he copiado no debe actualizarse
          if (tableInstance.getState().deferredPayState || tableInstance.getState().advancePayState){
            const oldAmountUpdated = {...newAmountData[rowIndex].months[number]}
            oldAmountUpdated.amount = valueNumber;
            newAmountData[rowIndex].months[number] = oldAmountUpdated;
          } else if ((tableInstance.getState().subtractState || tableInstance.getState().seizureState)&& valueNumber > 0) {
            // console.log('sancion/embargo')
            valueNumber = -Math.abs(valueNumber)
            newAmountData[rowIndex].months[number] = { mes: value.mes, amount: valueNumber, status: value.status, flag_suma: value.flag_suma, id_calendario:value.id_calendario, accion:value.accion};
          } else if (tableInstance.getState().editState) {
            // console.log('id_calendario antes', value.id_calendario)
            //fijar el tipo de acción
            const editAction = (value.id_calendario == "") ? 'Nuevo':'';   
            //buscar dentro de la fila un objeto que tenga id_calendario para asignarlo al objeto que estoy editando
            let idCal = null;
            let fila = tableInstance.getCoreRowModel().rowsById[rowIndex].original;
            // console.log('id_calendario que viene:', value)
            for (let key in fila.months) {
              let mesObj = fila.months[key];
              if (mesObj.id_calendario) {
                  idCal = mesObj.id_calendario;
                  break; // Sale del bucle al encontrar el primer id_calendario relleno
              }
            }
                 
            newAmountData[rowIndex].months[number] = { 
              mes: value.mes, 
              amount: valueNumber, 
              status: value.status, 
              flag_suma: value.flag_suma, 
              id_calendario:value.id_calendario !== "" ? value.id_calendario : idCal, 
              accion:editAction
            };
          }
        } else {
          newAmountData[rowIndex][column.id] = { amount: valueNumber, status: value.status, flag_suma: value.flag_suma };
        }
        setData(newAmountData);
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
        //console.log('celda que copio: row ',row.id,', col ',columnId.id,' value ',value)
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
        newValue.status = '';
        newValue.flag_suma = subtractState ? 1 : 0;
        newValue.id_calendario = value.id_calendario;
        newValue.accion = subtractState ? 'Sancion' : 'Embargo';
        //necesito el numero de mes para modificar el objeto months dentro de la nueva linea
        const monthNr = monthNumber(columnId);
        newEmptyLine[0].months[monthNr] = newValue;
        // console.log('emptyLine que copio', newEmptyLine);
        const newData = [...data, newEmptyLine[0]]
        // console.log('newData', newData);
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
        newValue.status = '';
        newValue.flag_suma = 1;
        newValue.id_calendario = value.id_calendario;
        newValue.accion = 'Anticipo';
        //necesito el numero de mes para modificar el objeto months dentro de la nueva linea
        const monthNr = monthNumber(columnId);
        newEmptyLine[0].months[monthNr] = newValue;
        // console.log('newEmptyLine',newEmptyLine);
        const newData = [...data, newEmptyLine[0]]
        setData(newData);
        setPasteState(true);
      },
      newDeferedPayLine: (row, columnId, value) => {
        setInsertState(true);
        // console.log('value que copio', value)
        setInsertSelectedAmount(value.amount);
        const copyCell = [];
        copyCell["column"] = {id: columnId.id, index: columnId.getIndex()};
        copyCell["row"]= row.id;
        copyCell["value"] = value;
        setCellCopy(copyCell);
        const newEmptyLine = [...emptyLine]
        newEmptyLine[0]["TipoClausula"] = 'Retraso';
        newEmptyLine[0]["Clausulas"] = '';
        const newValue = {...value}
        newValue.amount = -Math.abs(value.amount);
        newValue.status = '';
        newValue.flag_suma = 1;
        newValue.id_calendario = value.id_calendario;
        newValue.accion = 'Retraso';
        //necesito el numero de mes para modificar el objeto months dentro de la nueva linea
        const monthNr = monthNumber(columnId);
        newEmptyLine[0].months[monthNr] = newValue;
        const newData = [...data, newEmptyLine[0]]
        setData(newData);
        setPasteState(true);
      },  
      pasteCell: (row, columnId) => {
        // console.log('recibo en pasteCell row:',row,', columnId:',columnId);
        // console.log('insertSelectedAmount:', insertSelectedAmount)
        console.log('celda copiada', cellCopy)
        const pegoCelda = [];
        pegoCelda["column"] = {"id":columnId.id, "index": columnId.getIndex()};
        pegoCelda["row"]= row.id;
        setCellPaste(pegoCelda);
        //pegar en la col bajo celda copiada
        const newData = [...data]
        //necesito el numero de mes para modificar el objeto months dentro de la nueva linea
        const monthNr = monthNumber(columnId);
        const newCell = {...newData[row.id].months[monthNr]}
        newCell.amount = insertSelectedAmount;
        newCell.flag_suma = 1;
        newCell.id_calendario = cellCopy.value.id_calendario;
        newCell.accion = tableInstance.getState().advancePayState ? 'Anticipo' : 'Retraso';
        newData[row.id].months[monthNr] = newCell;
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
        // setAdvancePayCalc();
        advancePayCalcRef.current = undefined;
        setCellCopy([]);
        setPasteState(false);
        setPastedCellState(false);
        clauseTxtRef.current = undefined;
      },   
    },
    state: {
      columnVisibility: columnVisibility,
      rowSelection: rowSelected,
      columnPinning: columnPinning,
      data,
      regularState,
      editState,
      advancePayState,
      subtractState,
      seizureState,
      insertState,
      insertSelectedAmount,
      insertCanSave,
      // advancePayCalc,
      deferredPayState,
      cellCopy,
      pasteState,
      cellPaste,
      pastedCellState,
      rowSelectedIndex,
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelected,
    onColumnPinningChange: setColumnPinning,
  })

  const sumaFilas = () => {
    // console.log('entro en SumaFilas');
    const originalCopy = {...tableInstance.getSelectedRowModel().rows[0].original}
    // console.log(originalCopy);
    const { Clausulas, Importe, ...rest } = originalCopy;
    // console.log("rest:", rest.months);
    let sumaFila = Object.values(rest.months).reduce((total, numero) => {
    const isNumber = Number.isInteger(numero.amount) ? numero.amount : 0;
      return total + isNumber
    }, 0)
    const onSumaChange = [...sumaRows];
    onSumaChange[tableInstance.getSelectedRowModel().rows[0].id] = sumaFila;
    setSumaRows(onSumaChange)
  }

  const sumaTodasFilas = () => {
    // console.log('entro en SumaTodasFilas');
    if (data.length > 0) {
      let rowsSum = []
      tableInstance.getRowModel().rows.map(row => {
        const originalCopy = {...row.original};
        // console.log('originalCopy', originalCopy)
        const { months, ...rest } = originalCopy;
        let sumaFila = Object.values(months).reduce((total, numero) => {
          const isNumber = (Number.isInteger(numero.amount) && (numero.flag_suma === 1 || numero.flag_suma == null || numero.flag_suma == '' || numero.flag_suma == undefined)) ? numero.amount : 0;
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

  const saveTable = useSaveData();

  const handleSaveTable = () => {
    // console.log('Tabla que guardo', data);    
    saveTable.uploadData('/players/calendarioGuardar',{'id_contrato':activeContractId, 'tabla':data});
  }

  useEffect (() => {
    if (saveTable.responseUpload) {
      // console.log(saveTable.responseUpload)
      if (saveTable.responseUpload.status == 'ok'){
        setData([]);
        setDynamicData([]);
        setColumnDefs([]);
        getPaymentsDetail(activeContractId);
      }
    }    
  },[saveTable.responseUpload])
  
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
              { (!editState && !advancePayState && !deferredPayState && !subtractState && !seizureState) &&
                <ButtonMouseTransparent
                  style={{ marginRight: '8px'}}
                  onClick={()=> {
                    setEditState(true);
                  }}
                >
                  Editar pagos
                </ButtonMouseTransparent> 
              }
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
                    Guardar cambios
                  </ButtonMouse>                
                  <ButtonMouseGhost
                    onClick={()=> {
                      //dejar el objeto que estaba tocando, si es que lo he cambiado, como estaba
                      const copiaData = [...data];
                      copiaData[selectedRowBackRef.current.id] = selectedRowBackRef.current.original;
                      selectedRowBackRef.current.id = null;
                      selectedRowBackRef.current.original = null;
                      setData(copiaData);
                      setEditState(false);
                      tableInstance.resetRowSelection();
                    }}
                  >
                  Cancelar
                  </ButtonMouseGhost>
                </>
              }
              { (regularState && !editState)  &&
                <>
                  <ButtonMouseTransparent
                    style={{ marginRight: '8px'}}
                    onClick={() => {
                      setRegularState(false);
                      setAdvancePayState(true);
                    }}
                  >
                    Anticipar pago
                  </ButtonMouseTransparent>
                  <ButtonMouseTransparent
                    style={{ marginRight: '8px'}}
                    onClick={() => {
                      setRegularState(false);
                      setDeferredPayState(true);
                    }}
                  >
                    Retrasar pago
                  </ButtonMouseTransparent>
                  <ButtonMouseTransparent
                    style={{ marginRight: '8px'}}
                    onClick={()=>{
                      setRegularState(false);
                      setSubtractState(true);
                    }}
                  >Sanción</ButtonMouseTransparent>
                  <ButtonMouseTransparent
                    style={{ marginRight: '8px'}}
                    onClick={()=>{
                      setRegularState(false);
                      setSeizureState(true);
                    }}
                  >Embargo</ButtonMouseTransparent>
                </>
              }
              { (!regularState && !editState) && 
                <>
                  <ButtonMouse
                    style={{ marginRight: '8px'}}
                    disabled={ insertCanSave ? false : true }
                    className={ insertCanSave ? 'cm-o-button-mouse--primary' : 'cm-o-button-mouse--inactive'}
                    onClick={() => {
                      // console.log('cellCopy', cellCopy)
                      const newData = [...data]
                      newData[newData.length-1]['Clausulas'] = clauseTxtRef.current + ' ' +newData[cellCopy.row]['Clausulas']+ ' ' +cellCopy.value.mes;
                      setData(newData)                    
                      tableInstance.options.meta.clearStates();
                    }}
                  >
                    Guardar cambios
                  </ButtonMouse>
                  <ButtonMouseGhost
                    onClick={() => {
                      if (data.length > 1 ) {

                        const newData = [...data];
                        const lastObject = newData[newData.length - 1];
                        if ('flag_fixed_clausula' in lastObject && lastObject.flag_fixed_clausula === 0) {
                          newData.pop();
                          setData(newData);
                        }
                      }
                      tableInstance.options.meta.clearStates();
                    }}
                  >
                    Cancelar
                  </ButtonMouseGhost>
                </>
              }
            </p>
            <div className='cm-l-tabledata-cls-container cm-u-spacer-mt-big cm-u-spacer-mb-big'>
              <TableDataCls 
                style={{ 
                  width: tableInstance.getTotalSize(), 
                }}
                key={uuidv4()}
              >
                { tableInstance.getHeaderGroups().map(headerElement => {
                    return (                      
                      <TableDataClsHead 
                      key={uuidv4()}
                      // key={headerElement.id}
                      >
                        <tr>
                          { headerElement.headers.map(columnElement => {
                            const { column } = columnElement;
                            return (
                              <TableDataClsHead__cell
                              key={uuidv4()}
                              // key={columnElement.id}
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
                <TableDataClsBody key={uuidv4()}>
                  { tableInstance.getRowModel().rows.map(rowElement => {
                    return (
                      <>
                        <TableDataClsBody__row key={uuidv4()}>
                          { rowElement.getVisibleCells().map((cellElement, index) => {
                            const { column } = cellElement;
                            return (
                              <>
                                {index === rowElement.getVisibleCells().length - 1 ?
                                  <>
                                    <TableDataClsBody__cell
                                      key={uuidv4()}
                                      // key={`suma${rowElement.id}`} 
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
                                      key={uuidv4()}
                                      // key={cellElement.id} 
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
                      <TableDataClsHead 
                        key={uuidv4()}
                        // key={footerElement.id}
                        >
                        <tr>
                          { footerElement.headers.map(footerCol => {
                            const { column } = footerCol;
                            return (                        
                              <>
                                <TableDataClsHead__cell
                                  key={uuidv4()}
                                  // key={footerCol.id}
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
            { (!editState && regularState) &&
              <p className='cm-u-centerText' style={{width:'100%'}}>
                <ButtonMousePrimary
                  onClick={handleSaveTable}
                >
                  Actualizar tabla de pagos
                </ButtonMousePrimary>                          
              </p>
            }
          </div>
        </>        
      }
    </>
  )
}