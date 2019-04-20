import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: SQLiteObject = null;

  constructor() { }

  setDatabase(db: SQLiteObject){
    console.log(db);
    if(this.db === null){
      this.db = db;
    }
  }

  createTables(){
    console.log('create table success');
    let list : string = "CREATE TABLE IF NOT EXISTS list(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), date DATE, status INTEGER)";
    let queryTwo: string = "CREATE TABLE IF NOT EXISTS list_items(id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, name VARCHAR(100), description TEXT, price FLOAT, image TEXT, CONSTRAINT fk_list_items FOREIGN KEY(list_id) REFERENCES list(id) ON DELETE CASCADE)";

    this.db.executeSql(list, []);
    return this.db.executeSql(queryTwo, []);
  }

  getAllList(){
    let query = "SELECT * FROM list";
    return this.db.executeSql(query, []).then(items => {
      let lists = [];
      for (let index = 0; index < items.rows.length; index++) {
        lists.push(items.rows.item(index));
      }
      return Promise.resolve(lists);
    }).catch(e => {
      console.log(e)
      Promise.reject(e);
    });
  }

  getAllItemList(idList){
    let query = "SELECT * FROM list_items WHERE list_id=?";
    return this.db.executeSql(query, [idList]).then(items => {
      let listItem = [];
      for (let index = 0; index < items.rows.length; index++) {
        listItem.push(items.rows.item(index));
      }
      return Promise.resolve(listItem);
    }).catch(e => {
      console.log(e)
      Promise.reject(e);
    });
  }

  createList(name:string){
    let query = "INSERT INTO list(name, date, status) VALUES(?, date('now', 'localtime'), '0')";
    return this.db.executeSql(query,[name]);
  }

  createItemList(idList, name:string, description:string, price, image:string){
    console.log('create item'+idList+ '  '+ price+name +'   '+description+ image);
    let query = "INSERT INTO list_items(list_id, name, description, price, image) VALUES(?, ?, ?, ?, ?); PRAGMA foreign_keys = ON";
    return this.db.executeSql(query, [idList, name, description, price, image]);
  }

  updateList(lista: any){
    let sql = 'UPDATE list SET name=?, status=? WHERE id=?'
    return this.db.executeSql(sql, [lista.name,lista.status,lista.id]);
  }

  updateItemList(list:any){
    console.log('actualizando items'+list.id)
    let sql = 'UPDATE list_items SET name=? ,description=?, price=?, image=? WHERE list_id=? AND id=?';
    return this.db.executeSql(sql, [list.name, list.description, list.price, list.image, list.list_id,list.id]);

  }

  deleteList(id){
    let query = "DELETE FROM list WHERE id=?"
    return this.db.executeSql(query,[id]);
  }

  deleteItemList(idList, idItem){
    let query = "DELETE FROM list_items WHERE list_id=? AND id=?";
    return this.db.executeSql(query,[idList, idItem]);
  }

  selectList(id: string) {
    let sql = 'SELECT * FROM  list WHERE id=?';
    return this.db.executeSql(sql, [id]);
  }

  getPriceTotal(){
    let query = "SELECT list_id, sum(price) as price FROM list_items GROUP BY list_id";
    return this.db.executeSql(query, []).then(items => {
      let lists = [];
      for (let index = 0; index < items.rows.length; index++) {
        lists.push(items.rows.item(index));
      }
      return Promise.resolve(lists);
    }).catch(e => {
      console.log(e)
      Promise.reject(e);
    });
  }


}