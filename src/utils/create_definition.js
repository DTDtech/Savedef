const addDefinition = async (key, definition) => {
    const userInfoObject = await chrome.storage.local.get("userInfo");
    const uid = userInfoObject.userInfo.uid;
    chrome.storage.local.get(uid)
        .then((result) => {
            console.log(result);
            //Check if result is empty (uid doesn't exist in storage)
            if (Object.keys(result).length === 0) {
                chrome.storage.local.set({
                    [uid]: { [key.toLowerCase()]: [definition] }
                })
                    .then(async () => {
                        const storage = await chrome.storage.local.get(null);
                        console.log(storage);
                    })
            }
            //Add a new key into storage, avoid overwriting previous keys
            else if (result[uid][key] == undefined) {
                chrome.storage.local.set({
                    [uid]: { ...result[uid], [key.toLowerCase()]: [definition] }
                })
                    .then(async () => {
                        const storage = await chrome.storage.local.get(null);
                        console.log(storage);
                    })
            }
            else if (Object.keys(result[uid][key]).length > 0) {
                console.log(result[uid][key]);
                console.log(...result[uid][key]);
                chrome.storage.local.set(
                    {
                        [uid]: {
                            ...result[uid],
                            [key.toLowerCase()]: [...result[uid][key], definition]
                        }
                    }
                )
                    .then(async () => {
                        const storage = await chrome.storage.local.get(null);
                        console.log(storage);
                    })
            }
        })
}

export default addDefinition;