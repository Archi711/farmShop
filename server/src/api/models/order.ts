import Table from '../types/table'
import Column from '../types/column'
import columnSetter from './columnSetter'

class Orders extends Table{
  OrderID : Column<number> = null
  IDUser : Column<number> = null
  TotalPrice : Column<number> = null
  constructor(){
    super()
    columnSetter(this)
  }
}

export default new Orders()