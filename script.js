let source = "";
let target = "";

console.log("hoge");

chrome.storage.sync.get("url", (items) => {
  if (!!!items["url"]){return;}
  source = items["url"][0]["source"];
  target = items["url"][0]["target"];
  changeAll();
  changeURL();
});

function changeAll() {
  if (source == "") { return; }
  replaceElements("link", "href");
  replaceElements("a", "href");
  replaceElements("a", "data-user-api-token-reset-url");
  replaceElements("a", "data-update-order-url");
  replaceElements("a", "data-comment-edit-url");
  replaceElements("a", "data-attachment-swlock-url");
  replaceElements("a", "data-create-relation-url");
  replaceElements("img", "src");
  replaceElements("button", "data-update-order-url");
  replaceElements("form", "action");
  replaceElements("input", "value")
  replaceElements("script", "src");
  replaceElements("option", "value");
  replaceElements("li", "data-url");
  replaceElements("ul", "data-url");
}

function changeURL() {
  if (source == "") { return; }
  if (location.href.indexOf(source) >= 0) {
    let newURL = location.href.replace(source,target);
    location.replace(newURL);
  }
}

function replaceElements(tag_name, attr_name) {
  if (source === "") { return; }
  let tag_elements = document.getElementsByTagName(tag_name);

  for (let i=0,i_max=tag_elements.length; i<i_max; i++) {
    let tag_element = tag_elements[i];
    if (!!tag_element.getAttribute(attr_name)) {
      let source_attr = tag_element.getAttribute(attr_name);
      let target_attr = source_attr.replace(source, target);
      tag_element.setAttribute(attr_name, target_attr);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let body = document.body;
  let observer = new MutationObserver((mutations) => { changeAll(); })
  observer.observe(body, {
    childList: true,
    subtree: true
  });
  changeAll();
});
