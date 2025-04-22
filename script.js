// Mobile menu toggle functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu');
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
});

// Booking form navigation
const bookingForm = document.getElementById('booking-form');
const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const progressSteps = document.querySelectorAll('.progress-step');

let currentStep = 0;

function showValidationError(input, message) {
    let errorElem = input.nextElementSibling;
    if (!errorElem || !errorElem.classList.contains('validation-error')) {
        errorElem = document.createElement('p');
        errorElem.className = 'validation-error text-red-600 text-sm mt-1';
        input.parentNode.insertBefore(errorElem, input.nextSibling);
    }
    errorElem.textContent = message;
    input.setAttribute('aria-invalid', 'true');
}

function clearValidationError(input) {
    let errorElem = input.nextElementSibling;
    if (errorElem && errorElem.classList.contains('validation-error')) {
        errorElem.textContent = '';
    }
    input.removeAttribute('aria-invalid');
}

function validateStep(step) {
    // Basic validation for each step
    const currentStepInputs = formSteps[step].querySelectorAll('input[required], select[required]');
    let isValid = true;

    currentStepInputs.forEach(input => {
        clearValidationError(input);
        if (!input.value.trim()) {
            showValidationError(input, 'This field is required.');
            isValid = false;
        } else {
            clearValidationError(input);
        }
    });

    return isValid;
}

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

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(bookingForm);
    const service = formData.get('service');
    const duration = formData.get('duration');
    const date = formData.get('date');
    const time = formData.get('time');
    const people = formData.get('people');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const street = formData.get('street');
    const apartment = formData.get('apartment');
    const city = formData.get('city');
    const state = formData.get('state');
    const zip = formData.get('zip');
    const country = formData.get('country');
    const cardName = formData.get('cardName');
    const cardNumber = formData.get('cardNumber');
    const expiry = formData.get('expiry');
    const cvv = formData.get('cvv');

    // Update booking summary dynamically
    const bookingSummary = document.getElementById('booking-summary');
    if (bookingSummary) {
        // Service and price block
        const serviceNameElem = bookingSummary.querySelector('div.border-b > div.flex > span.text-gray-700.font-medium');
        const servicePriceElem = bookingSummary.querySelector('div.border-b > div.flex > span.text-gray-900.font-medium');
        const durationElem = bookingSummary.querySelector('div.border-b > div.text-sm.text-gray-600.mb-2');
        const dateTimeElem = bookingSummary.querySelector('div.border-b > div.text-sm.text-gray-600:nth-of-type(2)');

        if (serviceNameElem) serviceNameElem.textContent = service || 'Selected Service';
        // Price mapping
        const priceMap = {
            'Swedish Massage': 85,
            'Deep Tissue Massage': 95,
            'Hot Stone Massage': 110,
            'Aromatherapy Massage': 95,
            'Prenatal Massage': 90,
            'Couples Massage': 180
        };
        const price = priceMap[service] || 0;
        if (servicePriceElem) servicePriceElem.textContent = `$${price.toFixed(2)}`;
        if (durationElem) durationElem.textContent = duration || '';
        if (dateTimeElem) dateTimeElem.textContent = `${date || ''} at ${time || ''}`;

        // Pricing summary
        const subtotalElem = bookingSummary.querySelector('div.border-b:nth-of-type(2) > div.flex > span.text-gray-900');
        const taxElem = bookingSummary.querySelector('div.border-b:nth-of-type(2) > div.flex:nth-of-type(2) > span.text-gray-900');
        const totalElem = bookingSummary.querySelector('div.flex.justify-between.items-center.mb-6 > span.text-primary.text-xl.font-bold');

        if (subtotalElem) subtotalElem.textContent = `$${price.toFixed(2)}`;
        const tax = price * 0.08; // 8% tax
        if (taxElem) taxElem.textContent = `$${tax.toFixed(2)}`;
        if (totalElem) totalElem.textContent = `$${(price + tax).toFixed(2)}`;
    }

    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Booking...';

    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = 'Booked Successfully!';
        setTimeout(() => {
            // Hide the booking form container
            bookingForm.style.display = 'none';
            // Show the order summary
            bookingSummary.classList.remove('hidden');
            bookingSummary.scrollIntoView({ behavior: 'smooth' });
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
