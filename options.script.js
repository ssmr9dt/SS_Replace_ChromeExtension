function Save() {
  let source = document.getElementById("source").value;
  let target = document.getElementById("target").value;
  chrome.storage.sync.set({"url":[{"source":source,"target":target}]});
}

function Load() {
  let keys = ["source", "target"];
  keys.forEach((e,i) => {
    chrome.storage.sync.get("url", (items) => { // magic number...
      console.log(items);
      if (!!!items["url"]) { return; }
      if (!!!items["url"][0][e]) { return; }
      let item = items["url"][0];
      document.getElementById(e).value = item[e];
    });
  });
}

document.addEventListener('DOMContentLoaded', Load);
document.getElementById("save_button").addEventListener("click", Save);
