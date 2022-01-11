// const reset = document.querySelector("#reset");
const modules = document.querySelector("#modules");
const feedback = document.querySelector("#feedback");
const toggle_theme = document.querySelector("#toggle_theme");

feedback.addEventListener("click", function (e) {
    chrome.tabs.create({ url: 'https://github.com/waymondrang/CanvaStyle/issues' });
})

// reset.addEventListener("click", function (e) {
//     try {
//         chrome.storage.local.set({ custom_css: default_modules });
//         status.textContent = "RESET";
//         status.classList.add("red");
//         if (timeout) {
//             clearTimeout(timeout);
//         }
//         timeout = setTimeout(function () {
//             status.classList.remove("green", "yellow", "red");
//         }, 500)
//     } catch (e) {
//         console.log(e);
//         status.textContent = "SAVE ERROR";
//     }
// })

toggle_theme.addEventListener('click', function (e) {
    chrome.storage.local.get(["menu_theme"], function (data) {
        var new_theme;
        if (!data["menu_theme"]) {
            new_theme = "default_light";
        } else {
            new_theme = data["menu_theme"] === "default_dark" ? "default_light" : "default_dark";
        }
        chrome.storage.local.set({ menu_theme: new_theme });
    })
})

document.addEventListener("loaded_custom_css", function (data) {
    modules.innerHTML = "";
    if (!data["detail"] || !data["detail"].length) {
        var container = document.createElement("div");
        container.className = "empty_container"
        var empty = document.createElement("span");
        empty.className = "empty";
        empty.textContent = "NO MODULES";
        container.insertAdjacentElement('beforeend', empty);
        modules.insertAdjacentElement('beforeend', container);
        return;
    }
    for (custom_css of data["detail"]) {
        var container = document.createElement("div");
        var container_top = document.createElement("div");
        var container_left = document.createElement("div");
        var container_right = document.createElement("div");
        var title = document.createElement("p");
        title.textContent = custom_css["module_name"];
        var id = document.createElement("span");
        id.className = "module_id"
        id.textContent = custom_css.id ? custom_css.id : "INVALID ID";
        container_left.insertAdjacentElement('beforeend', title);
        container_left.insertAdjacentElement('beforeend', id);
        container_left.className = "module_left";
        container_top.insertAdjacentElement('beforeend', container_left);
        var status = document.createElement("span");
        status.textContent = Object.keys(custom_css).includes("enabled") ? custom_css["enabled"] ? "ON" : "OFF" : "?";
        status.className = Object.keys(custom_css).includes("enabled") ? custom_css["enabled"] ? "green" : "red" : "yellow";
        container_right.insertAdjacentElement('beforeend', status);
        container_right.className = "module_right";
        container_top.insertAdjacentElement('beforeend', container_right);
        container_top.className = "module_top";
        container.insertAdjacentElement("beforeend", container_top);
        var container_bottom = document.createElement("div");
        var toggle = document.createElement("button");
        toggle.textContent = "TOGGLE";
        toggle.onclick = (function (id) {
            return function () {
                var index = storage_custom_css.findIndex(e => e.id === id);
                storage_custom_css[index]["enabled"] = !storage_custom_css[index]["enabled"];
                chrome.storage.local.set({ custom_css: storage_custom_css });
            }
        })(custom_css.id);
        container_bottom.insertAdjacentElement("beforeend", toggle);
        if (!custom_css["default_module"]) {
            var remove = document.createElement("button");
            remove.textContent = "REMOVE";
            remove.className = "reset";
            remove.setAttribute("module_id", custom_css.id);
            remove.onclick = (function (id) {
                return function () {
                    var index = storage_custom_css.findIndex(e => e.id === id);
                    storage_custom_css.splice(index, 1);
                    chrome.storage.local.set({ custom_css: storage_custom_css });
                }
            })(custom_css.id);
            container_bottom.insertAdjacentElement("beforeend", remove);
        }
        container_bottom.className = "module_bottom";
        container.insertAdjacentElement("beforeend", container_bottom);
        container.classList.add("module");
        modules.insertAdjacentElement('beforeend', container);
    }
});