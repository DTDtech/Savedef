/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***********************!*\
  !*** ./src/signin.js ***!
  \***********************/


const addDefinitionForm = document.getElementById('add_definition_form');
const signInForm = document.getElementById('sign_in');
const signOutForm = document.getElementById('sign_out');

addDefinitionForm.style.display = 'none';
signOutForm.style.display = 'none';

const checkIsLoggedIn = () => {
    chrome.runtime.sendMessage({
        command: 'getUserInfo',
        keys: ['userName', 'userEmail']
    }, (response) => {
        console.log(response);
        if (!response || Object.keys(response).length === 0) {
            console.log(response);
            addDefinitionForm.style.display = 'none';
            signOutForm.style.display = 'none';
            signInForm.style.display = 'block';
        }
        else {
            console.log(response);
            signInForm.style.display = 'none';
            addDefinitionForm.style.display = 'block';
            signOutForm.style.display = 'block';
            // const userEmailField = document.getElementById('user_email');

            // userEmailField.textContent = userData[0].email;
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    checkIsLoggedIn();
})

const sign_in_button = document.getElementById('sign_in_button');

sign_in_button.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        command: 'signin',
    }, (response) => {
        console.log(response);
        checkIsLoggedIn();
    })
})

const sign_out_button = document.getElementById('sign_out_button');

sign_out_button.addEventListener('click', () => {
    chrome.runtime.sendMessage({
        command: 'signout',
    }, (response) => {
        console.log(response);
        checkIsLoggedIn();
    })
})




/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYXZlZGVmLy4vc3JjL3NpZ25pbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBhZGREZWZpbml0aW9uRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfZGVmaW5pdGlvbl9mb3JtJyk7XHJcbmNvbnN0IHNpZ25JbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbl9pbicpO1xyXG5jb25zdCBzaWduT3V0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduX291dCcpO1xyXG5cclxuYWRkRGVmaW5pdGlvbkZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuc2lnbk91dEZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbmNvbnN0IGNoZWNrSXNMb2dnZWRJbiA9ICgpID0+IHtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICBjb21tYW5kOiAnZ2V0VXNlckluZm8nLFxyXG4gICAgICAgIGtleXM6IFsndXNlck5hbWUnLCAndXNlckVtYWlsJ11cclxuICAgIH0sIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IE9iamVjdC5rZXlzKHJlc3BvbnNlKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBhZGREZWZpbml0aW9uRm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBzaWduT3V0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBzaWduSW5Gb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBzaWduSW5Gb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGFkZERlZmluaXRpb25Gb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBzaWduT3V0Rm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgLy8gY29uc3QgdXNlckVtYWlsRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcl9lbWFpbCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXNlckVtYWlsRmllbGQudGV4dENvbnRlbnQgPSB1c2VyRGF0YVswXS5lbWFpbDtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY2hlY2tJc0xvZ2dlZEluKCk7XHJcbn0pXHJcblxyXG5jb25zdCBzaWduX2luX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduX2luX2J1dHRvbicpO1xyXG5cclxuc2lnbl9pbl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgY29tbWFuZDogJ3NpZ25pbicsXHJcbiAgICB9LCAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgY2hlY2tJc0xvZ2dlZEluKCk7XHJcbiAgICB9KVxyXG59KVxyXG5cclxuY29uc3Qgc2lnbl9vdXRfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25fb3V0X2J1dHRvbicpO1xyXG5cclxuc2lnbl9vdXRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNvbW1hbmQ6ICdzaWdub3V0JyxcclxuICAgIH0sIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICBjaGVja0lzTG9nZ2VkSW4oKTtcclxuICAgIH0pXHJcbn0pXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==