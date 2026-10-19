
// ---------- DARK / LIGHT THEME ----------

const themeButton = document.getElementById("theme-btn");

function setTheme(isLight) {
    document.body.classList.toggle("light-mode", isLight);

    themeButton.textContent = isLight ? "🌙" : "☀️";

    themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    try {
        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );
    } catch (error) {
        // The theme still works if localStorage is unavailable.
    }
}

let savedTheme = "dark";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "dark";
} catch (error) {
    // Use dark mode as the default.
}

setTheme(savedTheme === "light");

themeButton.addEventListener("click", () => {
    const isCurrentlyLight =
        document.body.classList.contains("light-mode");

    setTheme(!isCurrentlyLight);
});


// ---------- MOBILE NAVIGATION ----------

const menuButton = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    });
});


// ---------- PROJECT MODALS ----------

const projectDetails = {
    portfolio: {
        title: "Personal Portfolio",
        description:
            "A responsive personal website built with HTML, CSS, " +
            "and JavaScript. It showcases my skills, projects, " +
            "and contact details."
    },

    weather: {
        title: "Weather App",
        description:
            "A weather application concept featuring a clear " +
            "interface for current conditions. You can extend " +
            "it by connecting a real weather API."
    },

    tasks: {
        title: "Task Manager",
        description:
            "A productivity app concept for organizing daily tasks. " +
            "You can extend it with add, edit, delete, and save features."
    }
};

const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription =
    document.getElementById("modal-description");

document.querySelectorAll(".project-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const project = projectDetails[button.dataset.project];

        if (!project) return;

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        modal.showModal();
    });
});

document.getElementById("close-modal").addEventListener("click", () => {
    modal.close();
});

document.getElementById("modal-ok").addEventListener("click", () => {
    modal.close();
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    }
});


// ---------- COPYRIGHT YEAR ----------

document.getElementById("year").textContent =
    new Date().getFullYear();
