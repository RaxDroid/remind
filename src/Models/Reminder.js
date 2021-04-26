//  Constants

let Estado = require("./Estado.js");

let reminderTypes = {
    "Pendiente": 1,
    "Completado": 2,
    "Inactivo": 3
}

//  Logic

class Reminder{
    constructor(id, materia, titulo, descripcion, fecha, estado){
        this.id = id;
        this.materia = materia;
        this.titulo = titulo;   
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.estado = estado;
    }
    get MainInfo(){
        return this.titulo + " - " + this.descripcion;
    }
    
    get EstadoDescription(){
        let estadoObject = EstadosReminder()
         estadoObject.forEach(element => {
             if (element["id"] == estado)
             return estado + " - " + element["descripcion"];
        });
    }
}


exports.Reminder = Reminder;
