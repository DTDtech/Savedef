import addDefinition from "./utils/create_definition";
import getDefinitions from "./utils/get_definitions";

const previous_button = document.getElementById('previous_button');
const success_notification = document.getElementById('success_notification');

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

const save_button = document.getElementById('save_button');

save_button.addEventListener('click', async () => {
    const searchKey = document.getElementById('search_key').value;
    const definition = document.getElementById('definition').value;

    const keyEmptyError = document.getElementById('key_empty_error');
    const definitionEmptyError = document.getElementById('definition_empty_error');

    if (!searchKey.trim() && !definition.trim()) {
        keyEmptyError.style.display = "block";
        definitionEmptyError.style.display = "block";
    }
    else if (!searchKey.trim()) {
        keyEmptyError.style.display = "block";
    }
    else if (!definition.trim()) {
        definitionEmptyError.style.display = "block";
    }
    else {
        keyEmptyError.style.display = "none";
        definitionEmptyError.style.display = "none";

        const definitions = await getDefinitions(searchKey);
        const definitionExisted = (definitions.length === 0) ? false : true;
        
        addDefinition(searchKey, definition);

        success_notification.style.visibility = "visible";

        setTimeout(() => {
            success_notification.style.visibility = "hidden";
        }, 3000)
        
        if (!definitionExisted) {
            let queryOptions = { active: true, currentWindow: true };
            const [tab] = await chrome.tabs.query(queryOptions);
            chrome.tabs.sendMessage(tab.id, {
                command: 'add_highlight',
                key: searchKey
            })
        }
    }
});

