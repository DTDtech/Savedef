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
  const children = [] 
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, (node) => node.parentNode.nodeName !== 'SCRIPT' && node.parentNode.nodeName !== 'STYLE')
  while (walker.nextNode()) {
    children.push(walker.currentNode)
  }
  return children;
}

const hightlightKeyword = (textNode, textOffset, textToHighlight) => {
  //Identify the start and end location of keyword in textnode
  const range = document.createRange();
  range.setStart(textNode, textOffset);
  range.setEnd(textNode, textOffset + textToHighlight.length);

  const wrapper = document.createElement('span');
  wrapper.classList.add('highlighted');
  range.surroundContents(wrapper);
}

const highlightContent = (textToHighlight) => {
  const allTextNodes = textNodesUnder(document.body);
  var matchingElements = allTextNodes.filter(textNode => textNode.textContent.toLowerCase().includes(textToHighlight.toLowerCase()));


  for (let textNode of matchingElements) {

    const textNodeParent = textNode.parentNode;
    var allChildrenNodes = textNodeParent.childNodes;
    var startingNodePosition = Array.from(allChildrenNodes).indexOf(textNode);

    while (allChildrenNodes[startingNodePosition].textContent.toLowerCase().indexOf(textToHighlight.toLowerCase()) !== -1) {

      const textOffset = allChildrenNodes[startingNodePosition].textContent.toLowerCase().indexOf(textToHighlight.toLowerCase());

      hightlightKeyword(allChildrenNodes[startingNodePosition], textOffset, textToHighlight);

      startingNodePosition += 2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsbUNBQW1DO0FBQ3REO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0EsQ0FBQztBQUNELElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zYXZlZGVmLy4vc3JjL2NvbnRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09IFwic2hvd19kZWZpbml0aW9uc1wiKSB7XHJcbiAgICBjb25zdCBkZWZpbml0aW9ucyA9IHJlcXVlc3QuZGVmcztcclxuICAgIGNvbnN0IGRlZmluaXRpb25MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRlZmluaXRpb25MaXN0LmlkID0gXCJkZWZpbml0aW9uX2xpc3RcIjtcclxuICAgIGRlZmluaXRpb25MaXN0Lm9uY2xpY2sgPSAoKCkgPT4ge1xyXG4gICAgICBjb25zdCBkZWZpbml0aW9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmaW5pdGlvbl9saXN0XCIpO1xyXG4gICAgICBkZWZpbml0aW9uTGlzdC5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBkZWZpbml0aW9uQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xyXG4gICAgZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmaW5pdGlvbikgPT4ge1xyXG4gICAgICBsZXQgZGVmaW5pdGlvbkl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgIGRlZmluaXRpb25JdGVtLmNsYXNzTGlzdC5hZGQoXCJkZWZpbml0aW9uX2l0ZW1cIik7XHJcbiAgICAgIGRlZmluaXRpb25JdGVtLnRleHRDb250ZW50ID0gZGVmaW5pdGlvbjtcclxuICAgICAgZGVmaW5pdGlvbkJveC5hcHBlbmRDaGlsZChkZWZpbml0aW9uSXRlbSk7XHJcbiAgICB9KTtcclxuICAgIGRlZmluaXRpb25MaXN0LmFwcGVuZENoaWxkKGRlZmluaXRpb25Cb3gpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkZWZpbml0aW9uTGlzdCk7XHJcbiAgICBzZW5kUmVzcG9uc2UoeyBtZXNzYWdlOiBcIlNob3dlZCBkZWZpbml0aW9uIGxpc3RcIiB9KTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBzZW5kUmVzcG9uc2UoeyBtZXNzYWdlOiBcIldyb25nIGNvbW1hbmRcIiB9KVxyXG4gIH1cclxufSlcclxuLy8gfSlcclxuXHJcbmNvbnN0IHRleHROb2Rlc1VuZGVyID0gKGVsKSA9PiB7XHJcbiAgY29uc3QgY2hpbGRyZW4gPSBbXSBcclxuICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKGVsLCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgKG5vZGUpID0+IG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSAhPT0gJ1NDUklQVCcgJiYgbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lICE9PSAnU1RZTEUnKVxyXG4gIHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSkge1xyXG4gICAgY2hpbGRyZW4ucHVzaCh3YWxrZXIuY3VycmVudE5vZGUpXHJcbiAgfVxyXG4gIHJldHVybiBjaGlsZHJlbjtcclxufVxyXG5cclxuY29uc3QgaGlnaHRsaWdodEtleXdvcmQgPSAodGV4dE5vZGUsIHRleHRPZmZzZXQsIHRleHRUb0hpZ2hsaWdodCkgPT4ge1xyXG4gIC8vSWRlbnRpZnkgdGhlIHN0YXJ0IGFuZCBlbmQgbG9jYXRpb24gb2Yga2V5d29yZCBpbiB0ZXh0bm9kZVxyXG4gIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICByYW5nZS5zZXRTdGFydCh0ZXh0Tm9kZSwgdGV4dE9mZnNldCk7XHJcbiAgcmFuZ2Uuc2V0RW5kKHRleHROb2RlLCB0ZXh0T2Zmc2V0ICsgdGV4dFRvSGlnaGxpZ2h0Lmxlbmd0aCk7XHJcblxyXG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHRlZCcpO1xyXG4gIHJhbmdlLnN1cnJvdW5kQ29udGVudHMod3JhcHBlcik7XHJcbn1cclxuXHJcbmNvbnN0IGhpZ2hsaWdodENvbnRlbnQgPSAodGV4dFRvSGlnaGxpZ2h0KSA9PiB7XHJcbiAgY29uc3QgYWxsVGV4dE5vZGVzID0gdGV4dE5vZGVzVW5kZXIoZG9jdW1lbnQuYm9keSk7XHJcbiAgdmFyIG1hdGNoaW5nRWxlbWVudHMgPSBhbGxUZXh0Tm9kZXMuZmlsdGVyKHRleHROb2RlID0+IHRleHROb2RlLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGV4dFRvSGlnaGxpZ2h0LnRvTG93ZXJDYXNlKCkpKTtcclxuXHJcblxyXG4gIGZvciAobGV0IHRleHROb2RlIG9mIG1hdGNoaW5nRWxlbWVudHMpIHtcclxuXHJcbiAgICBjb25zdCB0ZXh0Tm9kZVBhcmVudCA9IHRleHROb2RlLnBhcmVudE5vZGU7XHJcbiAgICB2YXIgYWxsQ2hpbGRyZW5Ob2RlcyA9IHRleHROb2RlUGFyZW50LmNoaWxkTm9kZXM7XHJcbiAgICB2YXIgc3RhcnRpbmdOb2RlUG9zaXRpb24gPSBBcnJheS5mcm9tKGFsbENoaWxkcmVuTm9kZXMpLmluZGV4T2YodGV4dE5vZGUpO1xyXG5cclxuICAgIHdoaWxlIChhbGxDaGlsZHJlbk5vZGVzW3N0YXJ0aW5nTm9kZVBvc2l0aW9uXS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGV4dFRvSGlnaGxpZ2h0LnRvTG93ZXJDYXNlKCkpICE9PSAtMSkge1xyXG5cclxuICAgICAgY29uc3QgdGV4dE9mZnNldCA9IGFsbENoaWxkcmVuTm9kZXNbc3RhcnRpbmdOb2RlUG9zaXRpb25dLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXh0VG9IaWdobGlnaHQudG9Mb3dlckNhc2UoKSk7XHJcblxyXG4gICAgICBoaWdodGxpZ2h0S2V5d29yZChhbGxDaGlsZHJlbk5vZGVzW3N0YXJ0aW5nTm9kZVBvc2l0aW9uXSwgdGV4dE9mZnNldCwgdGV4dFRvSGlnaGxpZ2h0KTtcclxuXHJcbiAgICAgIHN0YXJ0aW5nTm9kZVBvc2l0aW9uICs9IDI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgY29tbWFuZDogJ2dldF9rZXlzJyxcclxufSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIHJlc3BvbnNlKSB7XHJcbiAgICBoaWdobGlnaHRDb250ZW50KGtleSk7XHJcbiAgfTtcclxufSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==