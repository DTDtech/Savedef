const removeDefinition = async (key) => {
    chrome.storage.local.remove(key)
}

export default removeDefinition;