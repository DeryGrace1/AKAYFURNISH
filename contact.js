// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Form validation
const contactForm = document.getElementById('contactForm');
const submitBtn = document.querySelector('.submit-btn');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

// Form field validation rules
const validationRules = {
    firstName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'First name must be at least 2 characters and contain only letters'
    },
    lastName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Last name must be at least 2 characters and contain only letters'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        required: false,
        pattern: /^[\d\s\-\+\(\)]+$/,
        message: 'Please enter a valid phone number'
    },
    message: {
        required: true,
        minLength: 10,
        message: 'Message must be at least 10 characters long'
    }
};

// Validate individual field
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { isValid: true };

    // Check if required field is empty
    if (rules.required && (!value || value.trim() === '')) {
        return {
            isValid: false,
            message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
        };
    }

    // Skip validation if field is not required and empty
    if (!rules.required && (!value || value.trim() === '')) {
        return { isValid: true };
    }

    // Check minimum length
    if (rules.minLength && value.length < rules.minLength) {
        return {
            isValid: false,
            message: rules.message
        };
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
        return {
            isValid: false,
            message: rules.message
        };
    }

    return { isValid: true };
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const fieldGroup = field.parentElement;
    
    field.classList.add('error');
    
    let errorElement = fieldGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        fieldGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Clear field error
function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const fieldGroup = field.parentElement;
    const errorElement = fieldGroup.querySelector('.error-message');
    
    field.classList.remove('error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Real-time validation
Object.keys(validationRules).forEach(fieldName => {
    const field = document.getElementById(fieldName);
    if (field) {
        field.addEventListener('blur', () => {
            const validation = validateField(fieldName, field.value);
            if (!validation.isValid) {
                showFieldError(fieldName, validation.message);
            } else {
                clearFieldError(fieldName);
            }
        });

        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                const validation = validateField(fieldName, field.value);
                if (validation.isValid) {
                    clearFieldError(fieldName);
                }
            }
        });
    }
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isFormValid = true;
    const formData = new FormData(contactForm);
    
    Object.keys(validationRules).forEach(fieldName => {
        const value = formData.get(fieldName);
        const validation = validateField(fieldName, value);
        
        if (!validation.isValid) {
            showFieldError(fieldName, validation.message);
            isFormValid = false;
        } else {
            clearFieldError(fieldName);
        }
    });
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = document.querySelector('.form-group input.error, .form-group textarea.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success modal
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Reset form
        contactForm.reset();
        
        // Track form submission (you can integrate with analytics here)
        console.log('Form submitted successfully:', Object.fromEntries(formData));
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error sending your message. Please try again.');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Modal functionality
closeModalBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.style.display === 'block') {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form field enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Auto-format phone number
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    const messageGroup = messageField.parentElement;
    
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.textAlign = 'right';
        counter.style.fontSize = '0.9rem';
        counter.style.color = '#666';
        counter.style.marginTop = '0.5rem';
        
        const updateCounter = () => {
            const length = messageField.value.length;
            counter.textContent = `${length}/500 characters`;
            if (length > 450) {
                counter.style.color = '#e74c3c';
            } else {
                counter.style.color = '#666';
            }
        };
        
        messageField.addEventListener('input', updateCounter);
        messageField.setAttribute('maxlength', '500');
        messageGroup.appendChild(counter);
        updateCounter();
    }
    
    // Service and budget correlation hints
    const serviceField = document.getElementById('service');
    const budgetField = document.getElementById('budget');
    
    if (serviceField && budgetField) {
        const budgetHints = {
            'kitchen-cabinets': 'Kitchen cabinet projects typically range from $10,000 - $50,000+',
            'wall-wardrobes': 'Wardrobe projects typically range from $5,000 - $25,000',
            'custom-beds': 'Custom bed projects typically range from $3,000 - $15,000',
            'bookshelves': 'Bookshelf projects typically range from $1,000 - $10,000',
            'shoe-stands': 'Shoe stand projects typically range from $500 - $3,000',
            'tv-stands': 'TV stand projects typically range from $2,000 - $8,000',
            'wine-shelves': 'Wine storage projects typically range from $2,000 - $15,000',
            'custom-doors': 'Door projects typically range from $1,500 - $8,000'
        };
        
        serviceField.addEventListener('change', () => {
            const selectedService = serviceField.value;
            const hint = budgetHints[selectedService];
            
            if (hint) {
                let hintElement = budgetField.parentElement.querySelector('.budget-hint');
                if (!hintElement) {
                    hintElement = document.createElement('div');
                    hintElement.className = 'budget-hint';
                    hintElement.style.fontSize = '0.85rem';
                    hintElement.style.color = '#8B4513';
                    hintElement.style.marginTop = '0.5rem';
                    hintElement.style.fontStyle = 'italic';
                    budgetField.parentElement.appendChild(hintElement);
                }
                hintElement.textContent = hint;
            }
        });
    }
});

// Add some interactive enhancements
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(-2px)';
        item.style.boxShadow = 'none';
    });
});
