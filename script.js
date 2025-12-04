// Guru Computer Education Institute - Professional Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu-large');
    
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
        if (!event.target.closest('.main-nav-large') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-menu-large a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu-large a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Courses Tab Filtering
    const tabBtns = document.querySelectorAll('.tab-btn-large');
    const courseCards = document.querySelectorAll('.course-card-large');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.getAttribute('data-tab');
            
            // Show/hide courses based on filter
            courseCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card-large');
    const navDots = document.querySelectorAll('.nav-dot-large');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        navDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    // Auto rotate testimonials
    setInterval(() => {
        let nextIndex = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextIndex);
    }, 6000);
    
    // Dot click handlers
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(prevIndex);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(nextIndex);
        });
    }
    
    // Quick Admission Form Submission
    const quickAdmissionForm = document.getElementById('quickAdmissionForm');
    if (quickAdmissionForm) {
        quickAdmissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            
            // Validate mobile number
            const mobile = formObject.mobile.replace(/\D/g, '');
            if (mobile.length !== 10) {
                showNotification('Please enter a valid 10-digit mobile number', 'error');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `🎓 *QUICK ADMISSION ENQUIRY - GURU COMPUTER INSTITUTE* 🎓

*Name:* ${formObject.name}
*Mobile:* ${formObject.mobile}
*Course Interest:* ${formObject.course}
*Preferred Batch:* ${formObject.batch || 'Not specified'}
*Message:* ${formObject.message || 'No message'}

*Institute:* Guru Computer Education Institute
*Location:* Bilha, Bilaspur (C.G.)
*Submission Time:* ${new Date().toLocaleString('hi-IN')}

Please contact this student for admission counselling.`;

            // Encode for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/919244240484?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showNotification('✅ Admission enquiry submitted successfully! We will contact you within 24 hours.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Modal Management
    const modals = document.querySelectorAll('.modal-overlay');
    const closeModalBtns = document.querySelectorAll('.close-modal-large');
    
    // Close modal function
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Open modal function
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Close modal when clicking X or outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('close-modal-large')) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Course Details Data
    const coursesData = {
        'tally': {
            title: 'Tally Prime GST',
            description: 'Complete accounting course with Tally Prime and GST implementation. Learn business accounting, inventory management, tax filing, and financial reporting. This course includes practical training on real business scenarios.',
            duration: '3 Months',
            fees: '₹5,000',
            features: [
                'Basic to Advanced Accounting Concepts',
                'GST Implementation & Monthly Filing',
                'Inventory Management & Billing',
                'Payroll Processing & Salary Management',
                'Tax Calculation (TDS, TCS, Income Tax)',
                'Financial Reports (Balance Sheet, P&L)',
                'Live Project Work on Actual Data',
                '100% Placement Assistance & Interview Preparation'
            ],
            career: ['Accountant', 'GST Consultant', 'Audit Assistant', 'Tax Consultant', 'Financial Analyst', 'Billing Executive'],
            syllabus: [
                'Introduction to Accounting & Tally',
                'Company Creation & Configuration',
                'Ledger Creation & Voucher Entry',
                'Inventory Management',
                'GST Implementation',
                'Tax Deducted at Source (TDS)',
                'Payroll Management',
                'Final Accounts & Reports'
            ]
        },
        'dca': {
            title: 'DCA Course (Diploma in Computer Applications)',
            description: 'One-year comprehensive program covering all essential computer applications and software. Perfect for students who want complete computer knowledge for government and private sector jobs.',
            duration: '6 Months',
            fees: '₹8,000',
            features: [
                'Computer Fundamentals & Windows OS',
                'MS Office Complete (Word, Excel, PowerPoint, Access)',
                'Internet & Email Operations',
                'Tally with GST Accounting',
                'Basic Programming Concepts',
                'Web Designing Basics (HTML, CSS)',
                'Multimedia & Graphics',
                'Project Work & Viva Voce'
            ],
            career: ['Computer Operator', 'Office Assistant', 'Data Entry Operator', 'Receptionist', 'Bank Clerk', 'Government Jobs'],
            syllabus: [
                'Computer Fundamentals',
                'Windows Operating System',
                'MS Office Applications',
                'Internet & Email',
                'Tally Accounting',
                'Basic Programming',
                'Web Designing',
                'Project Work'
            ]
        },
        'basic': {
            title: 'Basic Computer Course',
            description: 'Perfect course for absolute beginners, housewives, senior citizens, and school students. Learn computer fundamentals from scratch in simple Hindi/English language.',
            duration: '2 Months',
            fees: '₹3,000',
            features: [
                'Computer Fundamentals & Types',
                'Windows Operating System',
                'Keyboard Typing Skills (English/Hindi)',
                'File & Folder Management',
                'Basic Software Installation',
                'Internet Basics & Web Browsing',
                'Email Creation & Usage',
                'Basic Troubleshooting & Maintenance'
            ],
            career: ['Computer Operator', 'Data Entry', 'Receptionist', 'Office Assistant', 'Home User', 'School Student'],
            syllabus: [
                'Introduction to Computers',
                'Windows Basics',
                'Typing Practice',
                'File Management',
                'Word Processing',
                'Internet Basics',
                'Email Communication',
                'Practical Exercises'
            ]
        },
        'office': {
            title: 'MS Office Complete',
            description: 'Master Microsoft Office suite including Word, Excel, PowerPoint, and Access for professional office work, corporate jobs, and government sector employment.',
            duration: '3 Months',
            fees: '₹4,500',
            features: [
                'MS Word: Advanced Document Creation',
                'MS Excel: Formulas, Functions, Data Analysis',
                'PowerPoint: Professional Presentations',
                'Access: Database Management',
                'Mail Merge & Automation',
                'Data Analysis with Pivot Tables',
                'Professional Report Writing',
                'Project Work & Certification'
            ],
            career: ['Office Executive', 'Data Analyst', 'Administrative Assistant', 'Executive Assistant', 'Corporate Jobs', 'Government Clerk'],
            syllabus: [
                'MS Word Advanced',
                'MS Excel Formulas',
                'Data Analysis',
                'PowerPoint Presentations',
                'Access Database',
                'Mail Merge',
                'Advanced Features',
                'Project Work'
            ]
        },
        'ai': {
            title: 'AI ChatGPT Course',
            description: 'Learn Artificial Intelligence, ChatGPT, and prompt engineering for content creation, coding, research, and business applications. Future-proof your skills.',
            duration: '1 Month',
            fees: '₹3,500',
            features: [
                'Introduction to Artificial Intelligence',
                'ChatGPT Mastery & Advanced Usage',
                'Prompt Engineering Techniques',
                'Content Creation with AI',
                'AI for Coding & Development',
                'Business Applications of AI',
                'Ethics in Artificial Intelligence',
                'Future Technologies & Trends'
            ],
            career: ['AI Prompt Engineer', 'Content Creator', 'Digital Marketer', 'AI Consultant', 'Tech Enthusiast', 'Freelancer'],
            syllabus: [
                'AI Fundamentals',
                'ChatGPT Basics',
                'Prompt Engineering',
                'Content Creation',
                'Coding with AI',
                'Business Applications',
                'AI Ethics',
                'Future Trends'
            ]
        },
        'photoshop': {
            title: 'Photoshop & Canva Design',
            description: 'Master Adobe Photoshop and Canva for graphic design, photo editing, social media content creation, and freelancing projects.',
            duration: '2 Months',
            fees: '₹4,000',
            features: [
                'Photoshop Interface & Tools',
                'Image Editing & Retouching',
                'Layers & Masking Techniques',
                'Color Correction & Adjustment',
                'Typography & Text Effects',
                'Canva Design Mastery',
                'Social Media Graphics',
                'Portfolio Creation'
            ],
            career: ['Graphic Designer', 'Photo Editor', 'UI Designer', 'Social Media Designer', 'Freelancer', 'Digital Marketer'],
            syllabus: [
                'Photoshop Basics',
                'Image Editing',
                'Advanced Techniques',
                'Canva Introduction',
                'Design Principles',
                'Social Media Graphics',
                'Portfolio Building',
                'Project Work'
            ]
        }
    };
    
    // Show Course Details Modal
    window.showCourseDetails = function(courseId) {
        const course = coursesData[courseId];
        if (!course) return;
        
        const modalTitle = document.getElementById('modalCourseTitle');
        const modalBody = document.getElementById('modalCourseBody');
        
        modalTitle.textContent = course.title;
        modalBody.innerHTML = `
            <div class="course-detail-modal">
                <div class="course-summary">
                    <div class="summary-item">
                        <i class="far fa-clock"></i>
                        <div>
                            <h5>Duration</h5>
                            <p>${course.duration}</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-rupee-sign"></i>
                        <div>
                            <h5>Course Fees</h5>
                            <p>${course.fees}</p>
                        </div>
                    </div>
                    <div class="summary-item">
                        <i class="fas fa-certificate"></i>
                        <div>
                            <h5>Certificate</h5>
                            <p>Government Approved</p>
                        </div>
                    </div>
                </div>
                
                <div class="course-description-section">
                    <h4><i class="fas fa-info-circle"></i> Course Description</h4>
                    <p>${course.description}</p>
                </div>
                
                <div class="course-syllabus">
                    <h4><i class="fas fa-book"></i> Course Syllabus</h4>
                    <div class="syllabus-list">
                        ${course.syllabus.map((topic, index) => `
                            <div class="syllabus-item">
                                <span class="syllabus-number">${index + 1}</span>
                                <span class="syllabus-topic">${topic}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="course-features-section">
                    <h4><i class="fas fa-check-circle"></i> What You Will Learn</h4>
                    <div class="features-list">
                        ${course.features.map(feature => `
                            <div class="feature-item">
                                <i class="fas fa-check"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="career-opportunities">
                    <h4><i class="fas fa-briefcase"></i> Career Opportunities</h4>
                    <div class="career-tags">
                        ${course.career.map(job => `<span class="career-tag">${job}</span>`).join('')}
                    </div>
                </div>
                
                <div class="course-actions-modal">
                    <button class="btn-primary-modal" onclick="enrollCourse('${course.title}')">
                        <i class="fas fa-file-alt"></i> Enroll Now - ${course.fees}
                    </button>
                    <button class="btn-secondary-modal" onclick="window.location.hash='admission'; closeModal('courseModal');">
                        <i class="fas fa-calendar-alt"></i> Book Free Demo Class
                    </button>
                    <button class="btn-whatsapp-modal" onclick="whatsappCourseQuery('${course.title}')">
                        <i class="fab fa-whatsapp"></i> WhatsApp for Details
                    </button>
                </div>
            </div>
        `;
        
        openModal('courseModal');
    };
    
    // Show All Courses with Fee Structure
    window.showAllCourses = function() {
        const modalTitle = document.getElementById('modalCourseTitle');
        const modalBody = document.getElementById('modalCourseBody');
        
        modalTitle.textContent = 'All Courses with Complete Fee Structure';
        modalBody.innerHTML = `
            <div class="all-courses-modal">
                <div class="fee-structure-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Duration</th>
                                <th>Fees</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Basic Computer</td>
                                <td>2 Months</td>
                                <td>₹3,000</td>
                                <td><button class="btn-small" onclick="showCourseDetails('basic')">Details</button></td>
                            </tr>
                            <tr>
                                <td>MS Office</td>
                                <td>3 Months</td>
                                <td>₹4,500</td>
                                <td><button class="btn-small" onclick="showCourseDetails('office')">Details</button></td>
                            </tr>
                            <tr>
                                <td>Tally Prime GST</td>
                                <td>3 Months</td>
                                <td>₹5,000</td>
                                <td><button class="btn-small" onclick="showCourseDetails('tally')">Details</button></td>
                            </tr>
                            <tr>
                                <td>DCA Course</td>
                                <td>6 Months</td>
                                <td>₹8,000</td>
                                <td><button class="btn-small" onclick="showCourseDetails('dca')">Details</button></td>
                            </tr>
                            <tr>
                                <td>PGDCA Course</td>
                                <td>1 Year</td>
                                <td>₹12,000</td>
                                <td><button class="btn-small" onclick="enrollCourse('PGDCA Course')">Enroll</button></td>
                            </tr>
                            <tr>
                                <td>Typing (Eng/Hindi)</td>
                                <td>1 Month</td>
                                <td>₹2,000</td>
                                <td><button class="btn-small" onclick="enrollCourse('Typing')">Enroll</button></td>
                            </tr>
                            <tr>
                                <td>Photoshop & Canva</td>
                                <td>2 Months</td>
                                <td>₹4,000</td>
                                <td><button class="btn-small" onclick="showCourseDetails('photoshop')">Details</button></td>
                            </tr>
                            <tr>
                                <td>AI ChatGPT</td>
                                <td>1 Month</td>
                                <td>₹3,500</td>
                                <td><button class="btn-small" onclick="showCourseDetails('ai')">Details</button></td>
                            </tr>
                            <tr>
                                <td>CCC Course</td>
                                <td>2 Months</td>
                                <td>₹3,500</td>
                                <td><button class="btn-small" onclick="enrollCourse('CCC Course')">Enroll</button></td>
                            </tr>
                            <tr>
                                <td>Internet & Email</td>
                                <td>1 Month</td>
                                <td>₹2,500</td>
                                <td><button class="btn-small" onclick="enrollCourse('Internet & Email')">Enroll</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="special-offers-modal">
                    <h4><i class="fas fa-gift"></i> Special Offers & Discounts</h4>
                    <div class="offers-list">
                        <div class="offer-item">
                            <i class="fas fa-percentage"></i>
                            <div>
                                <h5>15% Discount</h5>
                                <p>On admission this week for all courses</p>
                            </div>
                        </div>
                        <div class="offer-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <h5>Group Discount</h5>
                                <p>Extra 10% off for 3+ students enrolling together</p>
                            </div>
                        </div>
                        <div class="offer-item">
                            <i class="fas fa-wallet"></i>
                            <div>
                                <h5>Installment Facility</h5>
                                <p>Pay fees in 2-3 installments (no extra charges)</p>
                            </div>
                        </div>
                        <div class="offer-item">
                            <i class="fas fa-book"></i>
                            <div>
                                <h5>Free Study Material</h5>
                                <p>All study material and software provided free</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-primary-modal" onclick="closeModal('courseModal'); window.location.hash='admission';">
                        <i class="fas fa-file-alt"></i> Apply for Admission
                    </button>
                    <a href="https://infogcei.github.io/gceiofficial.admission/" 
                       target="_blank" 
                       class="btn-secondary-modal">
                        <i class="fas fa-external-link-alt"></i> Detailed Admission Form
                    </a>
                </div>
            </div>
        `;
        
        openModal('courseModal');
    };
    
    // Show Fee Structure Modal
    window.showFeeStructure = function() {
        openModal('feeModal');
        document.getElementById('modalCourseTitle').textContent = 'Complete Fee Structure';
        document.getElementById('modalCourseBody').innerHTML = `
            <div class="fee-structure-content">
                ${document.querySelector('.all-courses-modal').innerHTML}
            </div>
        `;
    };
    
    // Enroll Course Function
    window.enrollCourse = function(courseName) {
        const message = `I want to enroll in ${courseName} course at Guru Computer Education Institute, Bilha. Please share admission process, fee details, and batch availability.`;
        const whatsappUrl = `https://wa.me/919244240484?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closeModal('courseModal');
    };
    
    // WhatsApp Course Query
    window.whatsappCourseQuery = function(courseName) {
        const message = `I have query about ${courseName} course at Guru Computer Institute. Please share: syllabus, duration, fees, career opportunities, and batch timings.`;
        const whatsappUrl = `https://wa.me/919244240484?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closeModal('courseModal');
    };
    
    // Notification System
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existing = document.querySelector('.custom-notification');
        if (existing) existing.remove();
        
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
            top: 120px;
            right: 30px;
            background: ${type === 'success' ? '#4CAF50' : '#ff9800'};
            color: white;
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            z-index: 9999;
            animation: slideIn 0.4s ease;
            max-width: 400px;
            font-size: 15px;
            font-weight: 500;
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                transition: all 0.3s;
            }
            .notification-close:hover {
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        });
        
        // Auto remove after 6 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.4s ease';
                setTimeout(() => notification.remove(), 400);
            }
        }, 6000);
        
        document.body.appendChild(notification);
    }
    
    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-large h3');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', ''));
            let current = 0;
            const increment = target / 60;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.floor(current) + '+';
                    setTimeout(updateCounter, 30);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
        
        animated = true;
    }
    
    // Start animation when stats are in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats-large');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Add CSS for modal content
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .course-detail-modal {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        
        .course-summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .summary-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: var(--light-bg);
            border-radius: var(--radius);
        }
        
        .summary-item i {
            font-size: 24px;
            color: var(--primary);
        }
        
        .summary-item h5 {
            color: var(--text-light);
            font-size: 14px;
            margin-bottom: 5px;
        }
        
        .summary-item p {
            color: var(--primary-dark);
            font-size: 18px;
            font-weight: 700;
        }
        
        .course-description-section h4,
        .course-syllabus h4,
        .course-features-section h4,
        .career-opportunities h4 {
            color: var(--primary-dark);
            margin-bottom: 15px;
            font-size: 20px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .course-description-section p {
            color: var(--text);
            line-height: 1.6;
            font-size: 15px;
        }
        
        .syllabus-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .syllabus-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: var(--light-bg);
            border-radius: var(--radius);
        }
        
        .syllabus-number {
            width: 30px;
            height: 30px;
            background: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            flex-shrink: 0;
        }
        
        .syllabus-topic {
            color: var(--text);
            font-size: 14px;
            font-weight: 500;
        }
        
        .features-list {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
        }
        
        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        
        .feature-item i {
            color: var(--accent);
            margin-top: 3px;
            font-size: 16px;
            flex-shrink: 0;
        }
        
        .feature-item span {
            color: var(--text);
            font-size: 14px;
            line-height: 1.5;
        }
        
        .career-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .career-tag {
            background: var(--light-bg);
            color: var(--primary);
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
        }
        
        .course-actions-modal {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        .btn-primary-modal,
        .btn-secondary-modal,
        .btn-whatsapp-modal {
            flex: 1;
            padding: 15px;
            border-radius: var(--radius);
            border: none;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s;
        }
        
        .btn-primary-modal {
            background: var(--primary);
            color: white;
        }
        
        .btn-secondary-modal {
            background: var(--light-bg);
            color: var(--primary);
            border: 2px solid var(--primary);
        }
        
        .btn-whatsapp-modal {
            background: #25D366;
            color: white;
        }
        
        .btn-primary-modal:hover,
        .btn-secondary-modal:hover,
        .btn-whatsapp-modal:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow);
        }
        
        .all-courses-modal {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        
        .fee-structure-table {
            overflow-x: auto;
        }
        
        .fee-structure-table table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .fee-structure-table th {
            background: var(--light-bg);
            padding: 15px;
            text-align: left;
            color: var(--primary-dark);
            font-weight: 700;
            border-bottom: 2px solid var(--primary);
        }
        
        .fee-structure-table td {
            padding: 15px;
            border-bottom: 1px solid var(--border);
            color: var(--text);
        }
        
        .btn-small {
            padding: 8px 15px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-small:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }
        
        .special-offers-modal h4 {
            color: var(--primary-dark);
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .offers-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .offer-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: var(--light-bg);
            border-radius: var(--radius);
        }
        
        .offer-item i {
            font-size: 24px;
            color: var(--secondary);
        }
        
        .offer-item h5 {
            color: var(--primary-dark);
            margin-bottom: 5px;
            font-size: 16px;
            font-weight: 700;
        }
        
        .offer-item p {
            color: var(--text-light);
            font-size: 14px;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
        }
        
        @media (max-width: 768px) {
            .course-summary,
            .syllabus-list,
            .offers-list {
                grid-template-columns: 1fr;
            }
            
            .course-actions-modal,
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Initialize
    console.log('🎓 Guru Computer Education Institute - Professional Website Loaded Successfully!');
    console.log('🏫 Institute: Guru Computer Education Institute, Bilha, Bilaspur');
    console.log('📞 Contact: 92442 40484 | info.gceiofficial@gmail.com');
    console.log('🌐 Website: https://gurucomputerbilha.com');
});