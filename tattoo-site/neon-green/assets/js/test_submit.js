<script>
function fakeSubmit(e) {
    e.preventDefault();

    const success = document.getElementById("submitSuccessMessage");
    const error = document.getElementById("submitErrorMessage");
    const btn = document.getElementById("submitButton");

    // reset messages
    success.classList.add("d-none");
    error.classList.add("d-none");

    btn.disabled = true;
    btn.innerText = "Sending...";

    setTimeout(() => {
        // simulate success
        btn.disabled = false;
        btn.innerText = "Send Message";
        success.classList.remove("d-none");

        // reset form
        document.getElementById("contactForm").reset();
    }, 800);  // fake delay
}
</script>
