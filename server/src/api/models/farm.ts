import Table from "../types/table"
import columnSetter from "./columnSetter"
import Column from "../types/column"

class Farms extends Table{
  FarmID : Column<number> = null
  FarmName : Column<string> = null
  IDAddress : Column<number> = null
  constructor(){
    super()
    columnSetter(this)
  }
}

export default new Farms()