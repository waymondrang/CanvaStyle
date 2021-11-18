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

//inject dm4c css
const css = document.createElement('link');
css.setAttribute("href", chrome.extension.getURL('dm4c.css'));
css.id = "dm4c-css";
css.rel = "stylesheet";
document.body.insertBefore(css, document.body.lastChild);

dm4cl("injected css")