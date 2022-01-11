const options = document.querySelector("#options");

options.addEventListener("click", function (e) {
    chrome.tabs.create({ url: 'options.html' });
})