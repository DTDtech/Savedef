const addDefinition = async (key, definition) => {
    const userInfoObject = await chrome.storage.local.get("userInfo");
    if (Object.keys(userInfoObject).length === 0) {
        throw new Error("Unable to get user info from local storage.");
    }
    if (!userInfoObject.userInfo.hasOwnProperty('userEmail')) {
        throw new Error("User info missing from user info object.");
    }
    const userEmail = userInfoObject.userInfo.userEmail;

    chrome.storage.local.get(userEmail)
        .then((result) => {
            //Check if result is empty (userEmail doesn't exist in storage)
            if (Object.keys(result).length === 0) {
                chrome.storage.local.set({
                    [userEmail]: { [key.toLowerCase()]: [definition] }
                })
            }
            //Add a new key into storage, avoid overwriting previous keys
            else if (!result[userEmail].hasOwnProperty(key.toLowerCase())) {
                chrome.storage.local.set({
                    [userEmail]: { ...result[userEmail], [key.toLowerCase()]: [definition] }
                })
            }
            else if (Object.keys(result[userEmail][key.toLowerCase()]).length > 0) {
                chrome.storage.local.set(
                    {
                        [userEmail]: {
                            ...result[userEmail],
                            [key.toLowerCase()]: [...result[userEmail][key.toLowerCase()], definition]
                        }
                    }
                )

                chrome.storage.session.get('definitions_to_show')
                    .then((sessionStorageResult) => {
                        if (Object.keys(sessionStorageResult).length > 0) {
                            if (key.toLowerCase() === Object.keys(sessionStorageResult['definitions_to_show'])[0]) {
                                chrome.storage.session.set(
                                    {
                                        definitions_to_show: {
                                            [key.toLowerCase()]: [...result[userEmail][key.toLowerCase()], definition]
                                        }
                                    }
                                )
                            }
                        }
                    })
            }
        })
}

export default addDefinition;