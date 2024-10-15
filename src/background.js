import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import signUserIn from "./utils/sign_in";
import signUserOut from "./utils/sign_out";
import dbConfig from "./utils/db_config";

const firebaseConfig = dbConfig;

initializeApp(firebaseConfig);

const auth = getAuth();

chrome.runtime.onStartup.addListener(async () => {

  const accessTokenExpiryTimeObject = await chrome.storage.local.get('access_token_expiry_time');

  const accessTokenExpiryTime = accessTokenExpiryTimeObject.access_token_expiry_time; 

  if (accessTokenExpiryTime >= Date.now()) {

    const isInteractive = false;

    signUserIn(isInteractive);

  }
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    chrome.storage.local.set({
      "userInfo": {
        "userName": user.providerData[0].displayName,
        "userEmail": user.providerData[0].email,
        "uid": user.uid
      }
    })

    chrome.contextMenus.update(
      'attach_definition',
      {
        enabled: true
      }
    )
  }

  else {
    chrome.contextMenus.update(
      'attach_definition',
      {
        enabled: false
      })
  }
})


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'signin') {
    
    const isInteractive = true;

    signUserIn(auth, isInteractive)
      .then(() => {
        sendResponse({ message: "Successfully signed in" });
      })
    return true;
  }
  else if (request.command === 'signout') {
    signUserOut(auth)
      .then(() => {
        sendResponse({ message: "Successfully signed out" });
      })
    return true;
  }
})

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId == 'attach_definition') {
    let queryOptions = { active: true, currentWindow: true };
    // await chrome.tabs.query(queryOptions, ([tab]) => {
    //   chrome.sidePanel.open({ tabId: tab.id });
    // });
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
      console.log("Can't attach definition: ", error);
    }
  }
})

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason !== "install" && details.reason !== "update") return;
  chrome.contextMenus.create({
    title: 'Attach definition',
    contexts: ["selection"],
    id: 'attach_definition',
    enabled: false,
  })
})

