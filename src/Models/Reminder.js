//  Constants

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
exports.Reminder = Reminder;
