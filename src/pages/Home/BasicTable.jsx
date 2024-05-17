import { flexRender, useReactTable } from "@tanstack/react-table"
import dataJson from './MOCK_DATA.json'
import { TableCellMedium, TableDataHeader, TableDataWrapper } from "../../components/UI/layout/tableData"
export const BasicTable = () => {

   const columnDef = [
    {
      accesorKey: 'clausulas',
      header: 'Tipo de clausula'
    },
    {
      accesorKey: 'january/2022',
      header: 'Ene-22'
    },
    {
      accesorKey: 'february/2022',
      header: 'Feb-22'
    },
    {
      accesorKey: 'march/2022',
      header: 'Mar-22'
    },
    {
      accesorKey: 'april/2022',
      header: 'Abr-22'
    },
    {
      accesorKey: 'may/2022',
      header: 'May-22'
    },
    {
      accesorKey: 'june/2022',
      header: 'Jun-22'
    },
    {
      accesorKey: 'july/2022',
      header: 'Jul-22'
    },
    {
      accesorKey: 'august/2022',
      header: 'Ago-22'
    },
    {
      accesorKey: 'september/2022',
      header: 'Sep-22'
    },
    {
      accesorKey: 'november/2022',
      header: 'Nov-22'
    },
    {
      accesorKey: 'december/2022',
      header: 'Dic-22'
    },
    {
      accesorKey: 'january/2023',
      header: 'Ene-23'
    },
    {
      accesorKey: 'february/2023',
      header: 'Feb-23'
    },
    {
      accesorKey: 'march/2023',
      header: 'Mar-23'
    },
    {
      accesorKey: 'april/2023',
      header: 'Abr-23'
    },
    {
      accesorKey: 'may/2023',
      header: 'May-23'
    },
    {
      accesorKey: 'june/2023',
      header: 'Jun-23'
    },
    {
      accesorKey: 'july/2023',
      header: 'Jul-23'
    },
    {
      accesorKey: 'august/2023',
      header: 'Ago-23'
    },
    {
      accesorKey: 'september/2023',
      header: 'Sep-23'
    },
    {
      accesorKey: 'november/2023',
      header: 'Nov-23'
    },
    {
      accesorKey: 'december/2023',
      header: 'Dic-23'
    },
    {
      accesorKey: 'january/2024',
      header: 'Ene-24'
    },
    {
      accesorKey: 'february/2024',
      header: 'Feb-24'
    },
    {
      accesorKey: 'march/2024',
      header: 'Mar-24'
    },
    {
      accesorKey: 'april/2024',
      header: 'Abr-24'
    },
    {
      accesorKey: 'may/2024',
      header: 'May-24'
    },
  ]

  const tableInstance = useReactTable({
    columns: columnDef,
    data: dataJson,
  })

  // console.log('test', tableInstance.getHeaderGroups());

  return (
    <TableDataWrapper className='cm-u-spacer-mt-big'>
      
        { tableInstance.getHeaderGroups().map(headerElement => {
          return (
            <TableDataHeader className='cm-l-tabledata__header--nospace' key={headerElement.id}>
              { headerElement.headers.map(columnElement => {
                return (
                  <TableCellMedium 
                    key={columnElement.id}
                    conlSpan={columnElement.colSpan}
                    className='table-bg tablecell-bg-old'
                  >
                    { flexRender ( 
                      columnElement.column.columnDef.header,
                      columnElement.getContext()
                    )}
                  </TableCellMedium>
                )
              })}
            </TableDataHeader>
          )
        }) }
    </TableDataWrapper>
  )
}