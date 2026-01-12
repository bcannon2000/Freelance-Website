/* NAVBAR SHRINK ON SCROLL */
window.addEventListener("scroll", function () {
    const nav = document.getElementById("mainNav");
    if (window.scrollY > 10) {
        nav.classList.add("navbar-shrink");
    } else {
        nav.classList.remove("navbar-shrink");
    }
});


/* MAIN INITIALIZATION */
document.addEventListener("DOMContentLoaded", () => {

    /* 
    THEME TOGGLE (Light / Dark / Neutral / Special)
       - Saves preference in localStorage
       - Applies theme instantly on load 
    */

    const themeClasses = ["theme-dark", "theme-light", "theme-neutral", "theme-special"];
    const defaultTheme = "theme-light";
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("site-theme") || defaultTheme;
    html.classList.add(savedTheme);

    const toggleBtn = document.getElementById("themeToggle");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {

            let current = themeClasses.find(t => html.classList.contains(t));
            let index = themeClasses.indexOf(current);

            // Next theme
            let next = themeClasses[(index + 1) % themeClasses.length];

            // Replace class
            html.classList.remove(...themeClasses);
            html.classList.add(next);

            // Save preference
            localStorage.setItem("site-theme", next);

            toggleBtn.textContent = next.replace("theme-", "").toUpperCase();
        });
    }


    /* TESTIMONIAL SLIDER */

    const track = document.querySelector(".testimonial-track");
    const testimonials = document.querySelectorAll(".testimonial");
    const wrapper = document.querySelector(".testimonial-wrapper");

    let index = 0;
    const delay = 4000;
    let interval = null;

    if (testimonials.length > 0) {
        testimonials[0].classList.add("active");
    }

    /* Auto slides */
    function rotate() {
        testimonials[index].classList.remove("active");
        index = (index + 1) % testimonials.length;
        testimonials[index].classList.add("active");
        track.style.transform = `translateX(-${index * 100}%)`;
        adjustHeight();
    }

    function startRotation() {
        interval = setInterval(rotate, delay);
    }

    function stopRotation() {
        clearInterval(interval);
    }

    if (wrapper) startRotation();


    /* Pause on hover */
    if (wrapper) {
        wrapper.addEventListener("mouseenter", stopRotation);
        wrapper.addEventListener("mouseleave", startRotation);
    }


    /* Swipe support */
    let startX = 0;

    wrapper?.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        stopRotation();
    });

    wrapper?.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        const delta = startX - endX;

        testimonials[index].classList.remove("active");

        if (Math.abs(delta) > 50) {
            if (delta > 0) index = (index + 1) % testimonials.length;
            else index = (index - 1 + testimonials.length) % testimonials.length;
        }

        testimonials[index].classList.add("active");
        track.style.transform = `translateX(-${index * 100}%)`;

        adjustHeight();
        startRotation();
    });
    document.querySelector('.navbar-toggler').addEventListener('click', () => {
        const target = document.getElementById('navbarSupportedContent');
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(target);
        bsCollapse.toggle();
    });


    /* Auto height */
    function adjustHeight() {
        if (wrapper && testimonials.length > 0) {
            wrapper.style.height = testimonials[index].offsetHeight + "px";
        }
    }
    

    window.addEventListener("resize", adjustHeight);
    adjustHeight();
});
