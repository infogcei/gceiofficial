// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Admission Form Submission
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            
            // Create WhatsApp message
            const whatsappMessage = `🎓 *NEW ADMISSION FORM SUBMISSION* 🎓

*Name:* ${formObject.name}
*Mobile:* ${formObject.mobile}
*Email:* ${formObject.email || 'Not provided'}
*Course:* ${formObject.course}
*Qualification:* ${formObject.qualification || 'Not provided'}
*Batch:* ${formObject.batch || 'Not specified'}
*Message:* ${formObject.message || 'No message'}

*Institute:* Guru Computer Education Institute
*Submission Time:* ${new Date().toLocaleString('hi-IN')}

Please contact the student for further process.`;

            // Encode for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/919244240484?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showNotification('✅ Admission form submitted successfully! Our team will contact you shortly.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email && email.includes('@')) {
                showNotification('✅ Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                showNotification('⚠️ Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Testimonials Auto Scroll
    function initTestimonials() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length > 1) {
            let currentIndex = 0;
            
            setInterval(() => {
                testimonials.forEach((card, index) => {
                    card.style.transform = index === currentIndex 
                        ? 'scale(1.05)' 
                        : 'scale(1)';
                    card.style.boxShadow = index === currentIndex
                        ? '0 10px 30px rgba(0,0,0,0.2)'
                        : '0 2px 10px rgba(0,0,0,0.1)';
                });
                
                currentIndex = (currentIndex + 1) % testimonials.length;
            }, 5000);
        }
    }
    
    initTestimonials();
    
    // Counter Animation
    function initCounters() {
        const counters = document.querySelectorAll('.stat h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('+', ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + '+';
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            // Start counter when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
            
            observer.observe(counter);
        });
    }
    
    initCounters();
    
    // Course Card Hover Effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Notification Function
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#4CAF50' : '#ff9800'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        document.body.appendChild(notification);
    }
    
    // WhatsApp Direct Chat
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn, .whatsapp-float');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('href').includes('wa.me')) {
                e.preventDefault();
                const message = "Hello Guru Computer Institute, I'm interested in your courses. Can you please share more details?";
                const whatsappUrl = `https://wa.me/919244240484?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });
    
    // Load Google Maps
    function loadGoogleMaps() {
        const mapFrame = document.querySelector('.map-container iframe');
        if (mapFrame) {
            // Add loading state
            mapFrame.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    }
    
    loadGoogleMaps();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Lazy Load Images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (!img.src) {
            imageObserver.observe(img);
        }
    });
    
    // Form Validation
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        return isValid;
    }
});

// Export data for other pages
window.instituteData = {
    name: "Guru Computer Education Institute",
    address: "Near Police Station, Dagori Road, Bilha, Bilaspur (C.G.) - 495224",
    phone: "9244240484",
    email: "info.gceiofficial@gmail.com",
    courses: [
        { id: "basic", name: "Basic Computer", duration: "2 Months", fee: "₹3,000" },
        { id: "office", name: "MS Office", duration: "3 Months", fee: "₹4,500" },
        { id: "tally", name: "Tally Prime GST", duration: "3 Months", fee: "₹5,000" },
        { id: "dca", name: "DCA Course", duration: "6 Months", fee: "₹8,000" },
        { id: "pgdca", name: "PGDCA Course", duration: "1 Year", fee: "₹12,000" },
        { id: "typing", name: "Typing", duration: "1 Month", fee: "₹2,000" },
        { id: "photoshop", name: "Photoshop", duration: "2 Months", fee: "₹4,000" },
        { id: "canva", name: "Canva Design", duration: "1 Month", fee: "₹3,000" },
        { id: "ai", name: "AI ChatGPT", duration: "1 Month", fee: "₹3,500" },
        { id: "ccc", name: "CCC Course", duration: "2 Months", fee: "₹3,500" },
        { id: "internet", name: "Internet & Email", duration: "1 Month", fee: "₹2,500" }
    ],
    social: {
        facebook: "https://www.facebook.com/gceiofficial/",
        instagram: "https://www.instagram.com/gceiofficial/",
        youtube: "https://www.youtube.com/channel/UCebEVcrSsWWxWr2qVGRLk6w",
        whatsapp: "https://wa.me/919244240484",
        location: "https://maps.app.goo.gl/sYdLaS4EFBz9a4go6",
        justdial: "https://jsdl.in/DT-99QYUEQ2AEE"
    }
};