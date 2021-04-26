const { Materia } = require('../Models/Materia.js');
let integration = require('./integrationLayer.js');

var mHandler = new integration.MateriaHandler();
var rHandler = new integration.ReminderHandler();

var result = rHandler.getAllReminders();
var x;
result.then((row) => (x = row), null);
console.log(x);

//var result2 = rHandler.getReminderById(1);
//result2.then((row) => (console.log(row)), null);

//var process1 = rHandler.createReminder(1, "Trabajo de Investigacion", "Hacer trabajo", "2000/12/25", 2);
//console.log(process1.id);

//mHandler.createMateria("Arquitectura de Software", 4, "FF0000");