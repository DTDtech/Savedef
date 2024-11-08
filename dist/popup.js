/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
const add_definition_button = document.getElementById("add_definition_button");

add_definition_button.addEventListener("click", () => {
    // chrome.action.setPopup({ popup: 'add_definition.html' })
    window.location.href = 'add_definition.html';
})


/******/ })()
;