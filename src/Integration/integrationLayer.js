//  Packages
import { app } from "electron";
import { jsPDF } from "jspdf";
var modelReminder = require('../Models/Reminder.js');
var modelMateria = require('../Models/Materia.js');
var sqlite3 = require('sqlite3').verbose();

//  Constants

  let dbObjects = ["Reminder", "Materia", "Estado"]

//  Logic

class Handler{
    constructor(){

    }
    getObject(){
        return this;
    }
}
class DatabaseHandler extends Handler{
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

    firstStartup(){
        this.start();
        this.db.serialize(() => {
            this.db.run("CREATE TABLE \"TipoEstado\" (\"TipoEstadoId\" INTEGER UNIQUE,\"Nombre\" INTEGER NOT NULL, PRIMARY KEY(\"TipoEstadoId\"))")
            .run("CREATE TABLE \"Estado\" (\"EstadoId\"	INTEGER UNIQUE, \"Descripcion\"	TEXT DEFAULT '-', \"TipoEstadoId\" INTEGER NOT NULL, FOREIGN KEY(\"TipoEstadoId\") REFERENCES \"TipoEstado\"(\"TipoEstadoId\"), PRIMARY KEY(\"EstadoId\"))")
            .run("CREATE TABLE \"Materia\" (\"MateriaId\" INTEGER UNIQUE,\"Nombre\" TEXT NOT NULL,\"Estado\" INTEGER NOT NULL,\"Color\" TEXT NOT NULL DEFAULT 000000, PRIMARY KEY(\"MateriaId\"), FOREIGN KEY(\"Estado\") REFERENCES \"Estado\"(\"EstadoId\"))\"")
            .run("CREATE TABLE \"Reminder\" (\"ReminderId\"	INTEGER UNIQUE,\"MateriaId\" INTEGER NOT NULL,\"Titulo\" TEXT NOT NULL, \"Descripcion\"	TEXT NOT NULL DEFAULT '-',\"Fecha\"	TEXT NOT NULL,\"Estado\" INTEGER NOT NULL, PRIMARY KEY(\"ReminderId\"), FOREIGN KEY(\"Estado\") REFERENCES \"Estado\"(\"EstadoId\"), FOREIGN KEY(\"MateriaId\") REFERENCES \"Materia\"(\"MateriaId\"))");
            
        });
        this.close();
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
                data = "\"" + object["nombre"] + "\",\"" + object.EstadoId + "\", \"" + object["color"] + "\"";
                nameData = "Nombre, Estado, Color";
            }
            else if(objectName == "Reminder"){
                data = object.MateriaId + ", \"" + object["titulo"] + "\", \"" + object["descripcion"] + "\", \"" + object["fecha"] + "\", " + object.EstadoId;
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
            let data = "Nombre = " + object["nombre"] + ", Estado = " + object.EstadoId + ", Color = " + object["color"];
        }
        else if(objectName == "Reminder"){
            let data = "Materia = " + object.MateriaId + ", Titulo = " + object["titulo"] + ", Descripcion = " + object["descripcion"] + ", Fecha =" + object["fecha"] + ", Estado = " + object.EstadoId;
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

class MateriaHandler extends Handler{
    constructor(){
        super();

    }
    getMateriaById(id){
        var result = new DatabaseHandler().getDBObjectById("Materia",id);
        return result;
    }

    createMateria(nombre, estado, color){
        var x = new modelMateria.Materia(0, nombre, estado, color);
        var result = new DatabaseHandler().createDBObject("Materia", x);
        result.then((lastId) => x["id"] = lastId);
        return x;
    }

    updateMateria(object, nombre, estado, color){
        let x = new modelReminder.Reminder(object.Id, nombre, estado, color);
        var result = new DatabaseHandler().updateDBObject("Materia", x);
        return x;
    }

    deleteMateriaById(id){
        var result = new DatabaseHandler().deleteDBObjectById("Materia", id);
        return result;
    }

    getAllMaterias(){
        let result = new DatabaseHandler().getAllDBObjects("Materia");
        return result;
    }
}

class ReminderHandler extends Handler{
    constructor(){
        super();
        
    }

    getReminderById(id){
        var result = new DatabaseHandler().getDBObjectById("Reminder",id);
        return result;
    }

    createReminder(materia, titulo, descripcion, fecha, estado){
        let x = new modelReminder.Reminder(0, materia, titulo, descripcion, fecha, estado);
        var result = new DatabaseHandler().createDBObject("Reminder", x);
        result.then((lastId) => x.Id = lastId);
        return x;  

    }
    updateReminder(object, materia, titulo, descripcion, fecha, estado){
        let x = new modelReminder.Reminder(object.Id, materia, titulo, descripcion, fecha, estado);
        var result = new DatabaseHandler().updateDBObject("Reminder", x);
        return x;
    }

    deleteReminderById(id){
        var result = new DatabaseHandler().deleteDBObjectById("Reminder", id);
        return result;
    }

    getAllReminders(){
        var result = new DatabaseHandler().getAllDBObjects("Reminder");
        return result;
    }

}

class EstadoHandler extends Handler{
    constructor(){
        super();
    }

    getAllEstados(){
        var result = new DatabaseHandler().getAllDBObjects("Estado");
        return result;
    }

}

class ExportsHandler extends Handler{
    constructor(){
        super();
    }

    generateExport(exportType){
        var jsonObject = JSON.stringify(items);
        var fs = require('fs');

        if (exportType = "json"){
            let path = Date.now() + "_Export.json";
            fs.writeFile(path, jsonObject);
            return { "bool" : true, "path" : path}
        }

        else if (exportType = "csv"){
            let path = Date.now() + "_Export.csv";
            fs.writeFile(path, ConvertToCSV(jsonObject));
            return { "bool" : true, "path" : path}
        }

        else if (exportType = "pdf"){
            var doc = new jsPDF();
        
            let reminderList = await new ReminderHandler().getAllReminders()
            reminderList.forEach(function(reminder, i){
                doc.text("Materia: " + reminder.Materia.Nombre +
                ", Titulo: " + reminder.Titulo + 
                ", Descripcion: " + reminder.Descripcion +
                ", Fecha: " + reminder.Fecha, 
                20, 10 + (i * 10));
            });
            let path = Date.now() + "_Export.pdf";
            doc.save(path);
            return { "bool" : true, "path" : path}
        }
        else return { "bool" : false, "path" : ""};
    }
        
}
class StartupHandler extends Handler{
    constructor(){
        super();
    }

    startupEval(){
        const fs = require('fs');
        const path = '../Integration/app.db';
        try {
            if (fs.existsSync(path)) {
                return true;
            }
            else return firstStartup();
        } catch(err) {
            console.error(err);
        }
    }

    firstStartup(){
        let db = new DatabaseHandler();
        db.firstStartup();

        return true;
    }
}
    

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

exports.MateriaHandler = MateriaHandler;
exports.ReminderHandler = ReminderHandler;
exports.ExportsHandler = ExportsHandler;
exports.EstadoHandler = EstadoHandler;
exports.StartupHandler = StartupHandler;