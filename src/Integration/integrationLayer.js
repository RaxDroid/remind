//  Packages

const { ipcMain } = require('electron');
var sqlite3 = require('sqlite3').verbose();

//  Constants and Variables


//  Logic

class databaseHandler {
    
}
const db = new sqlite3.Database('app.db',  (err) => {
    if (err) console.error('Database opening error: ', err);
});


ipcMain.on('asynchronous-message', (event, arg) => {
    const sql = arg;
    database.all(sql, (err, rows) => {
        event.reply('asynchronous-reply', (err && err.message) || rows);
    });
});
