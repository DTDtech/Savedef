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
              const definitions = await getDefinitions(p2);
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
  const keys = await getKeys();
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




