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
    }, (userDetails) => {
        console.log(userDetails);
        if (!userDetails || Object.keys(userDetails).length === 0) {
            addDefinitionForm.style.display = 'none';
            signOutForm.style.display = 'none';
            signInForm.style.display = 'block';
        }
        else {
            console.log(userDetails);
            signInForm.style.display = 'none';
            addDefinitionForm.style.display = 'block';
            signOutForm.style.display = 'block';

            const userEmailField = document.getElementById('user_email');
            const userNameField = document.getElementById('user_name');

            userEmailField.textContent = userDetails.userEmail;
            userNameField.textContent = userDetails.userName;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2F2ZWRlZi8uL3NyYy9zaWduaW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgYWRkRGVmaW5pdGlvbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX2RlZmluaXRpb25fZm9ybScpO1xyXG5jb25zdCBzaWduSW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25faW4nKTtcclxuY29uc3Qgc2lnbk91dEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbl9vdXQnKTtcclxuXHJcbmFkZERlZmluaXRpb25Gb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbnNpZ25PdXRGb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5jb25zdCBjaGVja0lzTG9nZ2VkSW4gPSAoKSA9PiB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgY29tbWFuZDogJ2dldFVzZXJJbmZvJyxcclxuICAgICAgICBrZXlzOiBbJ3VzZXJOYW1lJywgJ3VzZXJFbWFpbCddXHJcbiAgICB9LCAodXNlckRldGFpbHMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyh1c2VyRGV0YWlscyk7XHJcbiAgICAgICAgaWYgKCF1c2VyRGV0YWlscyB8fCBPYmplY3Qua2V5cyh1c2VyRGV0YWlscykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGFkZERlZmluaXRpb25Gb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHNpZ25PdXRGb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHNpZ25JbkZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyRGV0YWlscyk7XHJcbiAgICAgICAgICAgIHNpZ25JbkZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYWRkRGVmaW5pdGlvbkZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIHNpZ25PdXRGb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlckVtYWlsRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcl9lbWFpbCcpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyTmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJfbmFtZScpO1xyXG5cclxuICAgICAgICAgICAgdXNlckVtYWlsRmllbGQudGV4dENvbnRlbnQgPSB1c2VyRGV0YWlscy51c2VyRW1haWw7XHJcbiAgICAgICAgICAgIHVzZXJOYW1lRmllbGQudGV4dENvbnRlbnQgPSB1c2VyRGV0YWlscy51c2VyTmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY2hlY2tJc0xvZ2dlZEluKCk7XHJcbn0pXHJcblxyXG5jb25zdCBzaWduX2luX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduX2luX2J1dHRvbicpO1xyXG5cclxuc2lnbl9pbl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgY29tbWFuZDogJ3NpZ25pbicsXHJcbiAgICB9LCAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgY2hlY2tJc0xvZ2dlZEluKCk7XHJcbiAgICB9KVxyXG59KVxyXG5cclxuY29uc3Qgc2lnbl9vdXRfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25fb3V0X2J1dHRvbicpO1xyXG5cclxuc2lnbl9vdXRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNvbW1hbmQ6ICdzaWdub3V0JyxcclxuICAgIH0sIChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICBjaGVja0lzTG9nZ2VkSW4oKTtcclxuICAgIH0pXHJcbn0pXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==