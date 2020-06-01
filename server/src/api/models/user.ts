import Table from '../types/table'
import Column from '../types/column'
import columnSetter from './columnSetter'

class Users extends Table{
  UserID : Column<number> = null
  Nick : Column<string> = null
  Password : Column<string> = null
  Email : Column<string> = null
  Name : Column<string> = null
  Surname : Column<string> = null
  IDAddress : Column<number> = null
  constructor(){
    super()
    columnSetter(this)
  }
}

export default new Users()