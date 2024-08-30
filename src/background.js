import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { collection, doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";

try {
  const firebaseConfig = {
    apiKey: "AIzaSyASj3oiyk2htYYFzjI6CuAaFkDRps2OgE0",
    authDomain: "savedef-70734.firebaseapp.com",
    projectId: "savedef-70734",
    storageBucket: "savedef-70734.appspot.com",
    messagingSenderId: "238601540911",
    appId: "1:238601540911:web:77dcea7230638c49debdda",
    measurementId: "G-6PC875M72C"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Signed in");
    }
    else {
      console.log("Signed out");
    }
  });

  //listen for message from this extension to post data
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'post') {
      const addDefinition = (async () => {
        const key = request.key.toLowerCase();
        const def = request.def;

        const docRef = doc(db, 'users', auth.currentUser.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && (docSnap.data().key !== null)) {
          await updateDoc(docRef, {
            [key]: arrayUnion(def)
          })
            .then(() => {
              sendResponse({ messsage: 'added definition' })
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
        else {
          await setDoc(docRef, {
            [key]: arrayUnion(def)
          })
            .then(() => {
              sendResponse({ messsage: 'added definition' })
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
      })
      addDefinition();
      return true;
    }
    else if (request.command === 'signin') {
      if (auth.currentUser !== undefined) {
        try {
          chrome.storage.local.set({ userdata: auth.currentUser.providerData })
        }
        catch (e) {
          console.log(e);
          sendResponse({ message: "Can't fetch user data from local storage" });
        }
      }
      else {
        chrome.identity.getAuthToken({ 'interactive': true }, ((token) => {
          let credential = GoogleAuthProvider.credential(null, token);
          signInWithCredential(auth, credential)
            .then(res => {
              console.log(res)
            })
            .then(() => {
              chrome.storage.local.set({ userdata: auth.currentUser.providerData })
            })
            .catch(err => {
              console.log(err);
              sendResponse({ message: "Trouble signing in" });
            });
        }));
      }
      sendResponse({ message: "Successfully signed in" });
      return true;
    }
    else if (request.command === 'get_keys') {
      const getKey = (async () => {
        if (auth.currentUser !== null) {
          const docRef = doc(db, 'users', auth.currentUser.uid);
          await getDoc(docRef).then((result) => {
            if (result.exists) {
              sendResponse(Object.keys(result.data()));
            } else {
              console.log("Can't sign in");
            }
          })
        }
      })
      getKey();
      return true;
    }
  })

  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === 'get_definition') {
      let queryOptions = { active: true, currentWindow: true };
      const [tab] = await chrome.tabs.query(queryOptions);
      try {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => getSelection().toString().trim()
        })
          //set selected text in chrome local storage and open add definition page
          .then(async (selectionResultArr) => {
            const keyterm = selectionResultArr[0].result;
            const docRef = doc(db, 'users', auth.currentUser.uid);

            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              // console.log(Object.keys(result.data()).toLowerCase().keyterm.toLowerCase());
              const lowerCaseKeyResult = Object.fromEntries(
                Object.entries(docSnap.data()).map(([k, v]) => [k.toLowerCase(), v])
              );
              const lowerCaseKeyterm = keyterm.toLowerCase();
              const definitions = lowerCaseKeyResult[lowerCaseKeyterm];
              if (definitions !== undefined) {
                chrome.tabs.sendMessage(tab.id, {
                  command: 'show_definitions',
                  defs: definitions
                }, (response) => {
                  console.log(response);
                })
              }
              else {
                console.log("No definition exist");
              }
            }
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

}
catch (e) {
  console.log(e);
}




