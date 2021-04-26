//  Constants

let Estado = require("./Estado.js");

let materiaTypes = {
    "Inactivo": 0,
    "Activo": 1
}

//  Logic

class Materia{
    constructor(id, nombre, estado, color){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;   
        this.color = color;
    }
    get Id(){
        return this.id;
    }
    set Id(id){
        this.id = id;
    }

    get Nombre() {
        return this.nombre;
    }
    set Nombre(nombre){
        this.nombre = nombre;
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
    
    get Color() {
        return this.color;
    }
    set Color(color){
        this.color = color;
    }

    get EstadoDescription(){
        let estadoObject = EstadosMateria()
         estadoObject.forEach(element => {
             if (element["id"] == estado)
             return estado + " - " + element["descripcion"];
        });
    }
}

exports.Materia = Materia;