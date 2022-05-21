const hamburger: HTMLElement = document.querySelector(`[data-js="hamburger"]`);
const mobileNavigationDiv: HTMLElement = document.querySelector(`[data-js="navigation"]`);

hamburger.addEventListener("click", () => {
    if (hamburger.dataset.status == "open") {
        exitMenu();
        // mobileScroller.removeEventListener("click", exitMenu);
    } else {
        openMenu();
        // mobileScroller.addEventListener("click", exitMenu);
    }
});

function exitMenu() {
    hamburger.dataset.status = "closed";
    hamburger.classList.remove("open");
    mobileNavigationDiv.classList.remove("mobile-navigation--visible");
}

function openMenu() {
    hamburger.dataset.status = "open";
    hamburger.classList.add("open");
    mobileNavigationDiv.classList.add("mobile-navigation--visible");
}