import { useEffect, useState } from "react";
import { DropDownMenu, DropdownItem } from "./DropDownMenu";
import { STATUSES } from "./MOCK_DATA";
import { IconButtonSmallPrimary, IconButtonSmallerPrimary } from "../../components/UI/objects/buttons";
import { SymbolContentCopy, SymbolSave } from "../../components/UI/objects/symbols";
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
  const [isCellSelected, setIsCellSelected] = useState(false)
  // console.log('column', column.getIndex())
  // console.log('row', row)
  const { updateData, newSanctionLine, newAdvancePayLine } = table.options.meta;

  useEffect(()=> {
    setValue(initialValue)
  },[initialValue])

  return (
    <>
      {row.index < 8 ? 
        <>
          { (table.getIsSomePageRowsSelected() == true && row.index === column.columnDef.meta.rowSelected2) ?
            <>
              <div style={{ 
                backgroundColor: getValue().status?.color,
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '8px', 
                padding: '8px',
                height: '100%',
                }}>
                <input
                  value={value.amount}
                  onChange={(e) => {
                    // console.log('value antes', value);
                    let onChangeValue = {...value}
                    onChangeValue.amount = e.target.value;
                    // console.log('change', onChangeValue)
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
              <div style={{ 
                backgroundColor: getValue().status?.color,
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'flex-end',
                padding: '8px',
                }}
                
                >
                  { initialValue.amount }
                  { (table.getState().subtractState || table.getState().advancePayState) && 
                    <IconButtonSmallerPrimary
                      style={{marginLeft: '8px'}}
                      onClick={() => {
                        if (table.getState().subtractState) { newSanctionLine(row, column.id, value.amount) }
                        else if (table.getState().advancePayState) { newAdvancePayLine(row, column, value.amount )}                       

                      }}
                    >
                      <SymbolContentCopy />
                    </IconButtonSmallerPrimary>
                  }
              </div>              
            </>
          }
        </> :
        <>
          { ((table.getState().subtractState || table.getState().advancedPayState )  && column.id == column.columnDef.meta.insertSelectedCol && row.id == table.getRowCount()-1) && 
            <>
              <div               
              style={{ 
                backgroundColor: table.getState().subtractState ? '#FF978E' : '#B7FFA3',
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'flex-end',
                padding: '0 8px',
                height: '100%',
                }}
              >
                <NumericFormat 
                  allowNegative={false}
                  prefix="-"
                  onValueChange={(values) => {                    
                    const limit = -Math.abs(column.columnDef.meta.insertSelectedAmount);                    
                    if (values.formattedValue !== '' && values.formattedValue >= limit && values.formattedValue <= 0) {
                      console.log('puede guardar')
                      let onChangeValue = {...value};
                      onChangeValue.amount = values.formattedValue;
                      // setValue(onChangeValue);
                      column.columnDef.meta.setInsertCanSave(true)
                      updateData(row.index, column.id, onChangeValue);
                    } else {
                      console.log('no puede guardar')
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
          { (!table.getState().subtractState || ( table.getState().subtractState && row.id != table.getRowCount()-1 ) ) &&
            <>
              <div style={{ 
                backgroundColor: getValue().status?.color,
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '8px', 
                padding: '8px',
                }}
              >
              {value.amount}
              </div>
            </>
          }
        </> 
      }
    </>
  )
}