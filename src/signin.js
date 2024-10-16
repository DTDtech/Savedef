'use strict';

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


