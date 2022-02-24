let source = "";
let target = "";

chrome.storage.local.get("url", (items) => {
  if (!!!items["url"]){return;}
  source = items["url"][0]["source"];
  target = items["url"][0]["target"];
  changeAll();
  changeURL();
});

function changeAll() {
  if (source == "") { return; }

  let elements = document.getElementsByTagName("*");
  for (let i = elements.length - 1; i >= 0; i--) {
    if (elements[i].getAttribute("ss_replace") == "true") {continue;}
    if (elements[i].hasAttributes()) {
      let attributes = elements[i].attributes;
      for (let k = attributes.length - 1; k >= 0; k--) {
        replaceElements(elements[i].localName, attributes[k].name);
      }
    }
    elements[i].setAttribute("ss_replace","true");
  }
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

  for (let i = tag_elements.length - 1; i >= 0; i--) {
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
