// Select all relevant DOM elements for te wizard form
const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const progressSteps = document.querySelectorAll(".progress-step");
const progressStepBtns = document.querySelectorAll(".progress-step-btn");
const form  = document.getElementById("formWizard");

let formStepIndex = 0;

// Validate required fields in the current step
function validateStep(stepIdx) {
        const step = document.querySelectorAll(".form-step")[stepIdx];
        const requiredInputs = step.querySelectorAll("input[required]");
        let Valid = true;
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = "#f44336"; // highlight empty fields
                Valid = false;
            } else {
                input.style.borderColor = "";
                }
        });

    // Show error message if not valid
    let errorDiv = step.querySelector("#form-error");
    if (!Valid) {
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.id = "form-error";
            errorDiv.textContent = "Please fill out all required fields.";
            errorDiv.style.color = "#f44336";
            errorDiv.style.marginBottom = "10px";
            step.insertBefore(errorDiv, step.firstChild);
        } 
    } else if (errorDiv) {
        errorDiv.remove();
    }
    return Valid;

}

// Handle "Next" button click
nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (validateStep(formStepIndex)) {
            formStepIndex++;
            updateFormSteps();
            updateProgressbar();
        }
    })    
})

// Handle "Back" button click
prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepIndex--;
        updateFormSteps();
        updateProgressbar();
    })
})

// Allow navigation by clicking progress dots
progressStepBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (validateStep(formStepIndex)) {
            const step = parseInt(btn.getAttribute("data-step"));
            formStepIndex = step;
            updateFormSteps();
            updateProgressbar();
        }
    })
})

// Validate before submitting the form
form.addEventListener("submit", function(e) {
    if (!validateStep(formStepIndex)) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
})

// Show the correct step in the form
function updateFormSteps() {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === formStepIndex);
    });
}

// Update the progress bar and dots
function updateProgressbar() {
    progressSteps.forEach((step, index) => {
        if (index <= formStepIndex) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });

    progress.style.width =
    ((formStepIndex) / (progressSteps.length - 1)) * 100 + "%";

    // Initial display of the first step
    updateFormSteps()
};