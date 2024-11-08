import getDictionary from "./utils/get_dictionary";

const keyList = document.getElementById("key_list");

const userInfoObject = await chrome.storage.local.get("userInfo");
const userEmail = userInfoObject.userInfo.userEmail;

const dictionary = await getDictionary();

const createKeyBoxes = (keys) => {
    let keyBoxes = [];
    keys.forEach(key => {
        let keyBox = document.createElement("p");
        keyBox.classList.add("key_list_item");
        keyBox.innerHTML = key;
        keyBox.addEventListener("mouseover", () => {
            keyBox.style.cursor = "pointer";
            keyBox.onclick = async () => {
                chrome.storage.session.set(
                    {
                        definitions_to_show: {
                            [key]: dictionary[key]
                        }
                    }
                );
                window.location.replace("dictionary_panel.html");
            }
        })

        keyBox.addEventListener("mouseout", () => {
            keyBox.removeAttribute("style");
        })
        keyBoxes.push(keyBox);
    });

    return keyBoxes;

}


const keyBoxes = createKeyBoxes(Object.keys(dictionary));

keyBoxes.forEach(keyBox => {
    keyList.appendChild(keyBox);
})


chrome.storage.local.onChanged.addListener((changes) => {
    if (!changes.hasOwnProperty(userEmail)) {
        const modifiedDictionary = changes[userEmail].newValue;
        const keyBoxes = createKeyBoxes(Object.keys(modifiedDictionary));
        keyList.replaceChildren(...keyBoxes);
    }
})



