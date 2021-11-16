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

function attachimage(image) {
    //inject images.js
    var img = document.createElement('img');
    img.setAttribute("src", chrome.extension.getURL(image));
    img.classList.add("dm4c-image", "hidden");
    document.body.insertBefore(img, document.body.lastChild);
}

//declare head element
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

//inject dm4c css
const css = document.createElement('link');
css.setAttribute("href", chrome.extension.getURL('dm4c.css'));
css.id = "dm4c-css";
css.rel = "stylesheet";
document.body.insertBefore(css, document.body.lastChild);

dm4cl("injected css")

/* //inject images.js
const imagesjs = document.createElement('script');
imagesjs.setAttribute("src", chrome.extension.getURL('images.js'));
imagesjs.id = "dm4c-images-module";
imagesjs.async = false;
document.body.insertBefore(imagesjs, document.body.lastChild);

attachimage("purin_pancakes.png") */

/* console.log("running groupsinit")

function ababa() {
    var parent = document.querySelector(".planner-today");
    parent.style.position = "relative";
    var img = document.createElement('img');
    img.setAttribute("src", chrome.extension.getURL("pompurrin.png"));
    img.classList.add("dm4c-image");
    img.style.top = `${-100}px`;
    img.style.left = `${140}px`;
    parent.insertBefore(img, parent.lastChild);
}

var groupsinit = document.querySelector(".Grouping-styles__root");
if (!groupsinit) {
    var groupsobserver = new MutationObserver(function (mutations, me) {
        var groups = document.querySelector(".planner-today");
        if (groups) {
            dm4cl("ooga booga");
            ababa();
            me.disconnect(); //STOP OBSERVING
        }
    });
    //START OBSERVING
    groupsobserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
} else {
    dm4cl("ooga booga");
    ababa();
} */
