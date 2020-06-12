import Table from '../types/table'
import Column from '../types/column'
import columnSetter from './columnSetter'

class ProductHistory extends Table{
  ProductHistoryEntryID : Column<number> = null
  OrderedQuantity : Column<number> = null
  IDOrder : Column<number> = null
  IDProduct : Column<number> = null
  constructor(){
    super()
    columnSetter(this)
  }
}

export default new ProductHistory()