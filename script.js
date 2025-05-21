// Position data
const positionData = {
    1: {
        id: 1,
        title: "System & Infrastructure Engineer",
        icon: "fa-server"
    },
    2: {
        id: 2,
        title: "Full-stack Developer",
        icon: "fa-code"
    },
    3: {
        id: 3,
        title: "Documentation & Community Manager",
        icon: "fa-file-alt"
    }
};

// Show position details in modal
function showPositionDetails(positionId) {
    // Hide all position details first
    document.querySelectorAll('.position-details').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show selected position details
    const details = document.getElementById(`position-details-${positionId}`);
    if (details) {
        details.style.display = 'block';
    }
    
    // Update modal title
    const position = positionData[positionId];
    if (position) {
        document.getElementById('positionModalLabel').textContent = `${position.title} - Detail Posisi`;
    }
}

// Select position from modal
document.querySelectorAll('.apply-position').forEach(button => {
    button.addEventListener('click', function() {
        // Get position id from modal
        const positionId = document.querySelector('.position-details[style*="display: block"]').id.split('-').pop();
        const position = positionData[positionId];
        
        if (position) {
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('positionModal'));
            modal.hide();
            
            // Go to form section
            document.querySelector('.card-header').scrollIntoView({ behavior: 'smooth' });
            
            // Move to step 2 if on step 1
            if (document.querySelector('.step-pill[data-step="1"].active')) {
                // Validate step 1 first
                if (validateStep(1)) {
                    // Update steps
                    document.querySelector('.step-content[data-step="1"]').classList.remove('active');
                    document.querySelector('.step-content[data-step="2"]').classList.add('active');
                    
                    document.querySelector('.step-pill[data-step="1"]').classList.remove('active');
                    document.querySelector('.step-pill[data-step="1"]').classList.add('completed');
                    document.querySelector('.step-pill[data-step="2"]').classList.add('active');
                }
            }
            
            // Select the position in step 2
            setTimeout(() => {
                const positionCard = document.querySelector(`.step-content[data-step="2"] .job-card[data-position="${position.title}"]`);
                selectPosition(positionCard);
            }, 300);
        }
    });
});

// Document ready function to ensure all elements are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (tooltipTriggerList.length) {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Setup form event listener
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Position modal setup
    setupModalListeners();
    
    // Setup navigation buttons
    setupNavigationButtons();
    
    // Setup info buttons
    setupInfoButtons();
    
    // Setup position cards in main section
    setupPositionCards();
});

// Setup modal event listeners
function setupModalListeners() {
    const positionModal = document.getElementById('positionModal');
    if (positionModal) {
        positionModal.addEventListener('show.bs.modal', function(event) {
            // Extract position id from the element that triggered the modal
            const button = event.relatedTarget;
            // Only proceed if button exists (to fix TypeError)
            if (button) {
                const positionId = button.getAttribute('data-position-id');
                showPositionDetails(positionId);
            }
        });
    }
}

// Setup info buttons
function setupInfoButtons() {
    document.querySelectorAll('.position-info-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the card click event from firing
            
            const positionId = this.getAttribute('data-position-id');
            const modal = new bootstrap.Modal(document.getElementById('positionModal'));
            
            // Set active position in modal
            showPositionDetails(positionId);
            
            // Show the modal
            modal.show();
        });
    });
}

// Setup navigation buttons
function setupNavigationButtons() {
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-next')) - 1;
            const nextStep = parseInt(this.getAttribute('data-next'));
            
            // Validate current step
            if (!validateStep(currentStep)) {
                return;
            }
            
            // Update steps
            document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.step-content[data-step="${nextStep}"]`).classList.add('active');
            
            document.querySelector(`.step-pill[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.step-pill[data-step="${currentStep}"]`).classList.add('completed');
            document.querySelector(`.step-pill[data-step="${nextStep}"]`).classList.add('active');
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.getAttribute('data-prev')) + 1;
            const prevStep = parseInt(this.getAttribute('data-prev'));
            
            // Update steps
            document.querySelector(`.step-content[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.step-content[data-step="${prevStep}"]`).classList.add('active');
            
            document.querySelector(`.step-pill[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.step-pill[data-step="${prevStep}"]`).classList.remove('completed');
            document.querySelector(`.step-pill[data-step="${prevStep}"]`).classList.add('active');
        });
    });
}

// Setup position cards
function setupPositionCards() {
    document.querySelectorAll('.job-card[data-bs-toggle="modal"]').forEach(card => {
        card.addEventListener('click', function() {
            const positionId = this.getAttribute('data-position-id');
            showPositionDetails(positionId);
        });
    });
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateStep(3)) {
        return;
    }
    
    // Show loading overlay
    document.getElementById('loadingOverlay').classList.add('show');
    
    // Collect form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Call the web app using form submission to avoid CORS issues
    // PENTING: Ganti DEPLOY_ID dengan ID deployment dari Google Apps Script Anda
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxVdK4PITl_u6PWfdI4-5DQQPasbbVihdx_pOuntpcn2pbEJaqthEANy4DRRh7GiZM2/exec';
    
    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = scriptURL;
    
    // Add all form data as hidden inputs
    Object.keys(data).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    });
    
    // Create an iframe to handle the response
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.id = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Set up event listener for iframe load
    iframe.addEventListener('load', function() {
        // Hide loading overlay after a short delay
        setTimeout(function() {
            document.getElementById('loadingOverlay').classList.remove('show');
            
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('registrationForm').style.display = 'none';
            document.querySelector('.step-pills').style.display = 'none';
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
            
            // Remove the iframe after we're done
            setTimeout(function() {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 1000);
        }, 1500);
    });
    
    // Set the target to our hidden iframe
    form.target = 'hidden_iframe';
    
    // Add form to document
    document.body.appendChild(form);
    
    // Submit the form
    form.submit();
    
    // Remove the form
    setTimeout(function() {
        if (document.body.contains(form)) {
            document.body.removeChild(form);
        }
    }, 500);
}

// Validate each step
function validateStep(step) {
    const stepContent = document.querySelector(`.step-content[data-step="${step}"]`);
    const requiredFields = stepContent.querySelectorAll('[required]');
    
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    // Special validation for position selection in step 2
    if (step === 2) {
        const positionField = document.getElementById('position');
        if (!positionField.value) {
            document.querySelectorAll('.job-select-card').forEach(card => {
                card.classList.add('border-danger');
            });
            isValid = false;
        } else {
            document.querySelectorAll('.job-select-card').forEach(card => {
                card.classList.remove('border-danger');
            });
        }
    }
    
    return isValid;
}

// Position selection
function selectPosition(element) {
    if (!element) return; // Guard clause to prevent errors
    
    // Remove selected class from all cards
    document.querySelectorAll('.job-select-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    element.classList.add('selected');
    
    // Set hidden input value
    document.getElementById('position').value = element.getAttribute('data-position');
}

// Click event for job cards on info section
document.querySelectorAll('.job-card[data-bs-toggle="modal"]').forEach(card => {
    card.addEventListener('click', function() {
        const positionId = this.getAttribute('data-position-id');
        showPositionDetails(positionId);
    });
});