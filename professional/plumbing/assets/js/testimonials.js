document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".testimonial-track");
    const testimonials = document.querySelectorAll(".testimonial");

    let index = 0;
    const delay = 4000;
    let interval = null;

    // Mark first slide active
    testimonials[0].classList.add("active");

    /* -----------------------
       AUTO-ROTATION
    ------------------------ */
    function rotate() {
        testimonials[index].classList.remove("active");

        index = (index + 1) % testimonials.length;

        testimonials[index].classList.add("active");
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function startRotation() {
        interval = setInterval(rotate, delay);
    }

    function stopRotation() {
        clearInterval(interval);
    }

    startRotation();


    /* -----------------------
       PAUSE ON HOVER
    ------------------------ */
    const wrapper = document.querySelector(".testimonial-wrapper");

    wrapper.addEventListener("mouseenter", stopRotation);
    wrapper.addEventListener("mouseleave", startRotation);


    /* -----------------------
       SWIPE SUPPORT (mobile)
    ------------------------ */
    let startX = 0;

    wrapper.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        stopRotation();
    });

    wrapper.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        const delta = startX - endX;

        if (Math.abs(delta) > 50) {
            testimonials[index].classList.remove("active");

            if (delta > 0) {
                // Swipe left (next)
                index = (index + 1) % testimonials.length;
            } else {
                // Swipe right (prev)
                index = (index - 1 + testimonials.length) % testimonials.length;
            }

            testimonials[index].classList.add("active");
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        startRotation();
    });


    /* -----------------------
       AUTO HEIGHT ADJUST
    ------------------------ */
    function adjustHeight() {
        const active = testimonials[index];
        wrapper.style.height = active.offsetHeight + "px";
    }

    window.addEventListener("resize", adjustHeight);
    adjustHeight(); // initial
});
