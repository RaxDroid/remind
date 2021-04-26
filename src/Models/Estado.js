//  Constants

let estadoTypes = {
    "Reminder": 1,
    "Materia": 2
}

//  Logic

class Estado{
    constructor(id, descripcion, tipoEstado){
        this.id = id;
        this.descripcion = descripcion;
        this.tipoEstado = tipoEstado;
    }
}
exports.Estado = Estado;