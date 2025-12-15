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

// Service data for modal
const serviceData = {
    'kitchen-cabinets': {
        title: 'Kitchen Cabinets',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Transform your kitchen with our custom-designed cabinets that perfectly blend functionality with timeless elegance. Each cabinet is meticulously crafted using premium materials and precision joinery techniques, ensuring durability that will last for generations.',
        features: [
            'Custom measurements and design',
            'Premium hardwood construction',
            'Soft-close hinges and drawer slides',
            'Multiple finish options',
            'Interior organization systems',
            'Lifetime craftsmanship warranty'
        ],
        process: [
            'Initial consultation and space assessment',
            'Custom design and 3D visualization',
            'Material selection and approval',
            'Precision crafting in our workshop',
            'Professional installation and finishing'
        ]
    },
    'wall-wardrobes': {
        title: 'Wall Wardrobes',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Maximize your bedroom storage with our bespoke wall wardrobes. Designed to complement your interior aesthetic while providing optimal organization for your clothing and accessories.',
        features: [
            'Floor-to-ceiling design options',
            'Custom interior configurations',
            'Sliding or hinged door systems',
            'LED lighting integration',
            'Shoe racks and accessory compartments',
            'Mirror and glass panel options'
        ],
        process: [
            'Bedroom measurement and planning',
            'Storage needs assessment',
            'Design proposal and material selection',
            'Workshop construction and assembly',
            'Installation and final adjustments'
        ]
    },
    'custom-beds': {
        title: 'Custom Beds',
        image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Create the perfect centerpiece for your bedroom with our handcrafted custom beds. From sleek modern platforms to elegant traditional designs, each bed is built to your exact specifications.',
        features: [
            'Solid hardwood construction',
            'Custom headboard designs',
            'Under-bed storage options',
            'Multiple size configurations',
            'Hand-finished surfaces',
            'Matching furniture pieces available'
        ],
        process: [
            'Style consultation and preference discussion',
            'Size and storage requirement planning',
            'Design sketches and material selection',
            'Handcrafting with traditional techniques',
            'Delivery and bedroom setup'
        ]
    },
    'bookshelves': {
        title: 'Bookshelves',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Showcase your literary collection with our elegant bookshelf solutions. From floating shelves to floor-to-ceiling libraries, we create storage that enhances your space.',
        features: [
            'Adjustable shelf configurations',
            'Built-in or freestanding options',
            'Hidden bracket mounting systems',
            'Custom wood species selection',
            'Reading nook integration',
            'Display lighting options'
        ],
        process: [
            'Space analysis and book collection assessment',
            'Shelf layout and design planning',
            'Wood selection and finish approval',
            'Precision cutting and assembly',
            'Installation and shelf adjustment'
        ]
    },
    'shoe-stands': {
        title: 'Shoe Stands',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Keep your entryway organized with our custom shoe storage solutions. Designed for both functionality and aesthetics, our shoe stands complement your home\'s style.',
        features: [
            'Ventilated design for air circulation',
            'Multiple tier configurations',
            'Compact space-saving design',
            'Easy-access angled shelves',
            'Durable moisture-resistant finish',
            'Umbrella and accessory storage'
        ],
        process: [
            'Entryway space measurement',
            'Shoe collection and usage assessment',
            'Design optimization for your needs',
            'Construction with ventilation features',
            'Installation and organization setup'
        ]
    },
    'tv-stands': {
        title: 'TV Stands',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Modern entertainment centers that seamlessly blend technology with craftsmanship. Our TV stands provide elegant storage while managing cables and components.',
        features: [
            'Cable management systems',
            'Component storage compartments',
            'Custom sizing for any TV',
            'Ventilation for electronics',
            'Remote-friendly glass doors',
            'Wall-mount or floor-standing options'
        ],
        process: [
            'Entertainment setup evaluation',
            'TV and component measurements',
            'Cable management planning',
            'Custom construction and finishing',
            'Installation and cable organization'
        ]
    },
    'wine-shelves': {
        title: 'Wine Shelves',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Elegant wine storage that displays your collection while maintaining optimal storage conditions. From small displays to full wine room installations.',
        features: [
            'Temperature-conscious design',
            'Secure bottle positioning',
            'Display and storage combination',
            'Cork-friendly humidity considerations',
            'Label-forward arrangement',
            'Expandable modular systems'
        ],
        process: [
            'Collection size and space planning',
            'Storage condition requirements',
            'Display preference consultation',
            'Climate-appropriate construction',
            'Installation and collection organization'
        ]
    },
    'custom-doors': {
        title: 'Custom Doors',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Make a lasting impression with our handcrafted custom doors. From grand entrance doors to elegant interior panels, each door is uniquely designed and expertly crafted.',
        features: [
            'Solid wood construction',
            'Custom hardware selection',
            'Weather sealing for exterior doors',
            'Glass panel and sidelight options',
            'Traditional and modern designs',
            'Professional hanging and adjustment'
        ],
        process: [
            'Opening measurement and assessment',
            'Style and material consultation',
            'Hardware and finish selection',
            'Precision crafting and fitting',
            'Installation and final adjustments'
        ]
    }
};

// Modal functionality
const modal = document.getElementById('serviceModal');
const closeBtn = document.querySelector('.close');

// Open modal when service card is clicked
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceType = card.getAttribute('data-service');
        const service = serviceData[serviceType];
        
        if (service) {
            document.getElementById('modalTitle').textContent = service.title;
            document.getElementById('modalImage').src = service.image;
            document.getElementById('modalDescription').textContent = service.description;
            
            // Populate features
            const featuresList = document.getElementById('modalFeatures');
            featuresList.innerHTML = '';
            service.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            // Populate process
            const processList = document.getElementById('modalProcess');
            processList.innerHTML = '';
            service.process.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                processList.appendChild(li);
            });
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
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

// Stagger animations for service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
