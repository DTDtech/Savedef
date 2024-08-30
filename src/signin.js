"use strict";

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




