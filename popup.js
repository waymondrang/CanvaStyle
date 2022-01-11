const save = document.querySelector("#save");
const status = document.querySelector("#status");
const input = document.querySelector("textarea");
const usage = document.querySelector("#usage");
const module = document.querySelector("#module");

var storage_custom_css;
var timeout;

function uuid_v4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

chrome.storage.onChanged.addListener(function (changes, area) {
    if (Object.keys(changes).includes("custom_css")) {
        storage_custom_css = changes["custom_css"]["newValue"] || [];
        usage.textContent = `(${changes["custom_css"]["newValue"] ? changes["custom_css"]["newValue"].length : "NONE"} IMPORTED)`
        status.innerHTML = "UPDATED";
        document.dispatchEvent(new CustomEvent("loaded_custom_css", { detail: storage_custom_css }));
        status.classList.add("yellow");
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            status.classList.remove("green", "yellow", "red");
        }, 500)
    }
});

try {
    chrome.storage.local.get(["custom_css"], function (data) {
        storage_custom_css = data.custom_css || [];
        usage.textContent = `(${storage_custom_css.length ? storage_custom_css.length : "NONE"} IMPORTED)`
        status.innerHTML = "READY";
        document.dispatchEvent(new CustomEvent("loaded_custom_css", { detail: storage_custom_css }));
    })
} catch (e) {
    console.log(e);
    status.textContent = "GET ERROR"
}

save.addEventListener("click", function (e) {
    try {
        if (!(module.value.trim()) || !(input.value.trim())) {
            return;
        }
        var custom_css = input.value.trim();
        storage_custom_css.push({ "id": uuid_v4(), "module_name": module.value.trim(), "custom_css": custom_css, "created": new Date(), "enabled": true })
        chrome.storage.local.set({ custom_css: storage_custom_css });
        module.value = "";
        input.value = "";
        status.textContent = "SAVED";
        status.classList.add("yellow");
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            status.classList.remove("green", "yellow", "red");
        }, 500);
    } catch (e) {
        console.log(e);
        status.textContent = "SAVE ERROR";
    }
})