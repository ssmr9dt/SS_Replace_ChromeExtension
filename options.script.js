function Save() {
  let source = document.getElementById("source").value;
  let target = document.getElementById("target").value;
  chrome.storage.local.set({"url":[{"source":source,"target":target}]});
}

function Load() {
  let keys = ["source", "target"];
  keys.forEach((e,i) => {
    chrome.storage.local.get("url", (items) => { // magic number...
      if (!!!items["url"]) { return; }
      if (!!!items["url"][0][e]) { return; }
      let item = items["url"][0];
      document.getElementById(e).value = item[e];
    });
  });
}

document.addEventListener('DOMContentLoaded', Load);
document.getElementById("save_button").addEventListener("click", Save);
