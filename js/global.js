const hamburgerMenu = document.querySelector("#hamburgerMenu");
const nav = document.querySelector("nav");
function toggleMenu() {
  if (nav.className === "mobileNav") {
    nav.className = "";
  } else {
    nav.className = "mobileNav";
  }
}

hamburgerMenu.addEventListener("click", toggleMenu);
