//  Constants

let materiaTypes = {
    "Activo": 1,
    "Inactivo": 2
}

//  Logic

class Materia{
    constructor(id, nombre, estado, color){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;   
        this.color = color;
    }
}
