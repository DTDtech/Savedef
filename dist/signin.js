/******/ (() => { // webpackBootstrap
/*!***********************!*\
  !*** ./src/signin.js ***!
  \***********************/
const addDefinitionForm = document.getElementById('add_definition_form');
const userProfile = document.getElementById('user_profile');

try {
    chrome.identity.getProfileUserInfo().
        then((userInfo) => {
            const userEmailField = document.getElementById('user_email');
            userEmailField.textContent = userInfo.email;
        })
}
catch (e) {
    throw new Error("Unable to retrieve user info: " + e);
}



/******/ })()
;