//  Constants

let Estado = require("./Estado.js");

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
    get Id(){
        return this.id;
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