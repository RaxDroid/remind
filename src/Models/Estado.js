//  Constants

let estadoList = [];

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

        estadoList.push(this);
    }
}

function EstadosReminder(){

    let estadosReminder = [];

    estadoList.forEach(
        (estado) => { if (estado.tipoEstado == 1)
        estadosReminder.push(estado);});

        return estadosReminder();

}

function EstadosMateria(){

    let estadosMateria = [];

    estadoList.forEach(
        (estado) => { if (estado.tipoEstado == 2)
        estadosReminder.push(estado);});

        return estadosMateria();

}

exports.Estado = Estado;
exports.EstadosMateria = EstadosMateria;
exports.EstadosReminder = EstadosReminder;
