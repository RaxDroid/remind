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
            if (err) return console.error('Database opening error: ', err);
           });
           this.db = db;
           
        }

    stop(){
        this.db.close();
    }

    getDBobject(objectName){
        try {
            this.db.get()
        } catch (error) {
            
        }
    }
    
}

let dbObjects = ["Reminder", "Materia", "Estado", "TipoEstado"]
class MateriaHandler{
    getMateria(name){

    }

    createMateria(){

    }

    deleteMateria(){

    }
    getAllMaterias(){

    }
}
