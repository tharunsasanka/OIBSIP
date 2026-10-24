
"use strict";

// Personal Portfolio — Oasis Infobyte Task 2

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  function closeMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the mobile menu when a navigation link is selected.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Allow keyboard users to close the menu using Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Reset the mobile menu when switching to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      closeMenu();
    }
  });
}
