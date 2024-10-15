import getDefinitions from "./utils/get_definitions";
import getKeys from "./utils/get_keys";

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
        const definitions = await getDefinitions(matched_string);
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
          const definitions = await getDefinitions(matched_string);
          showDefinitions(matched_string, definitions, wrapper);
        };

        textNode.parentNode.insertBefore(wrapper, newTextNode);

      })
    })
  })
}

const userInfo = await chrome.storage.local.get("userInfo");

if (Object.keys(userInfo).length > 0) {
  const keys = await getKeys();
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


