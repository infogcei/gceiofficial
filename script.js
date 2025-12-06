// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Guru Computer Institute Website Loaded Successfully!');
    
    // Initialize all functions
    initNavbar();
    initMobileMenu();
    initBackToTop();
    initCourseFilters();
    initGallery();
    initTestimonialSlider();
    initContactForm();
    initSmoothScroll();
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
});

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Course Filtering Functionality
function initCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide course cards based on filter
            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Course Modal Functions
function openCourseModal(courseType) {
    const modal = document.getElementById('courseModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Course data
    const courseData = {
        'basic': {
            title: 'Basic Computer Course',
            desc: 'Learn computer fundamentals from scratch. Perfect for beginners.',
            duration: '2 Months',
            fees: '₹3,000',
            syllabus: ['Computer Basics', 'Windows OS', 'Typing', 'Internet', 'Email', 'File Management', 'Software Installation'],
            career: ['Data Entry Operator', 'Computer Operator', 'Office Assistant', 'Receptionist']
        },
        'office': {
            title: 'MS Office Complete',
            desc: 'Master Microsoft Office suite for professional work.',
            duration: '3 Months',
            fees: '₹4,500',
            syllabus: ['MS Word Advanced', 'MS Excel Formulas', 'MS PowerPoint', 'MS Access', 'Mail Merge', 'Data Analysis'],
            career: ['Office Executive', 'Data Analyst', 'Admin Assistant', 'Corporate Jobs']
        },
        'tally': {
            title: 'Tally Prime GST',
            desc: 'Complete accounting with GST implementation.',
            duration: '3 Months',
            fees: '₹5,000',
            syllabus: ['Accounting Basics', 'GST Filing', 'Inventory Management', 'Payroll', 'Tax Calculation', 'Final Accounts'],
            career: ['Accountant', 'GST Consultant', 'Tax Consultant', 'Audit Assistant']
        },
        'dca': {
            title: 'DCA Course',
            desc: 'Diploma in Computer Applications - All-in-one course.',
            duration: '6 Months',
            fees: '₹8,000',
            syllabus: ['Computer Fundamentals', 'MS Office', 'Tally', 'Internet', 'Basic Programming', 'Web Design Basics'],
            career: ['Computer Operator', 'Office Assistant', 'Bank Clerk', 'Data Entry Operator']
        },
        'photoshop': {
            title: 'Adobe Photoshop',
            desc: 'Professional graphic design and photo editing.',
            duration: '2 Months',
            fees: '₹4,000',
            syllabus: ['Photo Editing', 'Layers & Masking', 'Color Correction', 'Typography', 'Digital Painting', 'Web Graphics'],
            career: ['Graphic Designer', 'Photo Editor', 'UI Designer', 'Freelancer']
        },
        'ai': {
            title: 'AI ChatGPT Course',
            desc: 'Artificial Intelligence and Prompt Engineering.',
            duration: '1 Month',
            fees: '₹3,500',
            syllabus: ['AI Basics', 'ChatGPT Usage', 'Prompt Engineering', 'Content Creation', 'AI Tools', 'Future of AI'],
            career: ['AI Prompt Engineer', 'Content Creator', 'Digital Marketer', 'Tech Consultant']
        }
    };
    
    const course = courseData[courseType];
    
    if (course) {
        modalContent.innerHTML = `
            <div class="modal-header" style="background: linear-gradient(135deg, #00695c 0%, #004d40 100%); color: white; padding: 25px; border-radius: 20px 20px 0 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="margin: 0; font-size: 1.5rem;">${course.title}</h2>
                    <button onclick="closeCourseModal()" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <p style="margin: 10px 0 0; opacity: 0.9;">${course.desc}</p>
            </div>
            
            <div style="padding: 25px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 10px;">
                        <div style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Duration</div>
                        <div style="font-weight: 600; color: #004d40; font-size: 1.1rem;">${course.duration}</div>
                    </div>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 10px;">
                        <div style="color: #666; font-size: 0.9rem; margin-bottom: 5px;">Course Fees</div>
                        <div style="font-weight: 600; color: #004d40; font-size: 1.1rem;">${course.fees}</div>
                    </div>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #004d40; margin-bottom: 15px; font-size: 1.2rem;">
                        <i class="fas fa-list-alt"></i> Syllabus
                    </h3>
                    <ul style="padding-left: 20px;">
                        ${course.syllabus.map(item => `<li style="margin-bottom: 8px; color: #555; padding-left: 5px;">${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #004d40; margin-bottom: 15px; font-size: 1.2rem;">
                        <i class="fas fa-briefcase"></i> Career Opportunities
                    </h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${course.career.map(job => `
                            <span style="background: #e0f2f1; color: #00695c; padding: 8px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">
                                ${job}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 15px; margin-top: 30px;">
                    <a href="https://infogcei.github.io/gceiofficial.admission/" 
                       class="btn btn-whatsapp" target="_blank" style="flex: 1; text-align: center;">
                        <i class="fas fa-file-alt"></i> Enroll Now
                    </a>
                    <button onclick="closeCourseModal()" class="btn" style="flex: 1;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Gallery Functions
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const caption = this.querySelector('.gallery-caption h4').textContent;
            const description = this.querySelector('.gallery-caption p').textContent;
            openLightbox(caption, description);
        });
    });
}

function openLightbox(title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxBody = document.querySelector('.lightbox-body');
    
    lightboxBody.innerHTML = `
        <div class="lightbox-img">
            <i class="fas fa-image"></i>
        </div>
        <h3>${title}</h3>
        <p>${description}</p>
        <div style="margin-top: 30px;">
            <p style="color: #999; font-size: 0.9rem;">
                <i class="fas fa-info-circle"></i>
                Actual photos coming soon! We're updating our gallery.
            </p>
        </div>
    `;
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function viewMoreGallery() {
    alert('More photos will be added soon! Currently updating our gallery.');
}

// Testimonials Slider
let currentTestimonial = 0;
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length > 0) {
        // Auto slide every 5 seconds
        setInterval(() => {
            nextTestimonial();
        }, 5000);
    }
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Hide all testimonials
    testimonials.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    currentTestimonial = index;
}

function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    showTestimonial(index);
}

// Contact Form Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = form.querySelector('input[type="text"]').value;
            const mobile = form.querySelector('input[type="tel"]').value;
            const course = form.querySelector('select').value;
            const message = form.querySelector('textarea').value;
            
            // Create WhatsApp message
            const whatsappMessage = `📞 *CONTACT FORM - GURU COMPUTER INSTITUTE* 📞

*Name:* ${name}
*Mobile:* ${mobile}
*Course:* ${course}
*Message:* ${message}

*Institute:* Guru Computer Education Institute
*Location:* Bilha, Bilaspur (C.G.)
*Submission Time:* ${new Date().toLocaleString('hi-IN')}`;

            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/919244240484?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            form.reset();
            
            // Show success message
            alert('✅ Message sent successfully!\n\nWe have received your query and will contact you soon.');
        });
    }
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const courseModal = document.getElementById('courseModal');
    if (event.target === courseModal) {
        closeCourseModal();
    }
    
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCourseModal();
        closeLightbox();
    }
});
// WhatsApp Widget Functions
function toggleWhatsAppWidget() {
    const widgetBody = document.getElementById('widgetBody');
    const widgetArrow = document.getElementById('widgetArrow');
    
    widgetBody.classList.toggle('open');
    widgetArrow.classList.toggle('fa-chevron-down');
    widgetArrow.classList.toggle('fa-chevron-up');
}

function openWhatsApp(type) {
    let message = '';
    
    switch(type) {
        case 'admission':
            message = "Hello! I'm interested in admission at Guru Computer Institute. Please share the admission process, eligibility, and required documents.";
            break;
        case 'fees':
            message = "Hello! I want to know about the fee structure for courses at Guru Computer Institute. Please share course-wise fees and payment options.";
            break;
        case 'demo':
            message = "Hello! I want to book a free demo class at Guru Computer Institute. Please suggest available time slots and procedure.";
            break;
        case 'general':
        default:
            message = "Hello! I have a query about Guru Computer Institute. Please provide more information.";
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919244240484?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Show Message Function
function showMessage(text, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${text}
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

// Batch Timing Banner
function initBatchBanner() {
    // Check if banner was closed before
    if (localStorage.getItem('batchBannerClosed') === 'true') {
        return;
    }
    
    const banner = document.createElement('div');
    banner.className = 'batch-banner';
    banner.innerHTML = `
        <div class="container">
            <div class="batch-banner-content">
                <i class="fas fa-clock"></i>
                <span>🎯 New Batches Starting Soon:</span>
                <span class="batch-timing">Morning 9AM | Evening 4PM | Weekend 10AM</span>
                <button class="close-banner" onclick="closeBatchBanner()">&times;</button>
            </div>
        </div>
    `;
    
    document.body.insertBefore(banner, document.body.firstChild);
    
    // Adjust body padding
    document.body.style.paddingTop = '50px';
}

function closeBatchBanner() {
    const banner = document.querySelector('.batch-banner');
    if (banner) {
        banner.style.transition = 'transform 0.5s ease';
        banner.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            if (banner.parentNode) {
                banner.remove();
            }
            document.body.style.paddingTop = '0';
        }, 500);
        
        // Remember user closed the banner
        localStorage.setItem('batchBannerClosed', 'true');
    }
}

// Privacy Policy Modal
function openPrivacyPolicy() {
    const modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.id = 'privacyModal';
    modal.innerHTML = `
        <div class="privacy-content">
            <div class="privacy-header">
                <button class="close-privacy" onclick="closePrivacyModal()">&times;</button>
                <h3>Privacy Policy</h3>
                <p>Guru Computer Education Institute</p>
            </div>
            <div class="privacy-body">
                <h4>Information We Collect</h4>
                <p>We collect information that you provide directly to us when you:</p>
                <ul>
                    <li>Fill out admission forms</li>
                    <li>Contact us via phone, email, or WhatsApp</li>
                    <li>Register for courses or demo classes</li>
                    <li>Visit our institute</li>
                </ul>
                
                <h4>How We Use Your Information</h4>
                <ul>
                    <li>To process admissions and registrations</li>
                    <li>To communicate with you about courses and updates</li>
                    <li>To provide customer support</li>
                    <li>To improve our services</li>
                </ul>
                
                <h4>Data Security</h4>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
                
                <h4>Contact Us</h4>
                <p>For any privacy-related questions, contact us at:<br>
                Email: info.gceiofficial@gmail.com<br>
                Phone: 92442 40484</p>
                
                <button class="btn" onclick="closePrivacyModal()" style="margin-top: 20px; width: 100%;">
                    I Understand
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
}

// Initialize on Page Load
function initPageFeatures() {
    initScrollProgress();
    initBatchBanner();
    
    // Add privacy policy link to footer
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const privacyLink = document.createElement('a');
        privacyLink.href = '#';
        privacyLink.className = 'policy-link';
        privacyLink.innerHTML = 'Privacy Policy';
        privacyLink.onclick = function(e) {
            e.preventDefault();
            openPrivacyPolicy();
        };
        
        copyright.innerHTML = copyright.innerHTML.replace('All rights reserved.', 
            `All rights reserved. <span class="separator">|</span> `);
        copyright.appendChild(privacyLink);
    }
    
    // Add loading animation to buttons
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = `<span class="loading"></span> Processing...`;
            this.disabled = true;
            
            // Revert after 3 seconds
            setTimeout(() => {
                this.innerHTML = this.innerHTML.replace('<span class="loading"></span> Processing...', 
                    this.getAttribute('data-original') || 'Submit');
                this.disabled = false;
            }, 3000);
        });
    });
    
    // Save original button text
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.setAttribute('data-original', button.innerHTML);
    });
}

// Update DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Guru Computer Institute Website Loaded Successfully!');
    
    // Initialize all functions
    initNavbar();
    initMobileMenu();
    initBackToTop();
    initCourseFilters();
    initGallery();
    initTestimonialSlider();
    initContactForm();
    initSmoothScroll();
    initPageFeatures();
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Show welcome message
    setTimeout(() => {
        showMessage('Welcome to Guru Computer Education Institute!', 'info');
    }, 1000);
});