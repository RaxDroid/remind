//  Packages

var modelReminder = require('../Models/Reminder.js');
var modelMateria = require('../Models/Materia.js');
var modelEstado = require('../Models/Estado.js');
import { MateriaHandler, ReminderHandler, ExportsHandler, EstadoHandler, StartupHandler } from "../Models/Estado.js";

//  Constants

let materiaList = [];
let reminderList = [];
let estadoList = [];

//  Logic

class MateriaService{
    constructor(){
        materiaHandler = new MateriaHandler();
    }

    async createMateria(nombre, color){
        
        try{
        var dbResult = await this.materiaHandler.createMateria(nombre, modelEstado.EstadosMateria[0], color);
        
        var materiaResult = new modelMateria.Materia(
            materiaList[materiaList.length].Id + 1,
            nombre,
            modelEstado.EstadosMateria[0],
            color);
        materiaList.push(materiaResult);
        return materiaResult;
        }
        catch(error){
            console.error(error);
        }

    }

    async getAllMaterias(){

        try{
        var materiaResult = await this.materiaHandler.getAllMaterias();
        materiaList = [];
        materiaResult.forEach((objectMateria) => { 
            materiaList.push(new modelMateria.Materia(
                objectMateria["MateriaId"],
                objectMateria["Nombre"],
                modelEstado.EstadosMateria.find(function (element) { return element.Id == dbResult["Estado"];}),
                objectMateria["Color"]))});
        return materiaList;
        }
        catch(error){
            console.error(error);
        }

    }

    async getMateria(id){
        
        try{
            var materiaResult = materiaList.find(function (element) { return element.Id == id;});
            return materiaResult;
        }
        catch(error){
            console.error(error);
        }

    }

    async updateMateria(objectOld, objectNew){

        try{
        var materiaResult = await this.materiaHandler.updateMateria(objectOld,objectNew.Nombre,objectNew.Estado,objectNew.Color);
        materiaList[materiaList.findIndex(function (element) { return element == objectOld;})] = materiaResult;
        }
        catch(error){
            console.error(error);
        }
    }

    async deleteMateria(id){
        
        try{
        for (let index = 0; index < reminderList.length; index++) {
            if (reminderList[index].MateriaId == id){
            var remindersDeleted = await new integrationLayer.ReminderHandler().deleteReminderById(reminderList[index].MateriaId);
            reminderList.splice(index,1);
            console.log(remindersDeleted);
            }
        }
        var QuantityChanged = await this.materiaHandler.deleteMateria(id);
        materiaList.splice(materiaList.findIndex(function (element){ return element.Id == id}),1);
        return QuantityChanged;
        }
        catch(error){
            console.error(error);
        }

    }

    

}

class ReminderService{
    constructor(){
        reminderHandler = new ReminderHandler();

    }

    async createReminder(materia, titulo, descripcion, fecha){
        
        try{
        var dbResult = await this.reminderHandler.createReminder(materia, titulo, descripcion, fecha, modelEstado.EstadosReminder[0]);
        
        var reminderResult = new modelReminder.Reminder(
            reminderList[reminderList.length].Id + 1,
            materiaList.find(function (element) { return element == dbResult["MateriaId"];}),
            titulo,
            descripcion,
            fecha,
            modelEstado.EstadosReminder[0]
            );
        reminderList.push(reminderResult);
        return reminderResult;
        }
        catch(error){
            console.error(error);
        }

    }

    async getAllReminders(){

        try{
        var reminderResult = await this.reminderHandler.getAllReminders();
        reminderList = [];
        reminderResult.forEach((objectReminder) => { 
            reminderList.push(new modelReminder.Reminder(
                objectReminder["ReminderId"],
                materiaList.find(function (element) { return element == objectReminder["MateriaId"];}),
                objectReminder["Titulo"],
                objectReminder["Descripcion"],
                objectReminder["Fecha"],
                modelEstado.EstadosReminder.find(function (element) { return element.Id == objectReminder["Estado"];})
                ));});
        return reminderList;
        }
        catch(error){
            console.error(error);
        }

    }

    async getReminder(id){
        
        try{
            var reminderResult = reminderList.find(function (element) { return element.Id == id;});
            return reminderResult;
        }
        catch(error){
            console.error(error);
        }

    }

    async updateReminder(objectOld, objectNew){

        try{
        var reminderResult = await this.reminderHandler.updateReminder(
            objectOld, 
            objectNew.Materia, 
            objectNew.Titutlo, 
            objectNew.Descripcion, 
            objectNew.Fecha, 
            objectNew.Estado);

        reminderList[reminderList.findIndex(function (element) { return element == objectOld})] = reminderResult;
        }
        catch(error){
            console.error(error);
        }
    }

    async deleteReminder(id){
        
        try{
        
        var QuantityChanged = await this.reminderHandler.deleteReminder();
        reminderList.splice(reminderList.findIndex(function (element){ return element.Id == id}),1);
        return QuantityChanged;

        }
        catch(error){
            console.error(error);
        }

    }
    completedReminder(id){
        let incompleteRem = this.getReminder(id);
        let completeRem = incompleteRem;
        completeRem.Estado = modelEstado.EstadosReminder[1];
        return this.updateReminder(incompleteRem, completeRem);
    }

}
class EstadoService{
    constructor(){
        estadoHandler = new EstadoHandler();

    }
    async getAllEstados(){

        try {
            var estadoResult = await this.EstadoHandler.getAllEstados();
            estadoList = [];
            estadoResult.forEach((objectEstado) => { 
            estadoList.push(new modelEstado.Estado(
                objectEstado["EstadoId"],
                objectEstado["Descripcion"],
                objectEstado["TipoEstado"]
                ));});
                return estadoList;
            
            
        } catch (error) {
            console.error(error);
            
        }
    }

}
class ExportsService{
    processExport(exportType){
        const exportSucess = integrationLayer.ExportsHandler.generateExport(exportType, reminderList, materiaList);

        if (exportSucess["bool"]){
            return exportSucess["path"];
        }
        else console.log("No se pudo realizar la exportación");
    }
}

function FirstStartService(){
    let startupHandler = new StartupHandler();
    startupHandler.startupEval();
    new EstadoService().getAllEstados();
    new MateriaService().getAllMaterias();
    new ReminderService().getAllReminders();

}