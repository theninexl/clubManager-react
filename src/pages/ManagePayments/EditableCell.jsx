import { useEffect, useRef, useState } from "react";
import { DropDownMenu, DropdownItem } from "./DropDownMenu";
import { v4 as uuidv4 } from 'uuid';
import { IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolContentCopy, SymbolPaste } from "../../components/UI/objects/symbols";
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


export const EditableCell = ({ getValue, row, column, table, initialAdvancePayCalc, onAdvancePayCalcChange, objetoGuardado }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue)
  const [advancePayCalc, setAdvancePayCalc] = useState();
  const actualValueForCalcRef = useRef();
  const { updateData, newSanctionLine, newAdvancePayLine, newDeferedPayLine, pasteCell } = table.options.meta;

  const STATUSES = [
    {id: 1, name: "Inicial", color: "##FFFFFF"},
    {id: 2, name: "Inactivo", color: "#ECECEB"},
    {id: 3, name: "No Cumplido", color: "#FF978E"},
    {id: 4, name: "No Estimado", color: "#FFCCA3"},
    {id: 5, name: "Estimado", color: "#FFE7A3"},
    {id: 6, name: "Cumplido real no validado", color: "#A3A6FF"},
    {id: 7, name: "Cumplido real validado", color: "#A3F5FF"},
    {id: 8, name: "No se puede pagar", color: "#FFA3FB"},
    {id: 9, name: "Se puede pagar", color: "#E9FFA3"},
    {id: 10, name: "Pagado", color: "#B7FFA3"},
    {id: 11, name: "Liquidación", color: "#57b1fc"},
  ]

  const getStatusColor = (statusId) => {
    const status = STATUSES.find(status => status.id === statusId);
    return status ? status.color : '#FFFFFF'; // Color predeterminado si el statusId no es válido
  };

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  useEffect(()=>{
    setAdvancePayCalc(initialAdvancePayCalc)
  },[initialAdvancePayCalc])

  return (
    <>
      {row.original.flag_fixed_clausula == 1 ? 
        <>
          { (row.getIsSelected() == true && (row.index === table.getSelectedRowModel().rows[0].index) ) ?
            <>
              <div 
              className='cell-data'
              style={{ 
                backgroundColor: getStatusColor(getValue().status),
                }}>
                  {/* si es la columna de importe total solo monstramos el amount, y no el campo editable */}
                  { column.id == 'Importe' &&
                    <>
                      <NumericFormat
                        valueIsNumericString={true}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        value={value.amount}
                      />
                    </>
                  }
                  { column.id !== 'Importe' &&
                  <>
                    {/* <input
                      value={value.amount}
                      onChange={(e) => {                    
                        let onChangeValue = {...value}
                        onChangeValue.amount = e.target.value;
                        setValue(onChangeValue)
                      }}
                      onBlur={() => {
                        updateData(row.index, column, value)
                      }}
                      style={{
                        border: '1px solid lightgray',
                        borderRadius: '4px',
                        display: 'flex',
                        flexGrow: 0,
                        width: '50%',
                        height: '28px',
                      }}
                    />  */}
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        value={value.amount}
                        onValueChange={(values) => {                    
                          let onChangeValue = {...value}
                          onChangeValue.amount = values.value;
                          setValue(onChangeValue)
                        }}
                        onBlur={() => {
                          updateData(row.index, column, value)
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
                    <DropDownMenu key={uuidv4()}>
                      { STATUSES.map(item => { 
                        return (
                          <>
                            <DropdownItem 
                              key={uuidv4()}
                              onClick={ () => {
                                updateData( row.index, column, {mes:value.mes, amount:value.amount, status:item.id, flag_suma:value.flag_suma, id_calendario:value.id_calendario})
                              }}
                            >
                              <ColorIcon Color={item.color} />{item.name}
                            </DropdownItem>
                          </>
                        )}
                      )}
                    </DropDownMenu>
                  </>
                }
              </div>
            </>
            :
            <>   
              <div 
              className='cell-data'
              style={{ 
                backgroundColor: !table.options.state.pasteState ? getStatusColor(getValue().status) : (table.options.state.cellCopy?.column?.id == column.id && table.options.state.cellCopy?.row == row.id) ? '' : '',
        
                }}
                
                >
                  { ( table.getState().pastedCellState
                      && table.options.state.cellCopy?.column?.id == column.id 
                      && table.options.state.cellCopy?.row == row.id
                    ) ? 
                    <>
                      <NumericFormat
                        valueIsNumericString={true}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        value={value.amount}
                      />
                    </>
                    :
                    <>
                      <NumericFormat
                        valueIsNumericString={true}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        value={initialValue.amount}
                      />
                    </>
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
                backgroundColor: getStatusColor(getValue().status),
                }}
              >
              <NumericFormat
                valueIsNumericString={true}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                value={value.amount}
              />
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
                          // console.log('DDD');
                          // console.log('puede guardar')                          
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
                    backgroundColor: getStatusColor(getValue().status),
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
                      <NumericFormat
                        valueIsNumericString={true}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        value={value.amount}
                      />
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
                          value={advancePayCalc}
                          thousandSeparator="."
                          decimalSeparator=","
                          onValueChange={(values) => {  
                            actualValueForCalcRef.current = values.value;
                            onAdvancePayCalcChange(values.value)              
                          }}
                          onBlur={()=>{
                            const limit = -Math.abs(table.options.state.insertSelectedAmount);
                            if (actualValueForCalcRef.current !== '' && actualValueForCalcRef.current >= limit) {
                              // console.log('AAA');
                              // console.log('puede guardar')
                              column.columnDef.meta.setInsertCanSave(true);
                              //setear celda bajo copiada con el nuevo calculo
                              let onChangeValue = {...value};
                              onChangeValue.amount = -Math.abs(actualValueForCalcRef.current);                        
                              updateData(row.index, table.options.state.cellCopy.column, onChangeValue);
                              //setear la propia celda donde estoy cambiando 
                              onChangeValue.amount = actualValueForCalcRef.current;
                              updateData(row.index, column, onChangeValue);
                              actualValueForCalcRef.current = 0;
                            } else {
                              // console.log('no puede guardar')
                              // console.log('data no se puede guardar:', table.options.state.data)
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
                          value={advancePayCalc}
                          thousandSeparator="."
                          decimalSeparator=","
                          // value={isNaN(table.options.state.advancePayCalc) ? table.options.state.insertSelectedAmount : table.options.state.advancePayCalc}
                          onValueChange={(values) => {
                            actualValueForCalcRef.current = values.value;
                            onAdvancePayCalcChange(values.value)
                          }}
                          onBlur={() => {
                            const limit = Math.abs(table.options.state.insertSelectedAmount);
                            console.log('limit', limit)
                            console.log('actual value', actualValueForCalcRef.current)
                            if (actualValueForCalcRef.current !== '' && actualValueForCalcRef.current <= limit) {
                              // console.log('puede guardar')
                              column.columnDef.meta.setInsertCanSave(true);
                              // console.log('setear celda bajo copiada con el nuevo calculo')
                              let onChangeValue = {...value};
                              onChangeValue.amount = -Math.abs(actualValueForCalcRef.current);
                              // console.log('onChangeValue', onChangeValue)
                              updateData(row.index, table.options.state.cellCopy.column, onChangeValue);
                              // console.log('setear la propia celda donde estoy cambiando') 
                              onChangeValue.amount = actualValueForCalcRef.current;
                              // console.log('onChangeValue2',onChangeValue)
                              updateData(row.index, column, onChangeValue);
                              actualValueForCalcRef.current = 0;
                            } else {
                              // console.log('no puede guardar')
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
                      <NumericFormat
                        valueIsNumericString={true}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        value={value.amount}
                      />
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
                            <NumericFormat
                              valueIsNumericString={true}
                              displayType="text"
                              thousandSeparator="."
                              decimalSeparator=","
                              value={value.amount}
                            />
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