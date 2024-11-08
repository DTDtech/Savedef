const getDictionary = async () => {
    const userInfoObject = await chrome.storage.local.get("userInfo");
    if (Object.keys(userInfoObject).length === 0) {
        throw new Error("Unable to get user info from local storage.");
    }
    if (!userInfoObject.userInfo.hasOwnProperty('userEmail')) {
        throw new Error("User info missing from user info object.");
    }
    const userEmail = userInfoObject.userInfo.userEmail;
    const userEmailObject = await chrome.storage.local.get(userEmail);
    if (Object.keys(userEmailObject).length === 0) {
        return [];
    }
    const dictionary = userEmailObject[userEmail];

    return dictionary;
}

export default getDictionary;