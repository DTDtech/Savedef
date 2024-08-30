/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/


// const script1 = document.createElement("script");
// script1.src = "pdf.min.mjs"
// script1.setAttribute("type", "module")



// pdfjsLib.GlobalWorkerOptions.workerSrc = '../src/pdf.worker.min.mjs'

// <script src="../src/pdf.min.mjs"></script>
//     <script>
        
//     </script>

const add_definition_button = document.getElementById("add_definition_button");

add_definition_button.addEventListener("click", () => {
    // chrome.action.setPopup({ popup: 'add_definition.html' })
    window.location.href = 'add_definition.html';
})

// window.addEventListener("load", () => {
//     chrome.runtime.sendMessage({
//         command: 'get_definitions',
//     }, (response) => {
//         console.log(response);
//     })
// }) 
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsOEJBQThCO0FBQzlEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSLElBQUksRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhdmVkZWYvLi9zcmMvcG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vLyBjb25zdCBzY3JpcHQxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuLy8gc2NyaXB0MS5zcmMgPSBcInBkZi5taW4ubWpzXCJcclxuLy8gc2NyaXB0MS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwibW9kdWxlXCIpXHJcblxyXG5cclxuXHJcbi8vIHBkZmpzTGliLkdsb2JhbFdvcmtlck9wdGlvbnMud29ya2VyU3JjID0gJy4uL3NyYy9wZGYud29ya2VyLm1pbi5tanMnXHJcblxyXG4vLyA8c2NyaXB0IHNyYz1cIi4uL3NyYy9wZGYubWluLm1qc1wiPjwvc2NyaXB0PlxyXG4vLyAgICAgPHNjcmlwdD5cclxuICAgICAgICBcclxuLy8gICAgIDwvc2NyaXB0PlxyXG5cclxuY29uc3QgYWRkX2RlZmluaXRpb25fYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZGVmaW5pdGlvbl9idXR0b25cIik7XHJcblxyXG5hZGRfZGVmaW5pdGlvbl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIC8vIGNocm9tZS5hY3Rpb24uc2V0UG9wdXAoeyBwb3B1cDogJ2FkZF9kZWZpbml0aW9uLmh0bWwnIH0pXHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdhZGRfZGVmaW5pdGlvbi5odG1sJztcclxufSlcclxuXHJcbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbi8vICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbi8vICAgICAgICAgY29tbWFuZDogJ2dldF9kZWZpbml0aW9ucycsXHJcbi8vICAgICB9LCAocmVzcG9uc2UpID0+IHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbi8vICAgICB9KVxyXG4vLyB9KSAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=