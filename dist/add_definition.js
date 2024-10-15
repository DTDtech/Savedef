/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/create_definition.js":
/*!****************************************!*\
  !*** ./src/utils/create_definition.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addDefinition);

/***/ }),

/***/ "./src/utils/get_definitions.js":
/*!**************************************!*\
  !*** ./src/utils/get_definitions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getDefinitions = async (searchKey) => {
    try {
        //set selected text in chrome local storage and open add definition page
        const userInfo = await chrome.storage.local.get("userInfo");
        const uid = userInfo["userInfo"].uid;
        const dictionary = await chrome.storage.local.get(uid);
        if (typeof dictionary[uid] === "undefined") {
            return [];
        }
        else if (typeof dictionary[uid][searchKey.toLowerCase()] === "undefined") {
            return [];
        }
        else {
            console.log(dictionary[uid]);
            console.log(dictionary[uid][searchKey.toLowerCase()]);
            return dictionary[uid][searchKey.toLowerCase()];
        }
        
    }
    catch (e) {
        throw new Error("Can't get definition: " + e);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDefinitions);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/add_definition.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_create_definition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/create_definition */ "./src/utils/create_definition.js");
/* harmony import */ var _utils_get_definitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/get_definitions */ "./src/utils/get_definitions.js");


;


const previous_button = document.getElementById('previous_button');

previous_button.addEventListener('click', () => {
    window.location.href = 'popup.html';
})

//get key value from chrome session storage 
document.addEventListener("DOMContentLoaded", async () => {
    const searchKeyField = document.getElementById('search_key');
    const searchKeyWithValue = await chrome.storage.local.get("searchKey");
    if (searchKeyWithValue.searchKey !== undefined) {
        searchKeyField.value = searchKeyWithValue.searchKey;
    }
})

const add_definition_button = document.getElementById('add_definition_button');

add_definition_button.addEventListener('click', async () => {
    const searchKey = document.getElementById('search_key').value;
    const definition = document.getElementById('definition').value;
    
    const definitions = await (0,_utils_get_definitions__WEBPACK_IMPORTED_MODULE_1__["default"])(searchKey);
    const definitionExisted = (definitions.length === 0) ? false : true;
    
    (0,_utils_create_definition__WEBPACK_IMPORTED_MODULE_0__["default"])(searchKey, definition);
    
    if (!definitionExisted) {
        let queryOptions = { active: true, currentWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        chrome.tabs.sendMessage(tab.id, {
            command: 'add_highlight',
            key: searchKey
        })
    }
});


/******/ })()
;