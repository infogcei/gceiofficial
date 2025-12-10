// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    const spans = mobileToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
}

// WhatsApp Form Submission
function initWhatsAppForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject')?.value || '';
            const message = document.getElementById('message').value;
            
            // Validation
            if (!name || !mobile || !message) {
                alert('Please fill all required fields (Name, Mobile, Message)');
                return;
            }
            
            if (!/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `📞 *CONTACT FORM SUBMISSION* 📞

*Name:* ${name}
*Mobile:* ${mobile}
*Email:* ${email || 'Not provided'}
*Subject:* ${subject}
*Message:* ${message}

*Institute:* Guru Computer Education Institute
*Location:* Bilha, Bilaspur (C.G.)
*Time:* ${new Date().toLocaleString('hi-IN')}`;
            
            sendWhatsAppMessage(whatsappMessage, 'contact');
        });
    }
    
    // Admission Form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const course = document.getElementById('course').value;
            const qualification = document.getElementById('qualification')?.value || '';
            const batch = document.getElementById('batch')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            // Validation
            if (!name || !mobile || !course) {
                alert('Please fill all required fields (Name, Mobile, Course)');
                return;
            }
            
            if (!/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `🎓 *ADMISSION FORM SUBMISSION* 🎓

*Name:* ${name}
*Mobile:* ${mobile}
*Email:* ${email || 'Not provided'}
*Course:* ${course}
*Qualification:* ${qualification}
*Batch:* ${batch}
*Message:* ${message}

*Institute:* Guru Computer Education Institute
*Location:* Bilha, Bilaspur (C.G.)
*Submission Time:* ${new Date().toLocaleString('hi-IN')}`;
            
            sendWhatsAppMessage(whatsappMessage, 'admission');
        });
    }
    
    // Course Enrollment
    document.querySelectorAll('.btn-enroll').forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            
            const whatsappMessage = `🎓 *COURSE ENQUIRY* 🎓

*Course:* ${courseTitle}

Hello, I'm interested in ${courseTitle} course. Please share complete details about:
1. Course fees
2. Duration
3. Syllabus
4. Batch timings
5. Certification

Thank you!`;
            
            sendWhatsAppMessage(whatsappMessage, 'course');
        });
    });
}

// Send WhatsApp Message
function sendWhatsAppMessage(message, type) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919244240484?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    let successMessage = 'Thank you! We have opened WhatsApp for you to send the message.';
    if (type === 'admission') {
        successMessage = '✅ Admission form submitted successfully!\n\nYou will be redirected to WhatsApp to complete the process.';
    } else if (type === 'course') {
        successMessage = 'Course enquiry sent! We will contact you with complete details.';
    }
    
    alert(successMessage);
    
    // Reset form if exists
    const form = document.querySelector('form');
    if (form) {
        form.reset();
    }
}

// Set Active Navigation
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initWhatsAppForms();
    setActiveNav();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});