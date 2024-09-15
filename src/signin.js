'use strict';

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



