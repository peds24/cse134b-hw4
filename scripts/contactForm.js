document.addEventListener('DOMContentLoaded', () => {
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const formError = document.getElementById("form-error"); 
    const form_errors = [];

    fullname.addEventListener("input", () => {
        const name_pattern = /^[A-Za-z ]*$/;

        if (!name_pattern.test(fullname.value)) {
            fullname.value = fullname.value.replace(/[^A-Za-z ]/g, '');

            fullname.setCustomValidity("Full name can only contain alphabetic characters.");
            formError.textContent = "Full name can only contain alphabetic characters.";
            formError.classList.add("error", "flash");

            form_errors.push({
                field: "fullname",
                message: "Full name can only contain alphabetic characters.",
                type: "validation"
            });
        } else {
            fullname.setCustomValidity("");
            formError.textContent = "";
            formError.classList.remove("error", "flash");
        }
    });

    const email_pattern = /^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;
    email.addEventListener("input", () => {
        if (!email_pattern.test(email.value)) {
            // Mask out any invalid characters
            email.value = email.value.replace(/[^a-zA-Z0-9._%+-@.]/g, '');

            email.setCustomValidity("Please enter a valid email address.");
            formError.textContent = "Please enter a valid email address.";
            formError.classList.add("error", "flash");

            form_errors.push({
                field: "email",
                message: "Please enter a valid email address.",
                type: "validation"
            });
        } else {
            email.setCustomValidity("");
            formError.textContent = "";
            formError.classList.remove("error", "flash");
        }
    });

    const textarea = document.getElementById('comments');
    const maxLength = textarea.getAttribute('maxlength');
    const info = document.getElementById('form-info')

    textarea.addEventListener('input', (event) => {
        const remaining = maxLength - textarea.value.length;
        info.textContent = `${remaining} characters remaining`;

        if (remaining <= 50 && remaining > 0){
            info.style.color = 'yellow';
            formError.textContent = '';
            formError.classList.remove("error", "flash");
        }
        else if (remaining == 0){
            info.style.color = 'red';
            formError.textContent = 'Character limit reached!';
            formError.classList.add("error", "flash");

        } else {
            info.style.color = 'white'; 
            formError.textContent = '';
            formError.classList.remove("error", "flash");
        }
    });

    document.getElementById("contact-form").addEventListener("submit", (event) => {
        // event.preventDefault();
        if (form_errors.length > 0) {
            formErrorsInput.value = JSON.stringify(form_errors); 
            console.log("Form errors to submit: ", formErrorsInput.value);
        } else {
            formErrorsInput.value = "";
            console.log("No errors, form can be submitted.");
        }

        form.submit();

    });
});

