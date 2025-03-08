document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar-tmp1');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
});
let canSubmit = true; // Variable to check if the form can be submitted

//  localStorage 
const cooldownEndTime = localStorage.getItem("cooldownEndTime");
if (cooldownEndTime && new Date().getTime() < cooldownEndTime) {
    //  disable the submit button and set the canSubmit variable to false
    canSubmit = false;
    const remainingTime = cooldownEndTime - new Date().getTime();
    document.getElementById("sendMessageButton").disabled = true;
    document.getElementById("result").innerHTML = `<span style='color:red;'>Please wait ${Math.ceil(remainingTime / 3600000)} Hours before submitting again.</span>`;
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Check if the form can be submitted
    if (canSubmit) {
        // Send email using EmailJS 1.serviceid 2.templateid service_xqyiy94 template_oabsj4r
        emailjs.send("service_xqyiy94", "template_oabsj4r", {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }).then(function(response) {
            // Show success message
            document.getElementById("result").innerHTML = "<span style='color:green;'>Email sent successfully!</span>";

            // Disable the submit button and set the cooldown timer
            document.getElementById("sendMessageButton").disabled = true;
            canSubmit = false; // Prevent further submissions
            document.getElementById("contactForm").reset();

            // Set the cooldown time (e.g., 1day)
            const cooldownDuration = 86400000; // 1day in milliseconds
            const cooldownEndTime = new Date().getTime() + cooldownDuration;
            localStorage.setItem("cooldownEndTime", cooldownEndTime);

            // Update the button and the message after the cooldown period
            setTimeout(function() {
                document.getElementById("sendMessageButton").disabled = false; // Re-enable the button
                canSubmit = true; // Allow next submission
                localStorage.removeItem("cooldownEndTime"); // Clear cooldown state from localStorage
            }, cooldownDuration);
        }, function(error) {
            // Show error message
            document.getElementById("result").innerHTML = "<span style='color:red;'>Failed to send email. Try again.</span>";
        });
    } else {
        // If form is in cooldown, show message
        document.getElementById("result").innerHTML = "<span style='color:red;'>Please wait before submitting again.</span>";
    }
});