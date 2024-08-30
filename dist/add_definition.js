/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************************!*\
  !*** ./src/add_definition.js ***!
  \*******************************/


const previous_button = document.getElementById('previous_button');

previous_button.addEventListener('click', () => {
    window.location.href = 'popup.html';
})

//get key value from chrome local storage 
document.addEventListener("DOMContentLoaded", async () => {
    const keyterm_field = document.getElementById('keyterm');
    const keytermWithValue = await chrome.storage.local.get("keyterm");
    if (keytermWithValue.keyterm !== undefined) {
            keyterm_field.value = keytermWithValue.keyterm;
    }
})

const add_definition_button = document.getElementById('add_definition_button');

add_definition_button.addEventListener('click', () => {
    const keyterm = document.getElementById('keyterm').value;
    const definition = document.getElementById('definition').value;
    //send message to this extension to post data
    chrome.runtime.sendMessage({
        command: 'post',
        key: keyterm,
        def: definition
    }, (response) => {
        console.log(response);
        chrome.tabs.reload();
    })
});


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkX2RlZmluaXRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2F2ZWRlZi8uL3NyYy9hZGRfZGVmaW5pdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIlxyXG5cclxuY29uc3QgcHJldmlvdXNfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpb3VzX2J1dHRvbicpO1xyXG5cclxucHJldmlvdXNfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAncG9wdXAuaHRtbCc7XHJcbn0pXHJcblxyXG4vL2dldCBrZXkgdmFsdWUgZnJvbSBjaHJvbWUgbG9jYWwgc3RvcmFnZSBcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5dGVybV9maWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXl0ZXJtJyk7XHJcbiAgICBjb25zdCBrZXl0ZXJtV2l0aFZhbHVlID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwia2V5dGVybVwiKTtcclxuICAgIGlmIChrZXl0ZXJtV2l0aFZhbHVlLmtleXRlcm0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBrZXl0ZXJtX2ZpZWxkLnZhbHVlID0ga2V5dGVybVdpdGhWYWx1ZS5rZXl0ZXJtO1xyXG4gICAgfVxyXG59KVxyXG5cclxuY29uc3QgYWRkX2RlZmluaXRpb25fYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZF9kZWZpbml0aW9uX2J1dHRvbicpO1xyXG5cclxuYWRkX2RlZmluaXRpb25fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgY29uc3Qga2V5dGVybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXl0ZXJtJykudmFsdWU7XHJcbiAgICBjb25zdCBkZWZpbml0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlZmluaXRpb24nKS52YWx1ZTtcclxuICAgIC8vc2VuZCBtZXNzYWdlIHRvIHRoaXMgZXh0ZW5zaW9uIHRvIHBvc3QgZGF0YVxyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNvbW1hbmQ6ICdwb3N0JyxcclxuICAgICAgICBrZXk6IGtleXRlcm0sXHJcbiAgICAgICAgZGVmOiBkZWZpbml0aW9uXHJcbiAgICB9LCAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucmVsb2FkKCk7XHJcbiAgICB9KVxyXG59KTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==