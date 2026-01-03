window.addEventListener('DOMContentLoaded', event => {

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

    // Scrollspy 
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

    // Tattoo Styles Reveal
    document.addEventListener("scroll", () => {
        document.querySelectorAll('.tattoo-style').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * .85) {
                el.classList.add('visible');
            }
        });
    });

    // =====================================
    // FIXED: TEAM MEMBER FADE-IN ANIMATION
    // =====================================

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
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    about.classList.add('visible');
                    observer.unobserve(about);
                }
            });
        }, { threshold: 0.25 });

        observer.observe(about);
    }

});
