import Column from './types/column'
import Table from './types/table'
class Query {
  queryString: string = ""
  tables: Set<string> = new Set<string>()

  select(column: Column<any>[]): Query {
    let result
    result = column.map(e => {
      this.tables.add(e.table.TABLE_NAME)
      return e.name
    }).join(',')
    this.queryString += `SELECT ${result}`
    return this
  }
  from(table?: Table) {
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


