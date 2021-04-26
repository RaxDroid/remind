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
        var db = new sqlite3.Database('./app.db',  (err) => {
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
        this.start();
        
        var sql = "SELECT * FROM " + objectName;
        var result = [];
        try {
            
            return new Promise((resolve, reject) => {
                this.db.all(sql, function(err, rows){
                if (err) reject(err);
                resolve(rows);
                });
            
            this.stop();
            });

        } catch (error) {
            console.error(error);
        }
        
    }

    getDBObjectById(objectName, id){
        
        this.start();

        try {

            return new Promise((resolve, reject) => {
                let sql = "SELECT * FROM " + objectName + " WHERE " + objectName + "Id = ?";
                this.db.get(sql, [id],(err, row) => { 
                if (err) reject(err);
                this.stop();
                resolve(row);
            });
        })
        } catch(error){
            console.error(error);
        }
            
    }
    
    createDBObject(objectName, object){

        var resultId;
        var nameData;
        var data;
        this.start();
        
        try {
            if(objectName == "Materia"){
                data = "\"" + object["nombre"] + "\",\"" + object["estado"] + "\", \"" + object["color"] + "\"";
                nameData = "Nombre, Estado, Color";
            }
            else if(objectName == "Reminder"){
                data = object["materia"] + ", \"" + object["titulo"] + "\", \"" + object["descripcion"] + "\", \"" + object["fecha"] + "\", " + object["estado"];
                nameData = " MateriaId, Titulo, Descripcion, Fecha, Estado"
            }
            let sql = 'INSERT INTO ' + objectName + "(" + nameData + ")" + " VALUES( " + data + " )";
            
            return new Promise((resolve, reject) => {
                this.db.run(sql, [], function(err) { 
                if (err) {
                    reject(err);
                } resolve(this.lastId)});
                this.stop();
        })}
        catch (error) {
            console.error(error);
        }
    }

    updateDBObject(objectName, object){
        this.start();
        let sql = "UPDATE " + objectName + " SET ? WHERE " + objectName + "Id = " + object["id"];

        if(objectName == "Materia"){
            let data = "Nombre = " + object["nombre"] + ", Estado = " + object["estado"] + ", Color = " + object["color"];
        }
        else if(objectName == "Reminder"){
            let data = "Materia = " + object["materia"] + ", Titulo = " + object["titulo"] + ", Descripcion = " + object["descripcion"] + ", Fecha =" + object["fecha"] + ", Estado = " + object["estado"];
        }
        
        return new Promise((resolve, reject) => {
        this.db.run(sql, data, function(err) {
        if (err) {
            reject(err);
        }
        resolve(this.changes);});
        this.stop();
        });
}

    deleteDBObjectById(objectName, id){
        this.start();
    
        return new Promise((resolve, reject) => {
        this.db.run('DELETE FROM ' + objectName + " WHERE " + objectName + "Id = ?", [id], function(err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
            console.log(`Row(s) deleted ${this.changes}`);
          });
          this.stop();
    
    });
}
    
}

class MateriaHandler{
    constructor(){

    }
    getMateriaById(id){
        var result = new databaseHandler().getDBObjectById("Materia",id);
        return result;
    }

    createMateria(nombre, estado, color){
        var x = new modelMateria.Materia(0, nombre, estado, color);
        var result = new databaseHandler().createDBObject("Materia", x);
        result.then((lastId) => x["id"] = lastId);
        return x;
    }

    updateMateria(object, nombre, estado, color){
        let x = new modelReminder.Reminder(object["id"], nombre, estado, color);
        var result = new databaseHandler().updateDBObject("Materia", x);
        return;
    }

    deleteMateriaById(id){
        var result = new databaseHandler().deleteDBObjectById("Materia", id);
        return result;
    }

    getAllMaterias(){
        let result = new databaseHandler().getAllDBObjects("Materia");
        return result;
    }
}

class ReminderHandler{
    constructor(){
        
    }
    getReminderById(id){
        var result = new databaseHandler().getDBObjectById("Reminder",id);
        return result;
    }

    createReminder(materia, titulo, descripcion, fecha, estado){
        let x = new modelReminder.Reminder(0, materia, titulo, descripcion, fecha, estado);
        var result = new databaseHandler().createDBObject("Reminder", x);
        result.then((lastId) => x["id"] = lastId);
        return x;   

    }
    updateReminder(object, materia, titulo, descripcion, fecha, estado){
        let x = new modelReminder.Reminder(object["id"], materia, titulo, descripcion, fecha, estado);
        var result = new databaseHandler().updateDBObject("Reminder", x);
        return;
    }

    deleteReminderById(id){
        var result = new databaseHandler().deleteDBObjectById("Reminder", id);
        return result;
    }

    getAllReminders(){
        var result = new databaseHandler().getAllDBObjects("Reminder");
        return result;
    }

}

exports.MateriaHandler = MateriaHandler;
exports.ReminderHandler = ReminderHandler;