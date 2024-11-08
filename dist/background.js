/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

chrome.identity.getProfileUserInfo().
  then((userInfo) => {
    chrome.storage.local.set({
      "userInfo": {
        "userEmail": userInfo.email
      }
    })
  })

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.command === 'open_dictionary_panel') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.sidePanel.open({ tabId: tab.id });
    });
  }
})

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId == 'attach_definition') {
    let queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    try {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => getSelection().toString().trim()
      })
        //set selected text in chrome session storage and open add definition page
        .then(selectionResult => {
          for (const { result } of selectionResult) {
            chrome.storage.local.set({ searchKey: result })
          }
        })
        .then(() => {
          chrome.action.setPopup({ popup: 'add_definition.html' });
          chrome.action.openPopup();
        })
    }
    catch (error) {
      throw new Error("Can't attach definition: ", error);
    }
  }
})

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason !== "install" && details.reason !== "update") return;
  chrome.contextMenus.create({
    title: 'Attach definition',
    contexts: ["selection"],
    id: 'attach_definition',
  })

  // const tabs = await chrome.tabs.query({});
  // try {
  //   for (var i = 0; i < tabs.length; i++) {
  //     if (!tabs[i].url.startsWith("chrome://") && tabs[i].status === "complete") {
  //       chrome.scripting.executeScript({
  //         target: { tabId: tabs[i].id },
  //         files: ["content.js"]
  //       })
  //       chrome.scripting.insertCSS({
  //         target: { tabId: tabs[i].id },
  //         files: ["style.css"]
  //       })
  //     }
  //   }
  // }
  // catch (error) {
  //   throw new Error("Failed to inject scripts upon installation: ", error);
  // }
})


/******/ })()
;