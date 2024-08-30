/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
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








/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0Esd0JBQXdCLG1DQUFtQztBQUMzRDtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2F2ZWRlZi8uL3NyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRleHROb2Rlc1VuZGVyID0gKGVsKSA9PiB7XHJcbiAgY29uc3QgY2hpbGRyZW4gPSBbXSAvLyBUeXBlOiBOb2RlW11cclxuICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGVsLCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgKG5vZGUpID0+IG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSAhPT0gJ1NDUklQVCcgJiYgbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lICE9PSAnU1RZTEUnKVxyXG4gIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xyXG4gICAgY2hpbGRyZW4ucHVzaCh3YWxrZXIuY3VycmVudE5vZGUpXHJcbiAgfVxyXG4gIHJldHVybiBjaGlsZHJlbjtcclxufVxyXG5cclxuY29uc3QgaGlnaGxpZ2h0Q29udGVudCA9ICh0ZXh0VG9IaWdobGlnaHQpID0+IHtcclxuICBjb25zdCBhbGxUZXh0Tm9kZXMgPSB0ZXh0Tm9kZXNVbmRlcihkb2N1bWVudC5ib2R5KTtcclxuICB2YXIgbWF0Y2hpbmdFbGVtZW50cyA9IGFsbFRleHROb2Rlcy5maWx0ZXIodGV4dE5vZGUgPT4gdGV4dE5vZGUudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh0ZXh0VG9IaWdobGlnaHQudG9Mb3dlckNhc2UoKSkpO1xyXG5cclxuXHJcbiAgZm9yIChsZXQgdGV4dE5vZGUgb2YgbWF0Y2hpbmdFbGVtZW50cykge1xyXG5cclxuICAgIHZhciBsYXN0SGlnaGxpZ2h0ZWRQb3NpdGlvbiA9IDA7XHJcblxyXG4gICAgd2hpbGUgKHRleHROb2RlLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXh0VG9IaWdobGlnaHQudG9Mb3dlckNhc2UoKSwgbGFzdEhpZ2hsaWdodGVkUG9zaXRpb24pICE9PSAtMSkge1xyXG5cclxuICAgICAgY29uc3QgdGV4dE9mZnNldCA9IHRleHROb2RlLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXh0VG9IaWdobGlnaHQudG9Mb3dlckNhc2UoKSwgbGFzdEhpZ2hsaWdodGVkUG9zaXRpb24pO1xyXG5cclxuICAgICAgY29uc3QgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcclxuICAgICAgcmFuZ2Uuc2V0U3RhcnQodGV4dE5vZGUsIHRleHRPZmZzZXQpO1xyXG4gICAgICByYW5nZS5zZXRFbmQodGV4dE5vZGUsIHRleHRPZmZzZXQgKyB0ZXh0VG9IaWdobGlnaHQubGVuZ3RoKTtcclxuXHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGlnaGxpZ2h0Jyk7XHJcbiAgICAgIHJhbmdlLnN1cnJvdW5kQ29udGVudHMod3JhcHBlcik7XHJcblxyXG4gICAgICBsYXN0SGlnaGxpZ2h0ZWRQb3NpdGlvbiA9IHJhbmdlLmVuZE9mZnNldDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICBjb21tYW5kOiAnZ2V0X2tleXMnLFxyXG59LCAocmVzcG9uc2UpID0+IHtcclxuICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgZm9yIChjb25zdCBrZXkgb2YgcmVzcG9uc2UpIHtcclxuICAgIGhpZ2hsaWdodENvbnRlbnQoa2V5KTtcclxuICB9O1xyXG59KVxyXG5cclxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuLy8gICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbi8vICAgICBpZiAocmVxdWVzdC5jb21tYW5kID09PSBcInNob3dfZGVmaW5pdGlvbnNcIikge1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuLy8gICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSByZXF1ZXN0LmRlZnM7XHJcbi8vICAgICAgIGNvbnN0IGRlZmluaXRpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuLy8gICAgICAgZGVmaW5pdGlvbkxpc3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZWZpbml0aW9uX2xpc3RcIik7XHJcbi8vICAgICAgIGRlZmluaXRpb25MaXN0LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogYmxvY2tcIik7XHJcbi8vICAgICAgIGRlZmluaXRpb25MaXN0LnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJoaWRlRGVmaW5pdGlvbkxpc3QoKVwiKTtcclxuXHJcbi8vICAgICAgIGRlZmluaXRpb25zLmZvckVhY2goKGRlZmluaXRpb24pID0+IHtcclxuLy8gICAgICAgICBsZXQgZGVmaW5pdGlvbkJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgICAgICAgZGVmaW5pdGlvbkJveC50ZXh0Q29udGVudCA9IGRlZmluaXRpb247XHJcbi8vICAgICAgICAgZGVmaW5pdGlvbkxpc3QuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkJveCk7XHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgICBkZWZpbml0aW9uTGlzdC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6IGJsb2NrXCIpXHJcbi8vICAgICAgIHNlbmRSZXNwb25zZSh7IG1lc3NhZ2U6IFwiU2hvd2VkIGRlZmluaXRpb24gbGlzdFwiIH0pO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZSB7XHJcbi8vICAgICAgIHNlbmRSZXNwb25zZSh7IG1lc3NhZ2U6IFwiV3JvbmcgY29tbWFuZFwiIH0pXHJcbi8vICAgICB9XHJcbi8vICAgfSlcclxuXHJcbi8vICAgY29uc3QgaGlkZURlZmluaXRpb25MaXN0ID0gKCkgPT4ge1xyXG4vLyAgICAgY29uc3QgZGVmaW5pdGlvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmluaXRpb25fbGlzdFwiKTtcclxuLy8gICAgIGRlZmluaXRpb25MaXN0LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogbm9uZVwiKVxyXG4vLyAgIH1cclxuLy8gfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==