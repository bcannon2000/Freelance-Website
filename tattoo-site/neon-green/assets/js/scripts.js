document.addEventListener("DOMContentLoaded", () => {
    // NAVBAR
    const navbar = document.querySelector('#mainNav');

    const navbarShrink = () => {
        if (!navbar) return;
        if (window.scrollY === 0) {
            navbar.classList.remove('navbar-shrink');
        } else {
            navbar.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // ScrollSpy
    if (navbar) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Mobile Menu
    const menu = document.querySelector('#navbarResponsive');
    const toggler = document.querySelector('.navbar-toggler');

    if (menu && toggler) {
        menu.addEventListener('show.bs.collapse', () => {
            navbar.classList.add('menu-open');
        });

        menu.addEventListener('hide.bs.collapse', () => {
            navbar.classList.remove('menu-open');
        });
    }

    window.addEventListener('resize', () => {
        bootstrap.ScrollSpy.getInstance(document.body)?.refresh();
    });

    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('#navbarResponsive .nav-link')
                .forEach(n => n.classList.remove('active'));
            link.classList.add('active');
        });
    });

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('#mainNav');
    const menu = document.querySelector('#navbarResponsive');

    // When menu fully opens
    menu.addEventListener('shown.bs.collapse', () => {
        navbar.classList.add('menu-open');
    });

    // When menu begins closing
    menu.addEventListener('hide.bs.collapse', () => {
        // Keep background until animation is done
        navbar.classList.add('menu-open');
    });

    // When menu fully finishes closing
    menu.addEventListener('hidden.bs.collapse', () => {
        navbar.classList.remove('menu-open');
    });
});

    // SCROLL REVEAL FOR STYLE BLOCKS
    document.addEventListener("scroll", () => {
        document.querySelectorAll('.tattoo-style').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * .85) {
                el.classList.add('visible');
            }
        });
    });

    // TEAM MEMBER FADE-IN
    const members = document.querySelectorAll(".team-member");

    if (members.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("appear");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        members.forEach(m => observer.observe(m));
    }

    // ABOUT SECTION SCROLL REVEAL
    const about = document.querySelector('.about-wrapper');
    if (about) {
        const aboutObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    about.classList.add('visible');
                    aboutObserver.unobserve(about);
                }
            });
        }, { threshold: 0.25 });

        aboutObserver.observe(about);
    }


    // PORTFOLIO MODAL
    document.querySelectorAll(".portfolio-modal").forEach(modal => {

        modal.addEventListener("shown.bs.modal", () => {
            // Reinitialize ALL carousels inside that modal
            const carousels = modal.querySelectorAll(".carousel");
            carousels.forEach(c => {
                bootstrap.Carousel.getOrCreateInstance(c, {
                    ride: false,
                    interval: 5000,
                    pause: "hover"
                });
            });
        });

        modal.addEventListener("hidden.bs.modal", () => {
            // Reset everything when modal closes
            const carousels = modal.querySelectorAll(".carousel");
            carousels.forEach(c => {
                const instance = bootstrap.Carousel.getInstance(c);
                if (instance) instance.pause();

                c.querySelectorAll(".carousel-item").forEach((item, i) => {
                    item.classList.toggle("active", i === 0);
                });

                c.style.transform = "";
            });
        });
    });

    document.addEventListener("click", e => {
        const ctrl = e.target.closest("[data-bs-slide]");
        if (!ctrl) return;

        const targetSelector = ctrl.getAttribute("data-bs-target");
        const carousel = document.querySelector(targetSelector);
        if (!carousel) return;

        const instance = bootstrap.Carousel.getOrCreateInstance(carousel);

        if (ctrl.getAttribute("data-bs-slide") === "prev") {
            instance.prev();
        } else {
            instance.next();
        }

        e.preventDefault();
    });

});
