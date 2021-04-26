//  Packages
// const { remote } = require("electron");

//  Constants
const xbutton = document.querySelector('#close-button');

// Logic

xbutton.addEventListener("click", (event) =>{
    event.preventDefault;
    var window = remote.getCurrentWindow();
    window.close();
}); 