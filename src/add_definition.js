"use strict"

import addDefinition from "./utils/create_definition";
import getDefinitions from "./utils/get_definitions";

const previous_button = document.getElementById('previous_button');

previous_button.addEventListener('click', () => {
    window.location.href = 'popup.html';
})

//get key value from chrome session storage 
document.addEventListener("DOMContentLoaded", async () => {
    const searchKeyField = document.getElementById('search_key');
    const searchKeyWithValue = await chrome.storage.local.get("searchKey");
    if (searchKeyWithValue.searchKey !== undefined) {
        searchKeyField.value = searchKeyWithValue.searchKey;
    }
})

const add_definition_button = document.getElementById('add_definition_button');

add_definition_button.addEventListener('click', async () => {
    const searchKey = document.getElementById('search_key').value;
    const definition = document.getElementById('definition').value;
    
    const definitions = await getDefinitions(searchKey);
    const definitionExisted = (definitions.length === 0) ? false : true;
    
    addDefinition(searchKey, definition);
    
    if (!definitionExisted) {
        let queryOptions = { active: true, currentWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        chrome.tabs.sendMessage(tab.id, {
            command: 'add_highlight',
            key: searchKey
        })
    }
});
