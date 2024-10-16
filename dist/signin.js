/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***********************!*\
  !*** ./src/signin.js ***!
  \***********************/


const addDefinitionForm = document.getElementById('add_definition_form');

const userProfile = document.getElementById('user_profile');

addDefinitionForm.style.display = 'none';

const userIsLoggedIn = () => {
    chrome.storage.local.get("userInfo")
        .then((result) => {
            return Object.keys(result).length > 0;
        })
}

const showUserInfo = () => {
    addDefinitionForm.style.display = 'block';

    const userEmailField = document.getElementById('user_email');
    const userNameField = document.getElementById('user_name');

    userEmailField.textContent = result.userInfo.userEmail;
    userNameField.textContent = result.userInfo.userName;
}

document.addEventListener('DOMContentLoaded', () => {
    if (userIsLoggedIn()) {
        showUserInfo();
    }
    else {
        chrome.runtime.sendMessage({
            command: 'signin',
        }, (response) => {
            console.log(response);
            if (userIsLoggedIn()) {
                showUserInfo();
            }
            //todo: else throw error
        })
    }
})



// const sign_out_button = document.getElementById('sign_out_button');

// sign_out_button.addEventListener('click', () => {
//     chrome.runtime.sendMessage({
//         command: 'signout',
//     }, (response) => {
//         console.log(response);
//         checkIsLoggedIn();
//     })
// })



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSLElBQUk7QUFDSjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2F2ZWRlZi8uL3NyYy9zaWduaW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgYWRkRGVmaW5pdGlvbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkX2RlZmluaXRpb25fZm9ybScpO1xyXG5cclxuY29uc3QgdXNlclByb2ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcl9wcm9maWxlJyk7XHJcblxyXG5hZGREZWZpbml0aW9uRm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuY29uc3QgdXNlcklzTG9nZ2VkSW4gPSAoKSA9PiB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ1c2VySW5mb1wiKVxyXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID4gMDtcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5jb25zdCBzaG93VXNlckluZm8gPSAoKSA9PiB7XHJcbiAgICBhZGREZWZpbml0aW9uRm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICBjb25zdCB1c2VyRW1haWxGaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyX2VtYWlsJyk7XHJcbiAgICBjb25zdCB1c2VyTmFtZUZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJfbmFtZScpO1xyXG5cclxuICAgIHVzZXJFbWFpbEZpZWxkLnRleHRDb250ZW50ID0gcmVzdWx0LnVzZXJJbmZvLnVzZXJFbWFpbDtcclxuICAgIHVzZXJOYW1lRmllbGQudGV4dENvbnRlbnQgPSByZXN1bHQudXNlckluZm8udXNlck5hbWU7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBpZiAodXNlcklzTG9nZ2VkSW4oKSkge1xyXG4gICAgICAgIHNob3dVc2VySW5mbygpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICBjb21tYW5kOiAnc2lnbmluJyxcclxuICAgICAgICB9LCAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBpZiAodXNlcklzTG9nZ2VkSW4oKSkge1xyXG4gICAgICAgICAgICAgICAgc2hvd1VzZXJJbmZvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90b2RvOiBlbHNlIHRocm93IGVycm9yXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuXHJcblxyXG5cclxuLy8gY29uc3Qgc2lnbl9vdXRfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25fb3V0X2J1dHRvbicpO1xyXG5cclxuLy8gc2lnbl9vdXRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4vLyAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4vLyAgICAgICAgIGNvbW1hbmQ6ICdzaWdub3V0JyxcclxuLy8gICAgIH0sIChyZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuLy8gICAgICAgICBjaGVja0lzTG9nZ2VkSW4oKTtcclxuLy8gICAgIH0pXHJcbi8vIH0pXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9