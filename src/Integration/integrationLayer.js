//  Packages
var modelReminder = require('../Models/Reminder.js');
var modelMateria = require('../Models/Materia.js');
var sqlite3 = require('sqlite3').verbose();

//  Constants

let dbObjects = ["Reminder", "Materia"]

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
           console.log('Connected to the app\'s SQlite database.');
           this.db = db;
           
        }

    stop(){
        this.db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
          });
    }

    getAllDBObjects(objectName){
        this.db.start();
        let sql = "SELECT * FROM " + objectName;
        var result = [];
        try {
            this.db.each(sql, (err, row) => { 
                if (err) throw 00; 
                result.push(row);
            });

        } catch (error) {
            console.error(error)
        }
        this.stop();
        return result;
        
    }

    getDBObjectById(objectName, id){
        
        this.db.start();
        let sql = "SELECT * FROM " + objectName + "WHERE " + objectName + "Id = ?";

        try {
            this.db.get(sql, id, (err, row) => { 
                if (err) throw 00;
                this.stop();
                return row ? row : console.error("No record found");
            });

        } catch (error) {
            console.error(error);
        }
    }
    
    createDBObject(objectName, object){

        this.db.start();
        let sql = "INSERT INTO " + objectName + "VALUES(?)";
        try {
            if(objectName == "Materia"){
                this.db.run(sql, object["nombre"] + ", " + object["estado"] + ", " + object["color"]);
                this.stop();
                return console.log("completed");

            }
            else if(objectName == "Reminder"){
                this.db.run(sql, object["materia"]["id"] + ", " + object["titulo"] + ", " + object["descripcion"] + ", " + object["fecha"] + ", " + object["estado"]["id"]);
                this.stop();
                return console.log("completed");
            }
            

        } catch (error) {
            console.error(error);
        }
    }

    deleteDBObjectById(objectName, id){
        this.db.start();
        this.db.run('DELETE FROM' + objectName + "WHERE " + objectName + "Id = ?", id, function(err) {
            if (err) {
                this.stop();
                return console.error(err.message);
            }
            console.log(`Row(s) deleted ${this.changes}`);
          });
          this.stop();
          return;
          
    }
    
}

class MateriaHandler{
    getMateriaById(id){
        var result = new databaseHandler().getDBObjectById("Materia",id);
        return result;
    }

    createMateria(nombre, estado, color){
        let x = new modelMateria.Materia(0, nombre, estado, color);
        var result = new databaseHandler().createDBObject("Materia", x);
        return;
    }

    deleteMateriaById(id){
        var result = new databaseHandler().deleteDBObjectById("Materia", id);
        return;
    }

    getAllMaterias(){
        var result = new databaseHandler().getAllDBObjects("Materia");
        return result;
    }
}

class ReminderHandler{
    getReminder(name){
        var result = new databaseHandler().getDBObjectById("Reminder",id);
        return result;
    }

    createReminder(){
        let x = new modelReminder.Reminder(0, nombre, estado, color);
        var result = new databaseHandler().createDBObject("Reminder", x);
        return result;

    }

    deleteReminder(id){
        var result = new databaseHandler().deleteDBObjectById("Reminder", id);
        return;
    }

    getAllReminders(){
        var result = new databaseHandler().getAllDBObjects("Reminder");
        return result;
    }

}

