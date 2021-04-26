//  Packages

var modelReminder = require('../Models/Reminder.js');
var modelMateria = require('../Models/Materia.js');
var modelEstado = require('../Models/Estado.js');
var integrationLayer = require('../Integration/integrationLayer.js');

//  Constants

let materiaList = [];
let reminderList = [];

//  Logic

class MateriaService{
    constructor(){
        materiaHandler = new integrationLayer.MateriaHandler();
    }

    async createMateria(nombre, color){
        
        var dbResult = await this.materiaHandler.createMateria(nombre, 4, color);
        
        var materiaResult = new modelMateria.Materia(
            materiaList[materiaList.length]["id"] + 1,
            dbResult["Nombre"],
            dbResult["Estado"],
            dbResult["Color"]);
        materiaList.push(materiaResult);
        return materiaResult;

    }

    async getAllMaterias(){

        var materiaResult = await this.materiaHandler.getAllMaterias();
        materiaList = [];
        materiaResult.forEach((objectMateria) => { 
            materiaList.push(new modelMateria.Materia(
                objectMateria["MateriaId"],
                objectMateria["Nombre"],
                objectMateria["Estado"],
                objectMateria["Color"]))});
        return materiaList;

    }

    async getMateria(id){
        
        materiaList.find
        return materiaResult;

    }

    async updateMateria(objectOld, objectNew){
        var materiaResult = await this.materiaHandler.updateMateria(objectOld,objectNew["nombre"],objectNew["estado"],objectNew["color"]);
        

    }



}

class ReminderService{
    constructor(){

    }

}

class FirstStartService{

}