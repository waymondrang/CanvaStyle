const save = document.querySelector("#save");
const status = document.querySelector("#status");
const input = document.querySelector("textarea");

try {
    chrome.storage.local.get(["custom_css"], function (data) {
        input.value = data.custom_css;
        status.innerHTML = "LOADED";
    })
} catch (e) {
    console.log(e);
    status.innerHTML = "ERROR GET"
}

var timeout;

save.addEventListener("click", function (e) {
    try {
        var custom_css = input.value.trim();
        chrome.storage.local.set({ custom_css: custom_css });
        status.innerHTML = "SAVED";
        status.classList.add("flash");
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            status.classList.remove("flash");
        }, 500)
    } catch (e) {
        cpnsole.log(e);
        status.innerHTML = "ERROR SAVE";
    }
})