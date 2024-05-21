import { useEffect, useMemo, useState } from "react"
import { 
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable, } from "@tanstack/react-table"
import dataJson from './MOCK_DATA.json'
import { TableDataCls, TableDataClsBody, TableDataClsBody__cell, TableDataClsBody__row, TableDataClsHead, TableDataClsHead__cell } from "../../components/UI/layout/tableDataClassic"
import { EditableCell } from "./EditableCell"
import { IndeterminateCheckbox } from "./IndeterminateCheckbox"


export const BasicTable = () => {

  const [data, setData] = useState(dataJson);
  const [sumaRows, setSumaRows] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    'Select': false,
    'Clausulas': true,
    'Importe': false,
    'january/2022': true,
    'february/2022': true,
    'march/2022': true,
    'april/2022': true,
    'may/2022': true,
    'june/2022': true,
    'july/2022': true,
  })
  const [editState, setEditState] = useState(false);
  const [rowSelection, setRowSelection] = useState({});

  const columnHelper = createColumnHelper();
  const columnDef = [
    {
      id: 'Select',
      header: 'Seleccionar',
      cell: ({ row }) => <IndeterminateCheckbox {...{
        index: row.index,
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        indeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler(),
      }}
      />,
      footer: 'total',
    },
    {
      accessorKey: 'Clausulas',
      header: 'Clausula',
      cell: EditableCell,
      footer: 'total',
    },
    {
      accessorKey: 'Importe',
      header: 'Importe total',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('Importe'), 0),
      meta: {
        editState,
        setEditState,
        columnVisibility,
        setColumnVisibility,
      }
    },
    {
      accessorKey: 'january/2022',
      header: 'ene-22',
      cell: EditableCell,
      footer: ({ table }) => table.getFilteredRowModel().rows.reduce((total, row) => total + row.getValue('january/2022'), 0),
    },
    columnHelper.accessor('february/2022',{
      cell: EditableCell,
    }),
    columnHelper.accessor('march/2022',{
      cell: EditableCell,
    }),
    columnHelper.accessor('april/2022',{
      cell: EditableCell,
    }),
    columnHelper.accessor('may/2022',{
      cell: EditableCell,
    }),
    columnHelper.accessor('june/2022',{
      cell: EditableCell,
    }),
    columnHelper.accessor('july/2022',{
      cell: EditableCell,
    }),
  ]

  //utiliza el hook useMemo para "chachear" la info de la tabla porque si no se volverá a solicitar en cada render 
  const finalData = useMemo(()=> data,[])
  const finalColumnDef = useMemo(()=> columnDef,[])  

  const tableInstance = useReactTable({
    columns: columnDef,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => 
        {
          // console.log('rowIndex', rowIndex)
          // console.log('columnId', columnId)
          // console.log('value', value)
          const valueNumber = isNaN(value) ? value : Number(value);
          setData(prev => 
            prev.map((row,index) =>
              index === rowIndex ? {
                ...prev[rowIndex], [columnId]: valueNumber
              } : row
            ))
        }
    },
    state: {
      columnVisibility: columnVisibility,
      rowSelection: rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  })

  const sumaFilas = () => {
    let rowsSum = []
    tableInstance.getRowModel().rows.map(row => {
      const originalCopy = {...row.original};
      const { Clausulas, Importe, ...rest } = originalCopy;
      let sumaFila = Object.values(rest).reduce((total, numero) => {
            const isNumber = Number.isInteger(numero) ? numero : 0;
            return total + isNumber
          }, 0)      
      rowsSum = [...rowsSum, sumaFila]          
    })

    return rowsSum
  }

  useEffect (() => {   
    const suma = sumaFilas() 
    // console.log('suma', suma)
    setSumaRows(suma)  
    // console.log('data', data)
  },[data])

  // useEffect(()=>{
  //   console.log('rowSum', sumaRows)
  // },[sumaRows])

  // useEffect(()=>{
  //   console.log('columnVisibility', columnVisibility)
  // },[columnVisibility])

  // console.log('leaf Columns', tableInstance.getAllLeafColumns())
  console.log('SelectedRowModel', tableInstance.getState().rowSelection)

  useEffect(()=>{
    console.log('cambio estado edicion FUERA', editState);
  },[editState])

  return (
    <>
      <p>&nbsp;</p>
      <p><button
        onClick={(e)=> {
          e.preventDefault();
          setEditState(true);
          setColumnVisibility({...columnVisibility, 'Select': true, 'Importe': true})
        }}
      >Editar Pagos</button>
      { editState && 
      <button
      onClick={(e)=> {
        e.preventDefault();
        setEditState(false)
        setColumnVisibility({...columnVisibility, 'Select': false, 'Importe': false})
      }}
      >
        Guardar
      </button>
      }
      </p>
      <TableDataCls  className='cm-u-spacer-mt-big'>
        { tableInstance.getHeaderGroups().map(headerElement => {
            return (
              <TableDataClsHead key={headerElement.id}>
                <tr>
                  { headerElement.headers.map(columnElement => {
                    return (
                      <TableDataClsHead__cell
                      key={columnElement.id}
                      colSpan={columnElement.colSpan}
                      className='tablecell-medium'
                      >
                        { flexRender ( 
                          columnElement.column.columnDef.header,
                          columnElement.getContext()
                        )}
                      
                      </TableDataClsHead__cell>
                    )
                  })}
                  <TableDataClsHead__cell
                      className='tablecell-medium'
                  >Total</TableDataClsHead__cell>
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
                  { rowElement.getVisibleCells().map(cellElement => {
                    return (
                      <>
                        <TableDataClsBody__cell key={cellElement.id} colSpan='1'>
                        {flexRender(cellElement.column.columnDef.cell, cellElement.getContext())}
                        </TableDataClsBody__cell>
                      </>
                    )
                  })}
                  <TableDataClsBody__cell key={`suma${rowElement.id}`} colSpan='1'>
                    {sumaRows[rowElement.id]}
                  </TableDataClsBody__cell>
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
                    return (
                      <>
                      <TableDataClsHead__cell
                        key={footerCol.id}
                        className='tablecell-medium'
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

      <p><button
        onClick={(e)=> {
          e.preventDefault();
          console.log('add row');
          setData([...data, {
            "Clausulas": 'lorem',
            "january/2022": 0,
            "february/2022": 0,
            "march/2022": 0,
            "april/2022": 0,
            "may/2022": 0,
            "june/2022": 0,
            "july/2022": 0,
            "august/2022": 0
          }])
        }}
      >Añadir fila vacía</button></p>
    </>
  );
}