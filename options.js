const reset = document.querySelector("#reset");
const modules = document.querySelector("#modules");

reset.addEventListener("click", function (e) {
    try {
        chrome.storage.local.set({ custom_css: null });
        status.textContent = "RESET";
        status.classList.add("red");
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            status.classList.remove("green", "yellow", "red");
        }, 500)
    } catch (e) {
        console.log(e);
        status.textContent = "SAVE ERROR";
    }
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
        toggle.onclick = function (e) {
            var index = storage_custom_css.findIndex(e => e.id === custom_css.id);
            storage_custom_css[index]["enabled"] = !custom_css["enabled"];
            chrome.storage.local.set({ custom_css: storage_custom_css });
        }
        var remove = document.createElement("button");
        remove.textContent = "REMOVE";
        remove.className = "reset";
        remove.onclick = function (e) {
            var index = storage_custom_css.findIndex(e => e.id === custom_css.id);
            storage_custom_css.splice(index, 1);
            chrome.storage.local.set({ custom_css: storage_custom_css });
        }
        container_bottom.insertAdjacentElement("beforeend", toggle);
        container_bottom.insertAdjacentElement("beforeend", remove);
        container_bottom.className = "module_bottom";
        container.insertAdjacentElement("beforeend", container_bottom);
        container.classList.add("module");
        modules.insertAdjacentElement('beforeend', container);
    }
});