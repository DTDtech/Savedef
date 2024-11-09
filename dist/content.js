/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_get_definitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/get_definitions */ "./src/utils/get_definitions.js");
/* harmony import */ var _utils_get_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/get_keys */ "./src/utils/get_keys.js");



const textNodesUnder = (el) => {
  const children = []
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, (node) => node.parentNode.nodeName !== 'SCRIPT' && node.parentNode.nodeName !== 'STYLE')
  while (walker.nextNode()) {
    children.push(walker.currentNode)
  }
  return children;
}

function escapeSpecialCharacters(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim();
}

const unhighlightKeyword = (key) => {
  var nodeList = document.querySelectorAll(".highlighted_savedef");

  nodeList = Array.from(nodeList);
  nodeList = nodeList.filter((node) => node.textContent.toLowerCase() === key.toLowerCase())

  // const elementNodeList = 
  nodeList.forEach((node) => {
    node.parentElement.replaceChild(node.childNodes[0], node);
  })
}

const highlightContent = (keywords) => {

  const allTextNodes = textNodesUnder(document.body);

  keywords.forEach(keyword => {
    const escapedKeyword = escapeSpecialCharacters(keyword);
    const matchingWordRegex = new RegExp(`(^|\\s|\\W)(${escapedKeyword})($|\\s|\\W)`, 'i');

    var matchingTextNodes = allTextNodes.filter(textNode => textNode.textContent
      .toLowerCase()
      //todo: check all matching elements, suspection: all elements are returned because match always return value
      .match(matchingWordRegex));

    for (var i = 0; i < matchingTextNodes.length; i++) {
      var offsetAfterSplit = 0;

      console.log(matchingTextNodes[i].textContent);

      matchingTextNodes[i].textContent.replace(
        new RegExp(`(^|\\s|\\W)(${escapedKeyword})($|\\s|\\W)`, 'gi'),
        function (matched_string, p1, p2) {
          //matched string, offset and the examined string is automatically passed to arguments
          var args = [].slice.call(arguments),
            /*Add 1 to offset if the offset found contains white space or non-word. Use p2 instead of escapedKeyword to check for 
            offset because escapedKeyword may contain escaped special characters.*/
            offset = matched_string.startsWith(p2) ? args[args.length - 2] : args[args.length - 2] + 1,
            //the current processing text block is now the text before split, nextTextNode is now the text after split.
            newTextNode = matchingTextNodes[i].splitText(offset + offsetAfterSplit);
          
          //the offset values are calculated only once and stored in the args argument, need to 
          //subtract from them after splitting text. 
          offsetAfterSplit -= matchingTextNodes[i].textContent.length + p2.length;

          newTextNode.textContent = newTextNode.textContent.substring(p2.length);

          /*if there's no match in the text after split, push that text block list of all text nodes,
          else set the current processing text block as the text after split*/
          if (matchingWordRegex.test(newTextNode) === false) {
            allTextNodes.push(newTextNode);
          }
          /*there is no need to push the current object inside allTextNodes, because the filter method
          returns by reference, so any changes made to the text node inside matchingTextNodes is applied 
          to the original text node in allTextNodes.*/

          //wrap the matching keyword with interactive element
          const wrapper = document.createElement('span');
          wrapper.textContent = p2;
          wrapper.classList.add('highlighted_savedef');

          wrapper.onclick = async () => {
            if (chrome.runtime.id !== undefined) {
              const definitions = await (0,_utils_get_definitions__WEBPACK_IMPORTED_MODULE_0__["default"])(p2);
              chrome.storage.session.set(
                {
                  definitions_to_show: {
                    [p2.toLowerCase()]: definitions
                  }
                }
              );

              chrome.runtime.sendMessage({
                command: 'open_dictionary_panel',
              })
            };
          }

          matchingTextNodes[i].parentNode.insertBefore(wrapper, newTextNode);

          matchingTextNodes[i] = newTextNode;
        }
      )
    }
  })
}

const userInfo = await chrome.storage.local.get("userInfo");

if (Object.keys(userInfo).length > 0) {
  const keys = await (0,_utils_get_keys__WEBPACK_IMPORTED_MODULE_1__["default"])();
  if (keys.length > 0) {
    highlightContent(keys);
  }
}

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.command === "add_highlight") {
    highlightContent([request.key]);
  }
  else if (request.command === "remove_highlight") {
    unhighlightKeyword(request.key);
  }
})





__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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
        const userEmail = userInfo["userInfo"].userEmail;
        const dictionary = await chrome.storage.local.get(userEmail);
        if (!dictionary.hasOwnProperty(userEmail)) {
            return [];
        }
        else if (!dictionary[userEmail].hasOwnProperty(searchKey.toLowerCase())) {
            return [];
        }
        else {
            return dictionary[userEmail][searchKey.toLowerCase()];
        }
    }
    catch (e) {
        throw new Error("Can't get definition: " + e);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDefinitions);

/***/ }),

/***/ "./src/utils/get_dictionary.js":
/*!*************************************!*\
  !*** ./src/utils/get_dictionary.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDictionary);

/***/ }),

/***/ "./src/utils/get_keys.js":
/*!*******************************!*\
  !*** ./src/utils/get_keys.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _get_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get_dictionary */ "./src/utils/get_dictionary.js");


const getKeys = async () => {
    const dictionary = await (0,_get_dictionary__WEBPACK_IMPORTED_MODULE_0__["default"])();
    if (Object.keys(dictionary).length !== 0) {
        return Object.keys(dictionary);
    }
    else {
        return [];
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getKeys);

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/content.js");
/******/ 	
/******/ })()
;