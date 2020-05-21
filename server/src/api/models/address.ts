import Table from '../types/table'
import Column from '../types/column'
import columnSetter from './columnSetter'

class Addresses extends Table{
  AddressID : Column<number> = null
  Address : Column<string> = null
  City : Column<string> = null
  ZipCode : Column<string> = null
  constructor(){
    super()
    columnSetter(this)
  }
}

export default new Addresses()
