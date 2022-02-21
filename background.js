chrome.storage.sync.get("url", (items) => {
  if (!!!items["url"]) { return; }
  let source = items["url"][0]["source"];
  let target = items["url"][0]["target"];

  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      let redirectURL = details.url.replace(source, target);
      if (redirectURL != details.url) {
        return {redirectUrl: redirectURL};
      }
      return {};
    },
    { urls: ["<all_urls>"] },
    []
  );
});
