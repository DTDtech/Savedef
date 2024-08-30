/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***********************!*\
  !*** ./src/signin.js ***!
  \***********************/


const addDefinitionForm = document.getElementById("add_definition_form");
const loginForm = document.getElementById("login");

const checkIsLoggedIn = async() => {
     
    const userdata= await chrome.storage.local.get("userdata");
        if (!userdata) {
            addDefinitionForm.style.display = "none";
            loginForm.classList.remove('display');
        }
        else {
            loginForm.style.display = "none";
            addDefinitionForm.classList.remove('display');
        }
}

document.addEventListener("DOMContentLoaded", () => {
    checkIsLoggedIn();
})

const signin_button = document.getElementById('signin_button');

signin_button.addEventListener('click', () => { 
    chrome.runtime.sendMessage({
        command: 'signin',
    }, (response) => {
        console.log(response);
    })
    checkIsLoggedIn();
})





/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYXZlZGVmLy4vc3JjL3NpZ25pbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmNvbnN0IGFkZERlZmluaXRpb25Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZGVmaW5pdGlvbl9mb3JtXCIpO1xyXG5jb25zdCBsb2dpbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luXCIpO1xyXG5cclxuY29uc3QgY2hlY2tJc0xvZ2dlZEluID0gYXN5bmMoKSA9PiB7XHJcbiAgICAgXHJcbiAgICBjb25zdCB1c2VyZGF0YT0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwidXNlcmRhdGFcIik7XHJcbiAgICAgICAgaWYgKCF1c2VyZGF0YSkge1xyXG4gICAgICAgICAgICBhZGREZWZpbml0aW9uRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGxvZ2luRm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsb2dpbkZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBhZGREZWZpbml0aW9uRm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Jyk7XHJcbiAgICAgICAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjaGVja0lzTG9nZ2VkSW4oKTtcclxufSlcclxuXHJcbmNvbnN0IHNpZ25pbl9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbmluX2J1dHRvbicpO1xyXG5cclxuc2lnbmluX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgXHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgY29tbWFuZDogJ3NpZ25pbicsXHJcbiAgICB9LCAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICB9KVxyXG4gICAgY2hlY2tJc0xvZ2dlZEluKCk7XHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=