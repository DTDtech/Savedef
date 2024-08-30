/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***********************!*\
  !*** ./src/signin.js ***!
  \***********************/


const definitionList = document.getElementById("definition_list");
const loginForm = document.getElementById("login");

const checkIsLoggedIn = async() => {
     
    const userdata= await chrome.storage.local.get("userdata");
        if (!userdata) {
            definitionList.style.display = "none";
            loginForm.classList.remove('display');
        }
        else {
            loginForm.style.display = "none";
            definitionList.classList.remove('display');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYXZlZGVmLy4vc3JjL3NpZ25pbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmNvbnN0IGRlZmluaXRpb25MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZpbml0aW9uX2xpc3RcIik7XHJcbmNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5cIik7XHJcblxyXG5jb25zdCBjaGVja0lzTG9nZ2VkSW4gPSBhc3luYygpID0+IHtcclxuICAgICBcclxuICAgIGNvbnN0IHVzZXJkYXRhPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ1c2VyZGF0YVwiKTtcclxuICAgICAgICBpZiAoIXVzZXJkYXRhKSB7XHJcbiAgICAgICAgICAgIGRlZmluaXRpb25MaXN0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgbG9naW5Gb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxvZ2luRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGRlZmluaXRpb25MaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXknKTtcclxuICAgICAgICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNoZWNrSXNMb2dnZWRJbigpO1xyXG59KVxyXG5cclxuY29uc3Qgc2lnbmluX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduaW5fYnV0dG9uJyk7XHJcblxyXG5zaWduaW5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICBjb21tYW5kOiAnc2lnbmluJyxcclxuICAgIH0sIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgIH0pXHJcbiAgICBjaGVja0lzTG9nZ2VkSW4oKTtcclxufSlcclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==