// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Initialize functions
    initNavbar();
    initMobileMenu();
    initBackToTop();
    initWhatsAppButtons();
    initCourseFilters();
    initSmoothScroll();
});

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
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

// WhatsApp Buttons Handler
function initWhatsAppButtons() {
    // Default WhatsApp message
    const defaultMessage = "Hello! I'm interested in computer courses at Guru Computer Institute. Please share more details.";
    
    // Update all WhatsApp links with message
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        if (!link.href.includes('text=')) {
            const encodedMessage = encodeURIComponent(defaultMessage);
            link.href = `https://wa.me/919244240484?text=${encodedMessage}`;
        }
    });
}

// Course Filtering Functionality
function initCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (filterBtns.length > 0 && courseCards.length > 0) {
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
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
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
            syllabus: ['Computer Basics', 'Windows OS', 'Typing', 'Internet', 'Email'],
            career: ['Data Entry', 'Computer Operator', 'Office Assistant']
        },
        'office': {
            title: 'MS Office Complete',
            desc: 'Master Microsoft Office suite for professional work.',
            duration: '3 Months',
            fees: '₹4,500',
            syllabus: ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Access'],
            career: ['Office Executive', 'Data Analyst', 'Admin Assistant']
        },
        'tally': {
            title: 'Tally Prime GST',
            desc: 'Complete accounting with GST implementation.',
            duration: '3 Months',
            fees: '₹5,000',
            syllabus: ['Accounting', 'GST Filing', 'Inventory', 'Payroll'],
            career: ['Accountant', 'GST Consultant', 'Tax Consultant']
        },
        'dca': {
            title: 'DCA Course',
            desc: 'Diploma in Computer Applications - All-in-one course.',
            duration: '6 Months',
            fees: '₹8,000',
            syllabus: ['Computer Fund.', 'MS Office', 'Tally', 'Internet', 'Basics'],
            career: ['Computer Operator', 'Office Assistant', 'Bank Clerk']
        },
        'photoshop': {
            title: 'Adobe Photoshop',
            desc: 'Professional graphic design and photo editing.',
            duration: '2 Months',
            fees: '₹4,000',
            syllabus: ['Photo Editing', 'Layers', 'Color Correction', 'Design'],
            career: ['Graphic Designer', 'Photo Editor', 'Freelancer']
        },
        'ai': {
            title: 'AI ChatGPT Course',
            desc: 'Artificial Intelligence and Prompt Engineering.',
            duration: '1 Month',
            fees: '₹3,500',
            syllabus: ['AI Basics', 'ChatGPT', 'Prompt Engineering', 'AI Tools'],
            career: ['AI Prompt Engineer', 'Content Creator', 'Digital Marketer']
        }
    };
    
    const course = courseData[courseType];
    
    if (course && modalContent) {
        modalContent.innerHTML = `
            <div class="modal-header" style="background: #00695c; color: white; padding: 25px; border-radius: 20px 20px 0 0;">
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
                        ${course.syllabus.map(item => `<li style="margin-bottom: 8px; color: #555;">${item}</li>`).join('')}
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
                    <a href="https://wa.me/919244240484?text=I want to enroll in ${course.title} course" 
                       class="btn btn-whatsapp" target="_blank" style="flex: 1; text-align: center;">
                        <i class="fab fa-whatsapp"></i> Enroll Now
                    </a>
                    <button onclick="closeCourseModal()" class="btn" style="flex: 1;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showAllCourses() {
    const filterBtn = document.querySelector('[data-filter="all"]');
    if (filterBtn) {
        filterBtn.click();
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('courseModal');
    if (event.target === modal) {
        closeCourseModal();
    }
});