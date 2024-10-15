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

const showDefinitions = (key, definitions, highlightElement) => {
  const definitionList = document.createElement("div");
  definitionList.id = "definition_list";

  definitionList.onclick = (() => {
    document.body.removeChild(definitionList);
  });

  let definitionBox = document.createElement("ol");
  definitions.forEach((definition) => {
    let definitionItem = document.createElement("li");
    definitionItem.classList.add("definition_item");
    definitionItem.textContent = definition;
    definitionBox.appendChild(definitionItem);
  });
  definitionList.appendChild(definitionBox);

  var delete_definition_button = document.createElement("BUTTON");
  var delete_text = document.createTextNode("Delete all definitions");
  delete_definition_button.appendChild(delete_text);
  delete_definition_button.onclick = () => {

    console.log(key);

    var nodeList = document.querySelectorAll(".highlighted");

    nodeList = Array.from(nodeList);

    nodeList = nodeList.filter((node) => node.textContent.toLowerCase() === key.toLowerCase())

    console.log(nodeList);

    // const elementNodeList = 
    nodeList.forEach((node) => {
      node.parentElement.replaceChild(node.childNodes[0], node);
    })
  }
  definitionList.appendChild(delete_definition_button);
  document.body.appendChild(definitionList);
  // highlightElement.appendChild(definitionList);
}

const hightlightKeyword = (keyword) => {
  const allTextNodes = textNodesUnder(document.body);

  var matchingElements = allTextNodes.filter(textNode => textNode.textContent.toLowerCase().match(new RegExp("\\b" + keyword + "\\b", "i")));

  matchingElements.forEach((textNode, index) => {
    var offsetAfterSplit = 0;
    textNode.data.replace(new RegExp("\\b" + keyword + "\\b", "gi"), function (matched_string) {
      //matched string, offset and the examined string is automatically passed to arguments
      var args = [].slice.call(arguments),
        offset = args[args.length - 2],
        newTextNode = textNode.splitText(offset + offsetAfterSplit);

      offsetAfterSplit -= textNode.data.length + matched_string.length;

      newTextNode.data = newTextNode.data.substring(matched_string.length);

      textNode = newTextNode;

      const wrapper = document.createElement('span');
      wrapper.textContent = matched_string;
      wrapper.classList.add('highlighted');
      wrapper.onclick = async () => {
        const definitions = await (0,_utils_get_definitions__WEBPACK_IMPORTED_MODULE_0__["default"])(matched_string);
        showDefinitions(matched_string, definitions, wrapper);
      };

      textNode.parentNode.insertBefore(wrapper, newTextNode);

    })
  })
}

const unhighlightKeyword = (keyword) => {
  var nodeList = document.querySelectorAll(".highlighted");

  nodeList = Array.from(nodeList);
  nodeList = nodeList.filter((node) => node.textContent.toLowerCase() === key.toLowerCase() && node.id === keyword)

  // const elementNodeList = 
  nodeList.forEach((node) => {
    node.parentElement.replaceChild(node.childNodes[0], node);
  })
}

const highlightContent = (keywords) => {
  const allTextNodes = textNodesUnder(document.body);

  keywords.forEach(keyword => {
    var matchingElements = allTextNodes.filter(textNode => textNode.textContent.toLowerCase().match(new RegExp("\\b" + keyword + "\\b", "i")));

    matchingElements.forEach((textNode, index) => {
      var offsetAfterSplit = 0;
      textNode.data.replace(new RegExp("\\b" + keyword + "\\b", "gi"), function (matched_string) {
        //matched string, offset and the examined string is automatically passed to arguments
        var args = [].slice.call(arguments),
          offset = args[args.length - 2],
          newTextNode = textNode.splitText(offset + offsetAfterSplit);

        offsetAfterSplit -= textNode.data.length + matched_string.length;

        newTextNode.data = newTextNode.data.substring(matched_string.length);

        textNode = newTextNode;

        const wrapper = document.createElement('span');
        wrapper.textContent = matched_string;
        wrapper.classList.add('highlighted');
        wrapper.onclick = async () => {
          const definitions = await (0,_utils_get_definitions__WEBPACK_IMPORTED_MODULE_0__["default"])(matched_string);
          showDefinitions(matched_string, definitions, wrapper);
        };

        textNode.parentNode.insertBefore(wrapper, newTextNode);

      })
    })
  })
}

const userInfo = await chrome.storage.local.get("userInfo");

if (Object.keys(userInfo).length > 0) {
  const keys = await (0,_utils_get_keys__WEBPACK_IMPORTED_MODULE_1__["default"])();
  console.log(keys);
  if (keys.length > 0) {
    var date1 = new Date();
    highlightContent(keys);
    var date2 = new Date();
    console.log("first: ", date2 - date1);

  }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.command === "add_highlight") {
    hightlightKeyword(request.key);
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
const getKeys = async () => {
    const userInfo = await chrome.storage.local.get("userInfo");
    const uid = userInfo["userInfo"].uid;
    const dictionary = await chrome.storage.local.get(uid);
    console.log(dictionary);
    if (Object.keys(dictionary).length !== 0 && dictionary[uid] !== undefined) {
        return Object.keys(dictionary[uid]);
    }    
    else {
        return {};
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