"use strict";

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