import { useEffect, useMemo, useState } from "react"
import { 
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable, } from "@tanstack/react-table"
import { DATA } from './MOCK_DATA'
import { TableDataCls, TableDataClsBody, TableDataClsBody__cell, TableDataClsBody__row, TableDataClsHead, TableDataClsHead__cell } from "../../components/UI/layout/tableDataClassic"
import { EditableCell } from "./EditableCell"
import { IndeterminateCheckbox } from "./IndeterminateCheckbox"
import { STATUSES } from "./MOCK_DATA"
import { IconButtonSmallerPrimary } from "../../components/UI/objects/buttons"
import { SymbolDelete } from "../../components/UI/objects/symbols"
import { NumericFormat } from "react-number-format"
import { EditableClauseCell } from "./EditableClauseCell"


export const BasicTable = () => {

  const [data, setData] = useState(DATA);
  const [sumaRows, setSumaRows] = useState([]);
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
  const [insertState, setInsertState] = useState(false);
  const [subtractState, setSubtractState] = useState(false);
  const [advancePayState, setAdvancePayState] = useState(false);
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


  const { status_initial } = STATUSES;

  const emptyLine = [{
    "TipoClausula": '',
    "Clausulas": '',
    "Importe": { amount: '', status: STATUSES[0]},
    "january/2022": { amount: '', status: STATUSES[0]},
    "february/2022": { amount: '', status: STATUSES[0]},
    "march/2022": { amount: '', status: STATUSES[0]},
    "april/2022": { amount: '', status: STATUSES[0]},
    "may/2022": { amount: '', status: STATUSES[0]},
    "june/2022": { amount: '', status: STATUSES[0]},
    "july/2022": { amount: '', status: STATUSES[0]},
    "august/2022": { amount: '', status: STATUSES[0]},
    "september/2022": { amount: '', status: STATUSES[0]},
    "october/2022": { amount: '', status: STATUSES[0]},
    "november/2022": { amount: '', status: STATUSES[0]},
    "december/2022":{ amount: '', status: STATUSES[0]},
    "january/2023": { amount: '', status: STATUSES[0]},
    "february/2023": { amount: '', status: STATUSES[0]},
    "march/2023": { amount: '', status: STATUSES[0]},
    "april/2023": { amount: '', status: STATUSES[0]},
    "may/2023": { amount: '', status: STATUSES[0]},
    "june/2023": { amount: '', status: STATUSES[0]},
    "july/2023": { amount: '', status: STATUSES[0]},
    "august/2023": { amount: '', status: STATUSES[0]},
    "september/2023": { amount: '', status: STATUSES[0]},
    "october/2023": { amount: '', status: STATUSES[0]},
    "november/2023": { amount: '', status: STATUSES[0]},
    "december/2023":{ amount: '', status: STATUSES[0]},
    "total":""
  }]

  const sumHelper = (total, row, key) => {
    let number = row.getValue(key).amount
    number >= 0 ? total = total + number : total = total - Math.abs(number);    
    return total;
  }

  const columnHelper = createColumnHelper();
  //columDefs
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
      header: 'Clausula',
      cell: EditableClauseCell ,
      footer: '',
      size: 180, 
    },
    {
      accessorKey: 'Importe',
      header: 'Importe total',
      cell: EditableCell,
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
      accessorKey: 'january/2022',
      header: 'ene/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'january/2022'), 0),
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
    columnHelper.accessor('february/2022',{
      header: 'feb/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'february/2022'), 0),
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
    columnHelper.accessor('march/2022',{
      header: 'mar/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'march/2022'), 0),
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
    columnHelper.accessor('april/2022',{
      header: 'abr/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'april/2022'), 0),
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
    columnHelper.accessor('may/2022',{
      header: 'may/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'may/2022'), 0),
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
    columnHelper.accessor('june/2022',{
      header: 'jun/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'june/2022'), 0),
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
    columnHelper.accessor('july/2022',{
      header: 'jul/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'july/2022'), 0),
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
    columnHelper.accessor('august/2022',{
      header: 'ago/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'august/2022'), 0),
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
    columnHelper.accessor('september/2022',{
      header: 'sep/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'september/2022'), 0),
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
    columnHelper.accessor('october/2022',{
      header: 'oct/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'october/2022'), 0),
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
    columnHelper.accessor('november/2022',{
      header: 'nov/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'november/2022'), 0),
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
    columnHelper.accessor('december/2022',{
      header: 'dic/22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'december/2022'), 0),
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
    {
      accessorKey: 'january/2023',
      header: 'ene/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'january/2023'), 0),
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
    },
    columnHelper.accessor('february/2023',{
      header: 'feb/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'february/2023'), 0),
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
    columnHelper.accessor('march/2023',{
      header: 'mar/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'march/2023'), 0),
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
    columnHelper.accessor('april/2023',{
      header: 'abr/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'april/2023'), 0),
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
    columnHelper.accessor('may/2023',{
      header: 'may/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'may/2023'), 0),
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
    columnHelper.accessor('june/2023',{
      header: 'jun/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'april/2022'), 0),
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
    columnHelper.accessor('july/2023',{
      header: 'jul/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'july/2023'), 0),
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
    columnHelper.accessor('august/2023',{
      header: 'ago/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'august/2023'), 0),
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
    columnHelper.accessor('september/2023',{
      header: 'sep/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'september/2023'), 0),
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
    columnHelper.accessor('october/2023',{
      header: 'oct/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'october/2023'), 0),
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
    columnHelper.accessor('november/2023',{
      header: 'nov/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'november/2023'), 0),
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
    columnHelper.accessor('december/2023',{
      header: 'dic/23',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => sumHelper(total,row, 'december/2023'), 0),
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
    columnHelper.accessor('total',{
      header: 'Total',
      cell: EditableCell,
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

  //utiliza el hook useMemo para "chachear" la info de la tabla porque si no se volverá a solicitar en cada render 
  // const finalData = useMemo(()=> data,[])
  // const finalColumnDef = useMemo(()=> columnDef,[])  

  const tableInstance = useReactTable({
    columns: columnDef,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        const valueNumber = isNaN(value.amount) ? value.amount : Number(value.amount);
        let newAmountData = [...data]
        newAmountData[rowIndex][columnId] = { amount: valueNumber, status: value.status };
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
        newData[rowIndex][columnId] = value;
        setData(newData);
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
        // setInsertSelectedAmount(value);
        // setInsertSelectedCol(columnId);
        // const valueNumber = isNaN(value) ? -Math.abs(value) : -Math.abs(Number(value));
        const newEmptyLine = [...emptyLine]
        newEmptyLine[0]["TipoClausula"] = 'Sanción';
        newEmptyLine[0]["Clausulas"] = '';
        // newEmptyLine[0][columnId] = {amount: valueNumber, status: STATUSES[0]};
        const newData = [...data, newEmptyLine[0]]
        setData(newData);
      }, 
      newAdvancePayLine: (row, columnId, value) => {
        setInsertState(true);
        console.log('value que copio', value.amount, row.getValue('Clausulas'))
        setInsertSelectedAmount(value.amount);
        const copyCell = [];
        copyCell["column"] = {id: columnId.id, index: columnId.getIndex()};
        copyCell["row"]= row.id;
        copyCell["value"] = value;
        // console.log('copyCell', copyCell)
        setCellCopy(copyCell);
        const newEmptyLine = [...emptyLine]
        newEmptyLine[0]["TipoClausula"] = 'Anticipo';
        newEmptyLine[0]["Clausulas"] = `${row.getValue('Clausulas')} ${columnId.id}`;
        const newData = [...data, newEmptyLine[0]]
        setData(newData);
        setPasteState(true);
      },  
      pasteCell: (row, columnId) => {
        // console.log('pego desde', cellCopy.column.id, cellCopy.row, cellCopy);
        // console.log('pego', row, columnId)
        const pegoCelda = [];
        pegoCelda["column"] = {"id":columnId.id, "index": columnId.getIndex()};
        pegoCelda["row"]= row.id;
        setCellPaste(pegoCelda);
        const newData = [...data]
        const newCell = {...newData[newData.length-1][columnId.id]}
        newCell.amount = -Math.abs(insertSelectedAmount);
        newData[newData.length-1][columnId.id] = newCell;
        newData[cellCopy.row][cellCopy.column.id] = { amount: 0, status: cellCopy.value.status };
        // console.log('newData recien pegado', newData);
        setData(newData);
        setPastedCellState(true);
        setInsertCanSave(true);
      },    
    },
    state: {
      columnVisibility: columnVisibility,
      rowSelection: rowSelected,
      columnPinning: columnPinning,
      advancePayState,
      subtractState,
      insertState,
      insertSelectedAmount,
      insertCanSave,
      advancePayCalc,
      cellCopy,
      pasteState,
      cellPaste,
      pastedCellState,
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelected,
    onColumnPinningChange: setColumnPinning,
  })

  const getCommonPinningStyles = (column) => {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn =
      isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn =
      isPinned === 'right' && column.getIsFirstColumn('right')
  
    return {
      backgroundColor: isPinned ? 'white' : undefined,
      // backgroundColor: isLastLeftPinnedColumn ? 'white' : isFirstRightPinnedColumn ? 'white' : undefined,
      // boxShadow: isLastLeftPinnedColumn
      //   ? '-4px 0 10px -10px gray inset'
      //   : isFirstRightPinnedColumn
      //     ? '4px 0 10px -10px gray inset'
      //     : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.98 : 1,
      position: isPinned ? 'sticky' : '',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    }
  }

  const sumaFilas = () => {
    console.log(tableInstance.getSelectedRowModel().rows[0].original);
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
    // console.log('entro en sumaTodasfilas')
    let rowsSum = []
    tableInstance.getRowModel().rows.map(row => {
      const originalCopy = {...row.original};
      const { Clausulas, Importe, ...rest } = originalCopy;
      let sumaFila = Object.values(rest).reduce((total, numero) => {
            const isNumber = Number.isInteger(numero.amount) ? numero.amount : 0;
            return total + isNumber
          }, 0)
      // console.log('sumaFila', sumaFila)
      rowsSum = [...rowsSum, sumaFila] 
      // console.log('rowsSum', rowsSum)         
    })
    // return rowsSum
    setSumaRows(rowsSum)
  }

  useEffect (() => {
    // console.log('data changes', data);
    if (tableInstance.getIsSomePageRowsSelected()) {
      // console.log('fila seleccionada', tableInstance.getIsSomePageRowsSelected())
      // console.log('row a evaluar:', tableInstance.getSelectedRowModel().rows[0]?.id)
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
    // console.log('se ha seleccionado algo', tableInstance.getIsSomePageRowsSelected())
    // console.log('rowSelected', rowSelected);
    checkSum()
  },[rowSelected])

  // useEffect(()=>{
  //   console.log('insertState', insertState);
  //   console.log('advancePayState', advancePayState);
  //   console.log('insertSelectedAmount', insertSelectedAmount)
  //   console.log('pasteState', pasteState);
  //   console.log('advancePayCalc', advancePayCalc)

  // },[insertState, advancePayState, pasteState, insertSelectedAmount, advancePayCalc])

  const checkSum = () => {
    // console.log('row a evaluar:', tableInstance.getSelectedRowModel().rows[0]?.id)
    // console.log('sumas', sumaRows)
    const importeSuma = sumaRows[tableInstance.getSelectedRowModel().rows[0]?.id];
    const importeClausula = tableInstance.getSelectedRowModel().rows[0]?.getValue('Importe').amount;
    // console.log('Importe Clausula:', importeClausula);
    // console.log('importe Suma', importeSuma);

    if (importeClausula > 0 && importeSuma > 0 && importeClausula == importeSuma) {
      // console.log('puede guardar')
      setCanSave(true)
    } else {
      // console.log('no puede guardar')
      setCanSave(false)
    }
  }

  return (
    <>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <p>&nbsp;</p>
        <p><button
          onClick={(e)=> {
            e.preventDefault();
            setEditState(true);
          }}
        >Editar Pagos</button>
        { editState && 
          <>
            <span>&nbsp;</span>
            <button
            disabled={ canSave ? false : true }
            onClick={(e)=> {
              e.preventDefault();
              setEditState(false);
              tableInstance.resetRowSelection();
            }}
            >
              Guardar
            </button>
            <span>&nbsp;</span>
            <button
              onClick={(e)=> {
                e.preventDefault();
                setEditState(false);
                tableInstance.resetRowSelection();
              }}
              >
                Cancelar
            </button>
          </>
        }
        </p>
      
        <div 
          className='tableData-Container cm-u-spacer-mt-big cm-u-spacer-mb-big'
          style={{
            border: '1px solid lightgray',
            overflowX: 'scroll',
            width: '100%',
          }}
        >
          <TableDataCls 
            style={{ 
              // border: '1px solid lightgray',
              borderCollapse: 'collapse',
              borderSpacing: 0,
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
                                  <div style={{
                                    borderRight: '1px solid lightgray',
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    justifyContent: 'flex-end',
                                    padding: '8px',
                                    height: '100%',}}>
                                    {sumaRows[rowElement.id]}</div>
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
        { !insertState  &&
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setInsertState(true);
                setAdvancePayState(true);
              }}
            >
              Anticipar pago
            </button>
            <span>&nbsp;</span>
            <button
              onClick={(e)=>{
                e.preventDefault();
                tableInstance.options.meta.newSanctionLine();
                // console.log('insertSelectedAmount', insertSelectedAmount)
                // console.log('insertSelectedCol', insertSelectedCol)
                setInsertState(true);
                setSubtractState(true);
              }}
            >Sanción</button>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </>
        }
        { (subtractState || advancePayState) && 
          <>
            <button
              disabled={ insertCanSave ? false : true }
              onClick={(e) => {
                e.preventDefault();
                // if (pastedCellState) {
                //   console.log('aquí actualizo el contenido de la celda copiada');
                //   console.log('celda copiada actualizada', cellCopy);
                //   tableInstance.options.meta.updateData(cellCopy.row, cellCopy.column.id, cellCopy.value)
                // }

                setInsertState(false);
                setSubtractState(false);
                setInsertCanSave(false);
                setInsertSelectedAmount();
                setInsertSelectedCol();
                setAdvancePayState(false);
                setAdvancePayCalc();
                setCellCopy([]);
                setPasteState(false);
                setPastedCellState(false);
              }}
            >
              Guardar
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(insertSelectedAmount);
                // if (insertSelectedAmount !== undefined) {
                //   const newData = [...data];
                //   newData.pop()
                //   console.log(newData);
                //   setData(newData);
                // }
                const newData = [...data];
                newData.pop()
                console.log(newData);
                setData(newData);
                setInsertState(false);
                setSubtractState(false);
                setInsertCanSave(false);
                setInsertSelectedAmount();
                setInsertSelectedCol();
                setAdvancePayState(false);
                setAdvancePayCalc();
                setCellCopy([]);
                setPasteState(false);
                setPastedCellState(false);
              }}
            >
              Cancelar
            </button>
          </>
        }

          

        </p>
      </div>
    </>
  );
}