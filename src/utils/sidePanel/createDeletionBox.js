import { removeAllDefinitions } from "../remove_definition";

const createDeletionBox = (key) => {
    let deletionBox = document.createElement("button");

    deletionBox.setAttribute("id", "deletion_box");
    deletionBox.innerHTML = 'DELETE KEY AND DEFINITIONS';

    deletionBox.onclick = async () => {
        removeAllDefinitions(key);

        window.close();

        let queryOptions = { active: true, currentWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        chrome.tabs.sendMessage(tab.id, {
            command: 'remove_highlight',
            key: key
        })
    }

    return deletionBox;
}

export default createDeletionBox;