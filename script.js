// Mobile menu toggle functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu');
});

// Booking form navigation
const bookingForm = document.getElementById('booking-form');
const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const progressSteps = document.querySelectorAll('.progress-step');

let currentStep = 0;

function updateFormSteps() {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
}

function updateProgressSteps() {
    progressSteps.forEach((step, index) => {
        step.classList.toggle('active', index <= currentStep);
    });
}

nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            currentStep++;
            updateFormSteps();
            updateProgressSteps();
        }
    });
});

prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentStep--;
        updateFormSteps();
        updateProgressSteps();
    });
});

function validateStep(step) {
    // Basic validation for each step
    const currentStepInputs = formSteps[step].querySelectorAll('input[required], select[required]');
    let isValid = true;

    currentStepInputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Booking...';

    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = 'Booked Successfully!';
        setTimeout(() => {
            bookingForm.reset();
            currentStep = 0;
            updateFormSteps();
            updateProgressSteps();
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Book Now';
            // Show success message
            alert('Your booking has been confirmed! We will contact you shortly.');
        }, 1500);
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
