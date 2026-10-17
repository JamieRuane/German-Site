const sidebar = document.querySelector(".sidebar");
const menuToggle = document.querySelector(".menu-toggle");
const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
const toast = document.querySelector(".toast");
let toastTimeout;

function showMessage(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

function setSidebarOpen(isOpen) {
  sidebar.classList.toggle("is-open", isOpen);
  sidebarBackdrop.classList.toggle("is-visible", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
}

menuToggle.addEventListener("click", () => {
  setSidebarOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

sidebarBackdrop.addEventListener("click", () => setSidebarOpen(false));

document.querySelectorAll(".nav-link:not(.is-active)").forEach((link) => {
  link.addEventListener("click", () => {
    const section = link.dataset.section;
    showMessage(`${section} is part of the WortWise learning plan, but isn't available yet.`);
    setSidebarOpen(false);
  });
});

document.querySelectorAll("[data-activity]").forEach((button) => {
  button.addEventListener("click", () => {
    showMessage(`${button.dataset.activity} is a preview. Learning activities aren't available yet.`);
  });
});

document.querySelector(".notification-button").addEventListener("click", () => {
  showMessage("You're all caught up — no new notifications.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
    setSidebarOpen(false);
    menuToggle.focus();
  }
});
