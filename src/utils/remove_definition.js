const userInfoObject = await chrome.storage.local.get("userInfo");
if (Object.keys(userInfoObject).length === 0) {
    throw new Error("Unable to get user info from local storage.");
}
if (!userInfoObject.userInfo.hasOwnProperty('userEmail')) {
    throw new Error("User info missing from user info object.");
}
const userEmail = userInfoObject.userInfo.userEmail;

const removeDefinition = async (key, definition_index) => {
    chrome.storage.local.get(userEmail)
        .then((result) => {
            const definitions = result[userEmail][key.toLowerCase()];
            definitions.splice(definition_index, 1);

            chrome.storage.local.set(
                {
                    [userEmail]: {
                        ...result[userEmail],
                        [key.toLowerCase()]: definitions
                    }
                }
            )
        })

    chrome.storage.session.get('definitions_to_show', ({ definitions_to_show }) => {
        if (key.toLowerCase() === Object.keys(definitions_to_show)[0]) {
            chrome.storage.local.get(userEmail)
                .then((result) => {
                    chrome.storage.session.set(
                        {
                            definitions_to_show: {
                                [key.toLowerCase()]: result[userEmail][key.toLowerCase()]
                            }
                        }
                    )
                })
        }
    })
}

const removeAllDefinitions = async (key) => {
    chrome.storage.local.get(userEmail)
        .then((result) => {
            const definitions = result[userEmail];
            delete definitions[key.toLowerCase()];

            chrome.storage.local.set(
                {
                    [userEmail]: definitions
                }
            )
        })
}

export { removeDefinition, removeAllDefinitions };