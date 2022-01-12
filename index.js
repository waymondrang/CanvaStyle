var oglog = console.log;
var dm4cl = function () {
    a = [];
    a.push('[dm4c][index.js]\t');
    for (var i = 0; i < arguments.length; i++) {
        a.push(arguments[i]);
    }
    oglog.apply(console, a);
};

function randomint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

dm4cl("extension activated");

//declare head element
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

//inject custom css
chrome.storage.local.get(["custom_css"], function (data) {
    if (!data["custom_css"]) {
        return;
    }
    var dm4c = data["custom_css"].findIndex(e => e.id === "dm4c-official-module");
    if (dm4c > -1 && data["custom_css"][dm4c]["enabled"]) {
        //inject dm4c css
        const css = document.createElement('link');
        css.setAttribute("href", chrome.runtime.getURL('dm4c.css'));
        css.id = "dm4c_css";
        css.rel = "stylesheet";
        document.body.insertBefore(css, document.body.lastChild);
    }
    var custom_css = data["custom_css"].filter(e => e["enabled"] && !e["default_module"]).map(e => e["custom_css"].trim()).join("\n");
    const css = document.createElement('style');
    css.textContent = custom_css;
    css.id = "dm4c_custom_css";
    css.rel = "stylesheet";
    document.body.insertBefore(css, document.body.lastChild);
})

dm4cl("injected css");