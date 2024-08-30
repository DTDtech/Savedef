"use strict"

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

