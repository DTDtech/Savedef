import createUtilBox from "./createUtilBox";

const createDefinitionBoxes = (key, definitions) => {
    let definitionBoxes = [];

    definitions.forEach((definition, definition_index) => {

        let definitionBox = document.createElement("div");
        let definitionTextBox = document.createElement("p");

        definitionBox.classList.add("definition_box");

        definitionTextBox.classList.add("definition_list_item");
        definitionTextBox.textContent = definition;

        const utilBox = createUtilBox(key, definition, definition_index);
        utilBox.style.display = "none";

        definitionBox.appendChild(definitionTextBox);
        definitionBox.appendChild(utilBox);

        definitionTextBox.onclick = () => {
            if (utilBox.style.display === "none") {
                utilBox.style.display = "flex";
            }
            else {
                utilBox.style.display = "none";
            }
        }

        definitionBoxes.push(definitionBox);
    })

    return definitionBoxes;
}

export default createDefinitionBoxes;