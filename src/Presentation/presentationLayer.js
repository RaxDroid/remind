//  Packages
const { app } = require("electron");

//  Constants
const xbutton = document.querySelector('#close-button');

// Logic

xbutton.addEventListener("click", (event) =>{
    event.preventDefault;
    app.quit();
});