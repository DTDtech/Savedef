/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!***********************!*\
  !*** ./src/signin.js ***!
  \***********************/


const addDefinitionForm = document.getElementById('add_definition_form');
const signInForm = document.getElementById('sign_in');
const signOutForm = document.getElementById('sign_out');

const userProfile = document.getElementById('user_profile');

addDefinitionForm.style.display = 'none';
signOutForm.style.display = 'none';

const checkIsLoggedIn = () => {
    chrome.storage.local.get("userInfo")
        .then((result) => {
            console.log(result);
            if (!result || Object.keys(result).length === 0) {
                addDefinitionForm.style.display = 'none';
                signOutForm.style.display = 'none';
                userProfile.style.display = 'none';
                signInForm.style.display = 'block';
            }
            else {
                console.log(result);
                signInForm.style.display = 'none';
                addDefinitionForm.style.display = 'block';
                signOutForm.style.display = 'block';
                userProfile.style.display = 'block';

                const userEmailField = document.getElementById('user_email');
                const userNameField = document.getElementById('user_name');

                userEmailField.textContent = result.userInfo.userEmail;
                userNameField.textContent = result.userInfo.userName;
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