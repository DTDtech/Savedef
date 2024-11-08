import { removeDefinition } from "../remove_definition";

const createUtilBox = (key, definition, definition_index) => {
    let utilBox = document.createElement("div");
    let copyButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    utilBox.classList.add("util_box");
    copyButton.classList.add("copy_button");
    deleteButton.classList.add("delete_button");

    copyButton.innerHTML = 'COPY';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(definition.replace(/(\n)/g, ' '))
            .then(() => {
                copyButton.innerHTML = 'COPIED';
                setTimeout(() => {
                    copyButton.innerHTML = 'COPY';
                }, 3000)
            })
    }

    deleteButton.innerHTML = 'DELETE';
    deleteButton.onclick = () => {
        removeDefinition(key, definition_index);
    }

    utilBox.appendChild(copyButton);
    utilBox.appendChild(deleteButton);

    return utilBox;
}

export default createUtilBox;