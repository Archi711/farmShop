import Table from "../types/table"

export default function(obj : Table){
  Object.keys(obj).forEach((key) => {
    if(key !== "TABLE_NAME") {
      Reflect.set(obj, key,
        {
          name : `${obj.TABLE_NAME}.${key}`,
          table : obj
        },
        obj
      )
  }}) // minifify może zabić
}