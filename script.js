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

// Position modal setup
document.addEventListener('DOMContentLoaded', function() {
    // Modal event listeners
    const positionModal = document.getElementById('positionModal');
    if (positionModal) {
        positionModal.addEventListener('show.bs.modal', function(event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Extract position id
            const positionId = button.getAttribute('data-position-id');
            showPositionDetails(positionId);
        });
    }
    
    // Position info buttons
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
});

// Navigation between steps
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

// Form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
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
    
    fetch('https://script.google.com/macros/s/AKfycbze0bXgTF4eSlp9cwwMv78tpU5QQeMvyn1qX1cC8JPxmEv9boxPy6z5kr8ahilTIdhI/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading overlay
        document.getElementById('loadingOverlay').classList.remove('show');
        
        if (data.success) {
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('registrationForm').style.display = 'none';
            document.querySelector('.step-pills').style.display = 'none';
            
            // Scroll to success message
            document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show error message
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('errorMessage').scrollIntoView({ behavior: 'smooth' });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Hide loading overlay
        document.getElementById('loadingOverlay').classList.remove('show');
        // Show error message
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').scrollIntoView({ behavior: 'smooth' });
    });
});