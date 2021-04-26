//  Constants

let Estado = require("./Estado.js");

let reminderTypes = {
    "Pendiente": 0,
    "Completado": 1,
    "Inactivo": 2
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

    get Materia() {
        return this.materia;
    }
    set Materia(materia){
        this.materia = materia;
    }

    get MateriaId(){
        return this.materia["id"];
    }
    
    get Titulo() {
        return this.titulo;
    }
    set Titulo(titulo){
        this.titulo = titulo;
    }

    get Descripcion() {
        return this.descripcion;
    }
    set Descripcion(descripcion){
        this.descripcion = descripcion;
    }

    get Fecha() {
        return this.fecha;
    }
    set Fecha(fecha){
        this.fecha = fecha;
    }
    
    get Estado() {
        return this.estado;
    }
    set Estado(estado){
        this.estado = estado;
    }

    get EstadoId() {
        return this.estado["id"];
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
