import Table from '../types/table'
import Column from '../types/column'
import columnSetter from './columnSetter'

class Products extends Table{
  ProductID : Column<number> = null
  ProductName : Column<string> = null
  IDType : Column<number> = null
  Quantity : Column<number> = null
  Price : Column<number> = null
  ImageURL : Column<string> = null
  IDFarm : Column<number> = null
  Description : Column<string> = null
  constructor(){
    super()
    columnSetter(this)
  }
}

export default new Products()