import { useEffect, useState } from "react";
import { DropDownMenu, DropdownItem } from "./DropDownMenu";
import { STATUSES } from "./MOCK_DATA";
import { IconButtonSmallPrimary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolContentCopy, SymbolPaste, SymbolSave } from "../../components/UI/objects/symbols";
import { NumericFormat } from "react-number-format";

const ColorIcon = ({ Color }) => {
  return (
    <div style={{
      border: '1px solid lightgray',
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '2px',
      backgroundColor: Color,
    }}></div>
  )
}


export const EditableCell = ({ getValue, row, column, table, }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue)
  const { updateData, newSanctionLine, newAdvancePayLine, newDeferedPayLine, pasteCell } = table.options.meta;

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  return (
    <>
      {/* {console.log('fila:',row.index,', state:', table.getState())} */}
      {row.original.flag_fixed_clausula == 1 ? 
        <>
          { (table.getIsSomePageRowsSelected() == true && row.index === column.columnDef.meta.rowSelected2) ?
            <>
              <div 
              className='cell-data'
              style={{ 
                backgroundColor: getValue().status?.color,
           
                }}>
                <input
                  value={value.amount}
                  onChange={(e) => {
                    let onChangeValue = {...value}
                    onChangeValue.amount = e.target.value;
                    setValue(onChangeValue)
                  }}
                  onBlur={() => {
                    updateData(row.index, column.id, value)
                  }}
                  style={{
                    border: '1px solid lightgray',
                    borderRadius: '4px',
                    display: 'flex',
                    flexGrow: 0,
                    width: '50%',
                    height: '28px',
                  }}
                />
                { column.id !== 'Importe' &&
                  <DropDownMenu>
                    { STATUSES.map(item => { 
                      // console.log(item);
                      return (
                        <>
                          <DropdownItem 
                            key={item.id}
                            onClick={ () => updateData(
                              row.index, column.id, { amount: getValue().amount, status: item}
                            )}
                          >
                            <ColorIcon Color={item.color} />{item.name}
                          </DropdownItem>
                        </>
                      )}
                    )}
                  </DropDownMenu>
                }
              </div>
            </>
            :
            <>   
              <div 
              className='cell-data'
              style={{ 
                backgroundColor: !table.options.state.pasteState ? getValue().status?.color : (table.options.state.cellCopy?.column?.id == column.id && table.options.state.cellCopy?.row == row.id) ? '' : '',
        
                }}
                
                >
                  { ( table.getState().pastedCellState
                      && table.options.state.cellCopy?.column?.id == column.id 
                      && table.options.state.cellCopy?.row == row.id
                    ) ? 
                    <>{value.amount}</>
                    :
                    <>{initialValue.amount}</>
                  }
                  { (table.getState().advancePayState || table.getState().deferredPayState || table.getState().subtractState || table.getState().seizureState) && initialValue.amount != 0 && 
                    <>
                      { !table.getState().pasteState &&
                        <IconButtonSmallerPrimary
                          style={{marginLeft: '8px'}}
                          onClick={() => {
                            if(table.getState().advancePayState) {
                              // console.log('estoy anticipando un pago')
                              newAdvancePayLine(row, column, value);
                            } else if (table.getState().deferredPayState){
                              // console.log('estoy retrasando un pago')
                              newDeferedPayLine(row, column, value);
                            } else if (table.getState().subtractState || table.getState().seizureState) {
                              newSanctionLine(row, column, value);
                            }             
                          }}
                        >
                          <SymbolContentCopy />
                        </IconButtonSmallerPrimary>
                      }
                    </>
                  }
              </div>              
            </>
          }
        </> 
        :
        <>
          {     
            (!table.options.state.pasteState && !table.options.state.subtractState && !table.options.state.seizureState) 
            || (table.options.state.pasteState && row.id != table.getRowCount()-1)?
            <>
               <div 
               className='cell-data'
               style={{ 
                backgroundColor: getValue().status?.color,
                }}
              >
              {value.amount}
              </div>
            </>
            :
            <>
              { (table.getState().advancedPayState || table.getState().subtractState)
                && column.id == column.columnDef.meta.insertSelectedCol 
                && row.id == table.getRowCount()-1
                && 
                <>
                  <div
                  className='cell-data'              
                  style={{ 
                    backgroundColor: table.getState().subtractState ? '#FF978E' : '#B7FFA3',
                    }}
                  >
                    <NumericFormat 
                      allowNegative={false}
                      prefix="-"
                      onValueChange={(values) => {                    
                        const limit = -Math.abs(column.columnDef.meta.insertSelectedAmount);   
                        console.log('limit', limit)                 
                        if (values.formattedValue !== '' && values.formattedValue >= limit && values.formattedValue <= 0) {
                          console.log('puede guardar')                          
                          let onChangeValue = {...value};
                          onChangeValue.amount = values.formattedValue;
                          // setValue(onChangeValue);
                          column.columnDef.meta.setInsertCanSave(true)
                          updateData(row.index, column.id, onChangeValue);
                        } else {
                          // console.log('no puede guardar')
                          column.columnDef.meta.setInsertCanSave(false)
                        }
                      }}

                      style={{
                        backgroundColor: table.getState().subtractState ? '#FF978E' : '#B7FFA3',
                        border: '1px solid black',
                        borderRadius: '4px',
                        display: 'flex',
                        flexGrow: 0,
                        width: '50%',
                      }}
                    />
                  </div>
                </>         
              }
              {/* estado acabo de copiar una celda fija para hacer anticipo y pinto el botón de pegar */}
              {
                ( table.getState().pasteState
                  && ((table.getState().advancePayState && column.getIndex() < table.options.state.cellCopy?.column?.index)
                      || (table.getState().deferredPayState && column.getIndex() > table.options.state.cellCopy?.column?.index)
                      // || (table.getState().subtractState && 
                      //     (column.getIndex() < table.options.state.cellCopy?.column?.index || column.getIndex() > table.options.state.cellCopy?.column?.index))
                    )
                  && !table.getState().pastedCellState
                  && row.index === table.getRowCount()-1
                ) 
                  &&
                <>
                  <div 
                  className='cell-data'
                  style={{ 
                    backgroundColor: getValue().status?.color,
                    }}
                  >
                  <IconButtonSmallerPrimary
                    onClick={() => {
                      pasteCell(row, column)                     
                    }}
                  >
                    <SymbolPaste />
                  </IconButtonSmallerPrimary>
                  </div>
                </>
              }
              {/* siguiente celda a las de pegar con la cantidad en negativo */}
              {
                ( table.getState().pasteState 
                && (column.getIndex() < table.options.state.cellCopy?.column?.index + 1 )
                && (column.getIndex() == table.options.state.cellCopy?.column?.index ) 
                && !table.getState().pastedCellState
                && row.index === table.getRowCount()-1
              ) 
                &&
                <>
                   <div 
                   className='cell-data'
                   style={{ 
                    backgroundColor: !table.options.state.pasteState ? '' : 'yellow',
                    border: !table.options.state.pastedCellState ? '' : (table.options.state.cellCopy?.column?.id == column.id && table.options.state.cellCopy?.row == row.id) ? table.options.state.insertCanSave ? '' : '2px solid red' : '',                
                    }}
                    
                    >
                    {value.amount}
                  </div>
                </>
              }
              {/* estado he pegado una celda de anticipo en una nueva linea */}
              {
                
                ( table.getState().pastedCellState 
                  && row.id == table.options.state.cellPaste?.row
                  && column.id === table.options.state.cellPaste.column?.id
                ) ?
                <>
                  { table.getState().seizureState || table.getState().subtractState ?
                    <>
                      <div 
                        className='cell-data'              
                        style={{ 
                          backgroundColor: table.options.state.insertCanSave ? 'Yellow' : 'Red',
                          }}
                      >
                        <NumericFormat
                          prefix='-'
                          allowNegative={false}
                          value={isNaN(table.options.state.advancePayCal) ? table.options.state.insertSelectedAmount : table.options.state.advancePayCalc}
                          onValueChange={(values) => {                    
                            const limit = -Math.abs(column.columnDef.meta.insertSelectedAmount);
                            //let newCalc = column.columnDef.meta.insertSelectedAmount - values.value;
                            //console.log('newCalc', newCalc)
                            //column.columnDef.meta.setAdvancePayCalc(values.value)
                            // console.log('limit', limit) 
                            if (values.formattedValue !== '' && values.formattedValue >= limit) {
                              console.log('puede guardar')
                              column.columnDef.meta.setInsertCanSave(true);
                              //setear celda bajo copiada con el nuevo calculo
                              let onChangeValue = {...value};
                              onChangeValue.amount = -Math.abs(values.formattedValue);
                              console.log('cellCopied', table.options.state.cellCopy)
                              updateData(row.index, table.options.state.cellCopy.column.id, onChangeValue);
                              //setear la propia celda donde estoy cambiando 
                              onChangeValue.amount = values.formattedValue;
                              updateData(row.index, column.id, onChangeValue);
                            } else {
                              console.log('no puede guardar')
                              column.columnDef.meta.setInsertCanSave(false);
                            }
                          }}
                          style={{
                            border: '1px solid black',
                            borderRadius: '4px',
                            display: 'flex',
                            flexGrow: 0,
                            width: '50%',
                          }}
                        />
                      </div>
                    </>
                    :
                    <>
                      <div 
                        className='cell-data'              
                        style={{ 
                          backgroundColor: 'Lime',
                          border: table.options.state.insertCanSave ? '' : '2px solid red',
                          }}
                      >
                        <NumericFormat 
                          allowNegative={false}
                          value={isNaN(table.options.state.advancePayCal) ? table.options.state.insertSelectedAmount : table.options.state.advancePayCalc}
                          onValueChange={(values) => {                    
                            const limit = Math.abs(column.columnDef.meta.insertSelectedAmount);
                            //let newCalc = column.columnDef.meta.insertSelectedAmount - values.value;
                            //console.log('newCalc', newCalc)
                            //column.columnDef.meta.setAdvancePayCalc(values.value)
                            // console.log('limit', limit) 
                            if (values.formattedValue !== '' && values.formattedValue <= limit) {
                              console.log('puede guardar')
                              column.columnDef.meta.setInsertCanSave(true);
                              //setear celda bajo copiada con el nuevo calculo
                              let onChangeValue = {...value};
                              onChangeValue.amount = -Math.abs(values.formattedValue);
                              console.log('cellCopied', table.options.state.cellCopy)
                              updateData(row.index, table.options.state.cellCopy.column.id, onChangeValue);
                              //setear la propia celda donde estoy cambiando 
                              onChangeValue.amount = values.formattedValue;
                              updateData(row.index, column.id, onChangeValue);
                            } else {
                              console.log('no puede guardar')
                              column.columnDef.meta.setInsertCanSave(false);
                            }
                          }}
                          style={{
                            border: '1px solid black',
                            borderRadius: '4px',
                            display: 'flex',
                            flexGrow: 0,
                            width: '50%',
                          }}
                        />
                      </div>
                    </>
                  }
                </>
                :
                <>
                  { table.getState().subtractState || table.getState().seizureState ?
                    <>
                      {value.amount}
                    </>
                    :
                    <>
                      { (table.getState().pastedCellState 
                        && row.id == table.options.state.cellPaste?.row
                        && column.id === table.options.state.cellCopy.column?.id )
                        &&
                        <>
                          <div 
                          className='cell-data'
                          style={{ 
                          backgroundColor: !table.options.state.pasteState ? '' : 'yellow',
                          border: !table.options.state.pastedCellState ? '' : table.options.state.cellCopy?.column?.id == column.id ? table.options.state.insertCanSave ? '' : '2px solid red' :'',                
                          }}                    
                          >
                           {value.amount}
                          </div>
                        </>
                      }
                    </>
                  }
                </>
              }
            </>
          }
        </> 
      }
    </>
  )
}