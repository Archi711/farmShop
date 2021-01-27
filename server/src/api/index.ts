import Column from './types/column'
import Table from './types/table'
import ConditionType from './types/conditionType'
import UpdateType from './types/updateType'
/**
 * Utility class used to build SQL queries
 */
class Query {
  queryString: string = ""
  tables: Set<string> = new Set<string>()

  select(column: Column<any>[]): Query {
    if(this.queryString.includes("SELECT")) return this
    let result
    result = column.map(e => {
      this.tables.add(e.table.TABLE_NAME)
      return e.name
    }).join(',')
    this.queryString += `SELECT ${result}`
    return this
  }
  from(table?: Table) {
    if(this.queryString.includes("FROM")) return this
    if(table) this.tables = new Set<string>([table.TABLE_NAME, ...this.tables])
    this.queryString += ` FROM ${Array.from(this.tables)[0]}`
    // ${Array.from(this.tables).join(',')}
    return this
  }
  join(columns: [Column<any>, Column<any>][]): Query {
    let result = ''
    columns.forEach((columnPair: any, i: number) => {
      result += `JOIN ${Array.from(this.tables)[i + 1]} ON ${columnPair[0].name} = ${columnPair[1].name} `
    })
    this.queryString += ` ${result}`
    return this
  }
  where(columns: Column<any>[], condition: ConditionType, values: any[]) : Query {
    if(this.queryString.includes("WHERE")) return this
    let result = ''
    columns.forEach((column, i) => {
      result += `${i ? ' AND' : ""} ${column.name} ${condition} '${values[i]}'`
    })
    this.queryString += ` WHERE ${result}`
    return this
  }
  insert(table : Table, data : any[]) : Query {
    const columnNames = Object.keys(table).filter((key, i) => key !== "TABLE_NAME" && i > 1).map(key => key).join(',')
    const values = data.map(el => typeof el === "string" ? `'${el}'` : el)
    this.queryString = `INSERT ${table.TABLE_NAME} (${columnNames}) OUTPUT inserted.${Object.keys(table)[1]} VALUES (${values})`
    return this
  }
  update(table : Table, column : Column<any>, value : any, type: UpdateType) : Query{
    if(this.queryString.includes("UPDATE")) return this
    let result = `UPDATE ${table.TABLE_NAME} SET ${column.name} = `
    switch(type){
      case UpdateType.value : {
        result += value
      }
      default: {
        result += `${column.name} ${type === UpdateType.inc ? '+' : '-'} ${value}`
      }
    }

    this.queryString = result
    return this
  }
  run(): string {
    return this.queryString
  }
  test(): Query {
    // tslint:disable-next-line:no-console
    console.log("query test: " + this.run())
    return this
  }
}

export default Query


