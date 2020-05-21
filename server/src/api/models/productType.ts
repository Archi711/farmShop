import Table from '../types/table'
import Column from '../types/column'
import columnSetter from './columnSetter'

class ProductTypes extends Table{
  ProductTypeID : Column<number> = null
  Name : Column<string> = null
  constructor(){
    super()
    columnSetter(this)
  }
}

export default new ProductTypes()