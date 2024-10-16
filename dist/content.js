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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxxQkFBcUIsbUNBQW1DO0FBQ3hEO0FBQ0E7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DO0FBQ0EsR0FBRztBQUNILE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhdmVkZWYvLi9zcmMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIGlmIChyZXF1ZXN0LmNvbW1hbmQgPT09IFwic2hvd19kZWZpbml0aW9uc1wiKSB7XHJcbiAgICAgIGNvbnN0IGRlZmluaXRpb25zID0gcmVxdWVzdC5kZWZzO1xyXG4gICAgICBjb25zdCBkZWZpbml0aW9uTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGRlZmluaXRpb25MaXN0LmlkID0gXCJkZWZpbml0aW9uX2xpc3RcIjtcclxuICAgICAgZGVmaW5pdGlvbkxpc3Qub25jbGljayA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmluaXRpb25fbGlzdFwiKTtcclxuICAgICAgICBkZWZpbml0aW9uTGlzdC5yZW1vdmUoKTtcclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICAgIGxldCBkZWZpbml0aW9uQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xyXG4gICAgICBkZWZpbml0aW9ucy5mb3JFYWNoKChkZWZpbml0aW9uKSA9PiB7XHJcbiAgICAgICAgbGV0IGRlZmluaXRpb25JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgIGRlZmluaXRpb25JdGVtLmNsYXNzTGlzdC5hZGQoXCJkZWZpbml0aW9uX2l0ZW1cIik7XHJcbiAgICAgICAgZGVmaW5pdGlvbkl0ZW0udGV4dENvbnRlbnQgPSBkZWZpbml0aW9uO1xyXG4gICAgICAgIGRlZmluaXRpb25Cb3guYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkl0ZW0pO1xyXG4gICAgICB9KTtcclxuICAgICAgZGVmaW5pdGlvbkxpc3QuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkJveCk7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGVmaW5pdGlvbkxpc3QpO1xyXG4gICAgICBzZW5kUmVzcG9uc2UoeyBtZXNzYWdlOiBcIlNob3dlZCBkZWZpbml0aW9uIGxpc3RcIiB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBzZW5kUmVzcG9uc2UoeyBtZXNzYWdlOiBcIldyb25nIGNvbW1hbmRcIiB9KVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgLy8gfSlcclxuICBcclxuICBjb25zdCB0ZXh0Tm9kZXNVbmRlciA9IChlbCkgPT4ge1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXSBcclxuICAgIGNvbnN0IHdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoZWwsIE5vZGVGaWx0ZXIuU0hPV19URVhULCAobm9kZSkgPT4gbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lICE9PSAnU0NSSVBUJyAmJiBub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgIT09ICdTVFlMRScpXHJcbiAgICB3aGlsZSAod2Fsa2VyLm5leHROb2RlKCkpIHtcclxuICAgICAgY2hpbGRyZW4ucHVzaCh3YWxrZXIuY3VycmVudE5vZGUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IGhpZ2h0bGlnaHRLZXl3b3JkID0gKHRleHROb2RlLCB0ZXh0T2Zmc2V0LCB0ZXh0VG9IaWdobGlnaHQpID0+IHtcclxuICAgIC8vSWRlbnRpZnkgdGhlIHN0YXJ0IGFuZCBlbmQgbG9jYXRpb24gb2Yga2V5d29yZCBpbiB0ZXh0bm9kZVxyXG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgcmFuZ2Uuc2V0U3RhcnQodGV4dE5vZGUsIHRleHRPZmZzZXQpO1xyXG4gICAgcmFuZ2Uuc2V0RW5kKHRleHROb2RlLCB0ZXh0T2Zmc2V0ICsgdGV4dFRvSGlnaGxpZ2h0Lmxlbmd0aCk7XHJcbiAgXHJcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdoaWdobGlnaHRlZCcpO1xyXG4gICAgcmFuZ2Uuc3Vycm91bmRDb250ZW50cyh3cmFwcGVyKTtcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgaGlnaGxpZ2h0Q29udGVudCA9ICh0ZXh0VG9IaWdobGlnaHQpID0+IHtcclxuICAgIGNvbnN0IGFsbFRleHROb2RlcyA9IHRleHROb2Rlc1VuZGVyKGRvY3VtZW50LmJvZHkpO1xyXG4gICAgdmFyIG1hdGNoaW5nRWxlbWVudHMgPSBhbGxUZXh0Tm9kZXMuZmlsdGVyKHRleHROb2RlID0+IHRleHROb2RlLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModGV4dFRvSGlnaGxpZ2h0LnRvTG93ZXJDYXNlKCkpKTtcclxuICBcclxuICBcclxuICAgIGZvciAobGV0IHRleHROb2RlIG9mIG1hdGNoaW5nRWxlbWVudHMpIHtcclxuICBcclxuICAgICAgY29uc3QgdGV4dE5vZGVQYXJlbnQgPSB0ZXh0Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICB2YXIgYWxsQ2hpbGRyZW5Ob2RlcyA9IHRleHROb2RlUGFyZW50LmNoaWxkTm9kZXM7XHJcbiAgICAgIHZhciBzdGFydGluZ05vZGVQb3NpdGlvbiA9IEFycmF5LmZyb20oYWxsQ2hpbGRyZW5Ob2RlcykuaW5kZXhPZih0ZXh0Tm9kZSk7XHJcbiAgXHJcbiAgICAgIHdoaWxlIChhbGxDaGlsZHJlbk5vZGVzW3N0YXJ0aW5nTm9kZVBvc2l0aW9uXS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGV4dFRvSGlnaGxpZ2h0LnRvTG93ZXJDYXNlKCkpICE9PSAtMSkge1xyXG4gIFxyXG4gICAgICAgIGNvbnN0IHRleHRPZmZzZXQgPSBhbGxDaGlsZHJlbk5vZGVzW3N0YXJ0aW5nTm9kZVBvc2l0aW9uXS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGV4dFRvSGlnaGxpZ2h0LnRvTG93ZXJDYXNlKCkpO1xyXG4gIFxyXG4gICAgICAgIGhpZ2h0bGlnaHRLZXl3b3JkKGFsbENoaWxkcmVuTm9kZXNbc3RhcnRpbmdOb2RlUG9zaXRpb25dLCB0ZXh0T2Zmc2V0LCB0ZXh0VG9IaWdobGlnaHQpO1xyXG4gIFxyXG4gICAgICAgIHN0YXJ0aW5nTm9kZVBvc2l0aW9uICs9IDI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgY29tbWFuZDogJ2dldF9rZXlzJyxcclxuICB9LCAocmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIHJlc3BvbnNlKSB7XHJcbiAgICAgIGhpZ2hsaWdodENvbnRlbnQoa2V5KTtcclxuICAgIH07XHJcbiAgfSlcclxuICAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=