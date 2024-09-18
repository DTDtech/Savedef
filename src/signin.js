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



