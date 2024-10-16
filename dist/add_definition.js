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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkX2RlZmluaXRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsaUVBQWUsYUFBYTs7Ozs7Ozs7Ozs7Ozs7QUM3QzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGNBQWM7Ozs7OztVQ3hCN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7O0FDTlk7QUFDWjtBQUNBLENBQXNEO0FBQ0Q7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtFQUFjO0FBQzVDO0FBQ0E7QUFDQSxJQUFJLG9FQUFhO0FBQ2pCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2F2ZWRlZi8uL3NyYy91dGlscy9jcmVhdGVfZGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly9zYXZlZGVmLy4vc3JjL3V0aWxzL2dldF9kZWZpbml0aW9ucy5qcyIsIndlYnBhY2s6Ly9zYXZlZGVmL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NhdmVkZWYvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3NhdmVkZWYvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zYXZlZGVmL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2F2ZWRlZi8uL3NyYy9hZGRfZGVmaW5pdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhZGREZWZpbml0aW9uID0gYXN5bmMgKGtleSwgZGVmaW5pdGlvbikgPT4ge1xyXG4gICAgY29uc3QgdXNlckluZm9PYmplY3QgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJ1c2VySW5mb1wiKTtcclxuICAgIGNvbnN0IHVpZCA9IHVzZXJJbmZvT2JqZWN0LnVzZXJJbmZvLnVpZDtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh1aWQpXHJcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAvL0NoZWNrIGlmIHJlc3VsdCBpcyBlbXB0eSAodWlkIGRvZXNuJ3QgZXhpc3QgaW4gc3RvcmFnZSlcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIFt1aWRdOiB7IFtrZXkudG9Mb3dlckNhc2UoKV06IFtkZWZpbml0aW9uXSB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RvcmFnZSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RvcmFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0FkZCBhIG5ldyBrZXkgaW50byBzdG9yYWdlLCBhdm9pZCBvdmVyd3JpdGluZyBwcmV2aW91cyBrZXlzXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdFt1aWRdW2tleV0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIFt1aWRdOiB7IC4uLnJlc3VsdFt1aWRdLCBba2V5LnRvTG93ZXJDYXNlKCldOiBbZGVmaW5pdGlvbl0gfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0b3JhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT2JqZWN0LmtleXMocmVzdWx0W3VpZF1ba2V5XSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0W3VpZF1ba2V5XSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyguLi5yZXN1bHRbdWlkXVtrZXldKTtcclxuICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt1aWRdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5yZXN1bHRbdWlkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtrZXkudG9Mb3dlckNhc2UoKV06IFsuLi5yZXN1bHRbdWlkXVtrZXldLCBkZWZpbml0aW9uXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RvcmFnZSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RvcmFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFkZERlZmluaXRpb247IiwiY29uc3QgZ2V0RGVmaW5pdGlvbnMgPSBhc3luYyAoc2VhcmNoS2V5KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vc2V0IHNlbGVjdGVkIHRleHQgaW4gY2hyb21lIGxvY2FsIHN0b3JhZ2UgYW5kIG9wZW4gYWRkIGRlZmluaXRpb24gcGFnZVxyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwidXNlckluZm9cIik7XHJcbiAgICAgICAgY29uc3QgdWlkID0gdXNlckluZm9bXCJ1c2VySW5mb1wiXS51aWQ7XHJcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh1aWQpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGljdGlvbmFyeVt1aWRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGRpY3Rpb25hcnlbdWlkXVtzZWFyY2hLZXkudG9Mb3dlckNhc2UoKV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGljdGlvbmFyeVt1aWRdKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGljdGlvbmFyeVt1aWRdW3NlYXJjaEtleS50b0xvd2VyQ2FzZSgpXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5W3VpZF1bc2VhcmNoS2V5LnRvTG93ZXJDYXNlKCldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZ2V0IGRlZmluaXRpb246IFwiICsgZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldERlZmluaXRpb25zOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbmltcG9ydCBhZGREZWZpbml0aW9uIGZyb20gXCIuL3V0aWxzL2NyZWF0ZV9kZWZpbml0aW9uXCI7XHJcbmltcG9ydCBnZXREZWZpbml0aW9ucyBmcm9tIFwiLi91dGlscy9nZXRfZGVmaW5pdGlvbnNcIjtcclxuXHJcbmNvbnN0IHByZXZpb3VzX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aW91c19idXR0b24nKTtcclxuXHJcbnByZXZpb3VzX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ3BvcHVwLmh0bWwnO1xyXG59KVxyXG5cclxuLy9nZXQga2V5IHZhbHVlIGZyb20gY2hyb21lIHNlc3Npb24gc3RvcmFnZSBcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2VhcmNoS2V5RmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoX2tleScpO1xyXG4gICAgY29uc3Qgc2VhcmNoS2V5V2l0aFZhbHVlID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFwic2VhcmNoS2V5XCIpO1xyXG4gICAgaWYgKHNlYXJjaEtleVdpdGhWYWx1ZS5zZWFyY2hLZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHNlYXJjaEtleUZpZWxkLnZhbHVlID0gc2VhcmNoS2V5V2l0aFZhbHVlLnNlYXJjaEtleTtcclxuICAgIH1cclxufSlcclxuXHJcbmNvbnN0IGFkZF9kZWZpbml0aW9uX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRfZGVmaW5pdGlvbl9idXR0b24nKTtcclxuXHJcbmFkZF9kZWZpbml0aW9uX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHNlYXJjaEtleSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hfa2V5JykudmFsdWU7XHJcbiAgICBjb25zdCBkZWZpbml0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlZmluaXRpb24nKS52YWx1ZTtcclxuICAgIFxyXG4gICAgY29uc3QgZGVmaW5pdGlvbnMgPSBhd2FpdCBnZXREZWZpbml0aW9ucyhzZWFyY2hLZXkpO1xyXG4gICAgY29uc3QgZGVmaW5pdGlvbkV4aXN0ZWQgPSAoZGVmaW5pdGlvbnMubGVuZ3RoID09PSAwKSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIFxyXG4gICAgYWRkRGVmaW5pdGlvbihzZWFyY2hLZXksIGRlZmluaXRpb24pO1xyXG4gICAgXHJcbiAgICBpZiAoIWRlZmluaXRpb25FeGlzdGVkKSB7XHJcbiAgICAgICAgbGV0IHF1ZXJ5T3B0aW9ucyA9IHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH07XHJcbiAgICAgICAgY29uc3QgW3RhYl0gPSBhd2FpdCBjaHJvbWUudGFicy5xdWVyeShxdWVyeU9wdGlvbnMpO1xyXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwge1xyXG4gICAgICAgICAgICBjb21tYW5kOiAnYWRkX2hpZ2hsaWdodCcsXHJcbiAgICAgICAgICAgIGtleTogc2VhcmNoS2V5XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==