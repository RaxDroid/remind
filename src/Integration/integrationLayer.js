//  Packages
var sqlite3 = require('sqlite3').verbose();

//  Logic

class Handler{
    constructor(){

    }
    getObject(){
        return this;
    }
}
class databaseHandler extends Handler{
    constructor(){
        super();
    }

    start(){
        const db = new sqlite3.Database('app.db',  (err) => {
            if (err) console.error('Database opening error: ', err);
           });
           this.db = db;
           
        }

    stop(){
        this.db.close();
    }
    
    getDBobject(){
        return this.db;
    }
    
}

class MateriaHandler{
    getMateria(){

    }
    
    

}
