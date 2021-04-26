//  Constants

let Estado = require(".Estado.js");
const { EstadosMateria } = require("./Estado");

let materiaTypes = {
    "Inactivo": 4,
    "Activo": 5
}

//  Logic

class Materia{
    constructor(id, nombre, estado, color){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;   
        this.color = color;
    }

    get Nombre() {
        return this.nombre;
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