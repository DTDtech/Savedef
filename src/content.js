const textNodesUnder = (el) => {
  const children = [] // Type: Node[]
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, (node) => node.parentNode.nodeName !== 'SCRIPT' && node.parentNode.nodeName !== 'STYLE')
  while (walker.nextNode()) {
    children.push(walker.currentNode)
  }
  return children;
}

const highlightContent = (textToHighlight) => {
  const allTextNodes = textNodesUnder(document.body);
  var matchingElements = allTextNodes.filter(textNode => textNode.textContent.toLowerCase().includes(textToHighlight.toLowerCase()));


  for (let textNode of matchingElements) {

    var lastHighlightedPosition = 0;

    while (textNode.textContent.toLowerCase().indexOf(textToHighlight.toLowerCase(), lastHighlightedPosition) !== -1) {

      const textOffset = textNode.textContent.toLowerCase().indexOf(textToHighlight.toLowerCase(), lastHighlightedPosition);

      const range = new Range();
      range.setStart(textNode, textOffset);
      range.setEnd(textNode, textOffset + textToHighlight.length);

      const wrapper = document.createElement('span');
      wrapper.classList.add('highlight');
      range.surroundContents(wrapper);

      lastHighlightedPosition = range.endOffset;
    }
  }
}

chrome.runtime.sendMessage({
  command: 'get_keys',
}, (response) => {
  console.log(response);
  for (const key of response) {
    highlightContent(key);
  };
})

// window.addEventListener("load", () => {
//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.command === "show_definitions") {
//       console.log(request);
//       const definitions = request.defs;
//       const definitionList = document.createElement("div");
//       definitionList.setAttribute("id", "definition_list");
//       definitionList.setAttribute("style", "display: block");
//       definitionList.setAttribute("onclick", "hideDefinitionList()");

//       definitions.forEach((definition) => {
//         let definitionBox = document.createElement("div");
//         definitionBox.textContent = definition;
//         definitionList.appendChild(definitionBox);
//       });
//       definitionList.setAttribute("style", "display: block")
//       sendResponse({ message: "Showed definition list" });
//     }
//     else {
//       sendResponse({ message: "Wrong command" })
//     }
//   })

//   const hideDefinitionList = () => {
//     const definitionList = document.getElementById("definition_list");
//     definitionList.setAttribute("style", "display: none")
//   }
// })







