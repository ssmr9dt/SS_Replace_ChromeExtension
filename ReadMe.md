SS_Replace
=====================
HTML replace and Redirector (Assuming SSH jump host) for Chrome extension.

This app is simple.
It replaces the text saved in the options from the displayed HTML.

Then, when redirected from a link or Form, if the text matches the text you set, it will rewrite it for you.

This is useful for sites that are only allowed to be viewed from within the company and use absolute paths.

---
### Sample

```
https://example.com/ -> https://localhost:5001/
```
``` html
<a href="http://example.com/example/index.js>JS</a> -> <a href="http://localhost:5001/example/index.js>JS</a>
```
