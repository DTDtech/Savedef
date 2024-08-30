/******/ (() => { // webpackBootstrap
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
// window.addEventListener("load", () => {
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "show_definitions") {
    const definitions = request.defs;
    const definitionList = document.createElement("div");
    definitionList.id = "definition_list";
    definitionList.onclick = (() => {
      const definitionList = document.getElementById("definition_list");
      definitionList.remove();
    });

    let definitionBox = document.createElement("ol");
    definitions.forEach((definition) => {
      let definitionItem = document.createElement("li");
      definitionItem.classList.add("definition_item");
      definitionItem.textContent = definition;
      definitionBox.appendChild(definitionItem);
    });
    definitionList.appendChild(definitionBox);
    document.body.appendChild(definitionList);
    sendResponse({ message: "Showed definition list" });
  }
  else {
    sendResponse({ message: "Wrong command" })
  }
})
// })

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
      console.log("value is:", lastHighlightedPosition);
      const textOffset = textNode.textContent.toLowerCase().indexOf(textToHighlight.toLowerCase(), lastHighlightedPosition);

      const range = new Range();
      range.setStart(textNode, textOffset);
      range.setEnd(textNode, textOffset + textToHighlight.length);

      const wrapper = document.createElement('span');
      wrapper.classList.add('highlight');
      range.surroundContents(wrapper);

      lastHighlightedPosition = range.endOffset;
      console.log(lastHighlightedPosition);
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










/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsbUNBQW1DO0FBQ3REO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0EsQ0FBQztBQUNELElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2F2ZWRlZi8uL3NyYy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICBpZiAocmVxdWVzdC5jb21tYW5kID09PSBcInNob3dfZGVmaW5pdGlvbnNcIikge1xyXG4gICAgY29uc3QgZGVmaW5pdGlvbnMgPSByZXF1ZXN0LmRlZnM7XHJcbiAgICBjb25zdCBkZWZpbml0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkZWZpbml0aW9uTGlzdC5pZCA9IFwiZGVmaW5pdGlvbl9saXN0XCI7XHJcbiAgICBkZWZpbml0aW9uTGlzdC5vbmNsaWNrID0gKCgpID0+IHtcclxuICAgICAgY29uc3QgZGVmaW5pdGlvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmluaXRpb25fbGlzdFwiKTtcclxuICAgICAgZGVmaW5pdGlvbkxpc3QucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZGVmaW5pdGlvbkJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcclxuICAgIGRlZmluaXRpb25zLmZvckVhY2goKGRlZmluaXRpb24pID0+IHtcclxuICAgICAgbGV0IGRlZmluaXRpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICBkZWZpbml0aW9uSXRlbS5jbGFzc0xpc3QuYWRkKFwiZGVmaW5pdGlvbl9pdGVtXCIpO1xyXG4gICAgICBkZWZpbml0aW9uSXRlbS50ZXh0Q29udGVudCA9IGRlZmluaXRpb247XHJcbiAgICAgIGRlZmluaXRpb25Cb3guYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgICBkZWZpbml0aW9uTGlzdC5hcHBlbmRDaGlsZChkZWZpbml0aW9uQm94KTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkxpc3QpO1xyXG4gICAgc2VuZFJlc3BvbnNlKHsgbWVzc2FnZTogXCJTaG93ZWQgZGVmaW5pdGlvbiBsaXN0XCIgfSk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgc2VuZFJlc3BvbnNlKHsgbWVzc2FnZTogXCJXcm9uZyBjb21tYW5kXCIgfSlcclxuICB9XHJcbn0pXHJcbi8vIH0pXHJcblxyXG5jb25zdCB0ZXh0Tm9kZXNVbmRlciA9IChlbCkgPT4ge1xyXG4gIGNvbnN0IGNoaWxkcmVuID0gW10gLy8gVHlwZTogTm9kZVtdXHJcbiAgY29uc3Qgd2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihlbCwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIChub2RlKSA9PiBub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgIT09ICdTQ1JJUFQnICYmIG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSAhPT0gJ1NUWUxFJylcclxuICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcclxuICAgIGNoaWxkcmVuLnB1c2god2Fsa2VyLmN1cnJlbnROb2RlKVxyXG4gIH1cclxuICByZXR1cm4gY2hpbGRyZW47XHJcbn1cclxuXHJcbmNvbnN0IGhpZ2hsaWdodENvbnRlbnQgPSAodGV4dFRvSGlnaGxpZ2h0KSA9PiB7XHJcbiAgY29uc3QgYWxsVGV4dE5vZGVzID0gdGV4dE5vZGVzVW5kZXIoZG9jdW1lbnQuYm9keSk7XHJcbiAgdmFyIG1hdGNoaW5nRWxlbWVudHMgPSBhbGxUZXh0Tm9kZXMuZmlsdGVyKHRleHROb2RlID0+IHRleHROb2RlLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGV4dFRvSGlnaGxpZ2h0LnRvTG93ZXJDYXNlKCkpKTtcclxuXHJcblxyXG4gIGZvciAobGV0IHRleHROb2RlIG9mIG1hdGNoaW5nRWxlbWVudHMpIHtcclxuXHJcbiAgICB2YXIgbGFzdEhpZ2hsaWdodGVkUG9zaXRpb24gPSAwO1xyXG5cclxuICAgIHdoaWxlICh0ZXh0Tm9kZS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGV4dFRvSGlnaGxpZ2h0LnRvTG93ZXJDYXNlKCksIGxhc3RIaWdobGlnaHRlZFBvc2l0aW9uKSAhPT0gLTEpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJ2YWx1ZSBpczpcIiwgbGFzdEhpZ2hsaWdodGVkUG9zaXRpb24pO1xyXG4gICAgICBjb25zdCB0ZXh0T2Zmc2V0ID0gdGV4dE5vZGUudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRleHRUb0hpZ2hsaWdodC50b0xvd2VyQ2FzZSgpLCBsYXN0SGlnaGxpZ2h0ZWRQb3NpdGlvbik7XHJcblxyXG4gICAgICBjb25zdCByYW5nZSA9IG5ldyBSYW5nZSgpO1xyXG4gICAgICByYW5nZS5zZXRTdGFydCh0ZXh0Tm9kZSwgdGV4dE9mZnNldCk7XHJcbiAgICAgIHJhbmdlLnNldEVuZCh0ZXh0Tm9kZSwgdGV4dE9mZnNldCArIHRleHRUb0hpZ2hsaWdodC5sZW5ndGgpO1xyXG5cclxuICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHQnKTtcclxuICAgICAgcmFuZ2Uuc3Vycm91bmRDb250ZW50cyh3cmFwcGVyKTtcclxuXHJcbiAgICAgIGxhc3RIaWdobGlnaHRlZFBvc2l0aW9uID0gcmFuZ2UuZW5kT2Zmc2V0O1xyXG4gICAgICBjb25zb2xlLmxvZyhsYXN0SGlnaGxpZ2h0ZWRQb3NpdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgY29tbWFuZDogJ2dldF9rZXlzJyxcclxufSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIHJlc3BvbnNlKSB7XHJcbiAgICBoaWdobGlnaHRDb250ZW50KGtleSk7XHJcbiAgfTtcclxufSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9