import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from "firebase/auth";

import signUserIn from "./utils/sign_in";
import signUserOut from "./utils/sign_out";
import addDefinition from "./utils/create_definition";
import getDictionary from "./utils/get_dictionary";
import getDefinitions from "./utils/get_definitions";
import dbConfig from "./utils/db_config";

try {

  const firebaseConfig = dbConfig;

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      chrome.storage.local.set({
        "userName": user.providerData[0].displayName,
        "userEmail": user.providerData[0].email
      })
      const userId = user.uid;

      chrome.scripting.registerContentScripts([{
        id: "highlight-content-script",
        js: ["content.js"],
        css: ["style.css"],
        matches: ["*://*/*"],
        runAt: "document_end",
      }])

      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        //listen for message from this extension to post data
        if (request.command === 'post') {
          const key = request.key.toLowerCase();
          const definition = request.def;
          addDefinition(db, key, definition, userId)
            .then(() => {
              sendResponse({ messsage: 'added definition' })
            })
          return true;
        }
        else if (request.command === 'get_keys') {
          getDictionary(db, userId)
            .then((result) => {
              if (result.exists) {
                sendResponse(Object.keys(result.data()));
              } else {
                sendResponse({});
              }
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
        if (info.menuItemId === 'get_definition') {
          getDefinitions(db, userId)
            .then(async (definitions) => {
              if (definitions !== undefined) {
                let queryOptions = { active: true, currentWindow: true };
                const [tab] = await chrome.tabs.query(queryOptions);
                chrome.tabs.sendMessage(tab.id, {
                  command: 'show_definitions',
                  defs: definitions
                })
              }
              else {
                console.log("No definition exist");
              }
            })
        }
      })

      chrome.contextMenus.update(
        "get_definition",
        {
          enabled: true
        }
      )
      chrome.contextMenus.update(
        "savedef",
        {
          enabled: true
        }
      )
      chrome.contextMenus.update(
        'attach_definition_text',
        {
          enabled: true
        }
      )
      chrome.contextMenus.update(
        'attach_definition_image',
        {
          enabled: true
        }
      )

    }
    else {

      chrome.scripting.unregisterContentScripts();

      chrome.contextMenus.update(
        "get_definition",
        {
          enabled: false
        }
      )
      chrome.contextMenus.update(
        "savedef",
        {
          enabled: false
        }
      )
      chrome.contextMenus.update(
        'attach_definition_text',
        {
          enabled: false
        }
      )
      chrome.contextMenus.update(
        'attach_definition_image',
        {
          enabled: false
        }
      )

      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.command === 'signin') {
          signUserIn(auth)
            .then(() => {
              sendResponse({ message: "Successfully signed in" });
            })
          return true;
        }
      })

    }
  });


  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'getUserInfo') {
      chrome.storage.local.get(request.keys)
        .then((result) => {
          sendResponse(result);
        })
        .catch((error) => {
          console.log(error);
          sendResponse({ message: "Trouble getting user info" });
        });
      return true;
    }
  })

  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId == 'attach_definition_text' || info.menuItemId == 'attach_definition_image') {
      let queryOptions = { active: true, currentWindow: true };
      const [tab] = await chrome.tabs.query(queryOptions);
      try {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => getSelection().toString().trim()
        })
          //set selected text in chrome local storage and open add definition page
          .then(selectionResult => {
            for (const { result } of selectionResult) {
              chrome.storage.local.set({ keyterm: result })
            }
          })
          .then(() => {
            chrome.action.setPopup({ popup: 'add_definition.html' })
            chrome.action.openPopup();
          })
      }
      catch (e) {
        console.log(e);
      }
    }
  })

  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      title: "Get definition",
      contexts: ["selection"],
      id: "get_definition"
    })
    chrome.contextMenus.create({
      title: "savedef",
      contexts: ["selection"],
      id: "savedef"
    })
    chrome.contextMenus.create({
      title: 'Attach definition',
      contexts: ["selection"],
      parentId: "savedef",
      id: 'attach_definition_text'
    })
    chrome.contextMenus.create({
      title: 'Attach image',
      contexts: ["selection"],
      parentId: "savedef",
      id: 'attach_definition_image'
    })
  })

}
catch (e) {
  throw new Error(e);
}