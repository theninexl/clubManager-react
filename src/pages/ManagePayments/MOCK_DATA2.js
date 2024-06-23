
const status_initial = {id: 1, name: "Inicial", color: "##FFFFFF"}
const status_inactive = {id: 2, name: "Inactivo", color: "#ECECEB"}
const status_notFullfilled = {id: 3, name: "No Cumplido", color: "#FF978E"}
const status_notEstimated = {id: 4, name: "No Estimado", color: "#FFCCA3"}
const status_estimated = {id: 5, name: "Estimado", color: "#FFE7A3"}
const status_metNotValidated = {id: 6, name: "Cumplido real no validado", color: "#A3A6FF"}
const status_metValidated = {id: 7, name: "Cumplido real validado", color: "#A3F5FF"}
const status_unpayable = {id: 8, name: "No se puede pagar", color: "#FFA3FB"}
const status_payable = {id: 9, name: "Se puede pagar", color: "#E9FFA3"}
const status_paid = {id: 10, name: "Pagado", color: "#B7FFA3"}


export const STATUSES = [
  {id: 1, name: "Inicial", color: "##FFFFFF"},
  {id: 2, name: "Inactivo", color: "#ECECEB"},
  {id: 3, name: "No Cumplido", color: "#FF978E"},
  {id: 4, name: "No Estimado", color: "#FFCCA3"},
  {id: 5, name: "Estimado", color: "#FFE7A3"},
  {id: 6, name: "Cumplido real no validado", color: "#A3A6FF"},
  {id: 7, name: "Cumplido real validado", color: "#A3F5FF"},
  {id: 8, name: "No se puede pagar", color: "#FFA3FB"},
  {id: 9, name: "Se puede pagar", color: "#E9FFA3"},
  {id: 10, name: "Pagado", color: "#B7FFA3"}
]

export const DATA = [
  {
    flag_fixed_clausula: 1,
    TipoClausula: '',
    Clausulas: "Salario fijo (mensual)",
    Importe: { amount: 100, status: status_initial, flag_suma:0},
    months: {
      1:{ mes: 'Ene22', amount: 1, status: status_initial, flag_suma:1},
      2:{ mes: 'Feb22',amount: 1, status: status_initial, flag_suma:1},
      3:{ mes: 'Mar22',amount: 1, status: status_initial, flag_suma:1},
    },
    total:""
  },
  {
    flag_fixed_clausula: 1,
    TipoClausula: '',
    Clausulas: "Salario WHATEVER (mensual)",
    Importe: { amount: 100, status: status_initial, flag_suma:0},
    months: {
      1:{ mes: 'Ene22', amount: 2, status: status_initial, flag_suma:1},
      2:{ mes: 'Feb22',amount: 2, status: status_initial, flag_suma:1},
      3:{ mes: 'Mar22',amount: 2, status: status_initial, flag_suma:1},
    },
    total:""
  }
]