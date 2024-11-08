import createDefinitionBoxes from "./utils/sidePanel/createDefinitionBoxes";
import createDeletionBox from "./utils/sidePanel/createDeletionBox";

const viewAllKeysButton = document.getElementById("view_all_keys_button");
const createDefinitionButton = document.getElementById("create_definition_button");
const definitionList = document.getElementById("definition_list");
const key = document.getElementById("key");

viewAllKeysButton.onclick = () => {
    window.location.replace("all_keys_panel.html");
}

const setKeyForDefinitionCreation = (key) => {
    createDefinitionButton.onclick = () => {
        chrome.storage.local.set({ searchKey: key })
            .then(() => {
                chrome.action.setPopup({ popup: 'add_definition.html' });
                chrome.action.openPopup();
            })
    }
}

chrome.storage.session.get('definitions_to_show', ({ definitions_to_show }) => {
    key.innerHTML = Object.keys(definitions_to_show)[0];

    setKeyForDefinitionCreation(Object.keys(definitions_to_show)[0]);

    const definitionBoxes = createDefinitionBoxes(Object.keys(definitions_to_show)[0], Object.values(definitions_to_show)[0]);

    definitionBoxes.forEach(definitionBox => {
        definitionList.appendChild(definitionBox);
    })

    const deletionBox = createDeletionBox(Object.keys(definitions_to_show)[0]);
    definitionList.appendChild(deletionBox);
});

chrome.storage.session.onChanged.addListener((changes) => {
    if (!changes.hasOwnProperty('definition_to_show')) {
        key.innerHTML = Object.keys(changes['definitions_to_show'].newValue)[0];

        setKeyForDefinitionCreation(Object.keys(changes['definitions_to_show'].newValue)[0]);

        const definitionBoxes = createDefinitionBoxes(Object.keys(changes['definitions_to_show'].newValue)[0], Object.values(changes['definitions_to_show'].newValue)[0]);
        const deletionBox = createDeletionBox(Object.keys(changes['definitions_to_show'].newValue)[0]);

        definitionList.replaceChildren(key,...definitionBoxes, deletionBox);
    }
});

