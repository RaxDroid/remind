//  Constants

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
}
exports.Materia = Materia;