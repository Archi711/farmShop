import Table from "./table"

export default interface Column<T>{
  value : T
  name : string
  table : Table
}