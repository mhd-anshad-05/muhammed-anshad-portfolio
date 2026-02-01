// Real Cloud Infrastructure Projects
const projects = [
  {
    id: 1,
    title: "Highly Available Web Application on AWS",
    description: "Multi-AZ deployment using EC2, ALB, Auto Scaling, and RDS.",
    icon: "fa-network-wired",
    tags: ["AWS", "EC2", "ALB", "Auto Scaling", "RDS"],
    details: "Designed and deployed a highly available web application architecture on AWS with load balancing, auto scaling, and secure database placement in private subnets. Implemented health checks, multi-AZ redundancy, and automated failover mechanisms."
  },
  {
    id: 2,
    title: "AWS EC2 Management Using CLI",
    description: "Provisioned and managed EC2 instances using AWS CLI.",
    icon: "fa-terminal",
    tags: ["AWS CLI", "EC2", "IAM", "Linux"],
    details: "Managed complete EC2 lifecycle using AWS CLI including key pair generation, security group configuration, SSH access setup, instance provisioning, and automated resource cleanup. Developed shell scripts for common administrative tasks."
  },
  {
    id: 3,
    title: "Website Deployment with Database on AWS Linux",
    description: "Hosted PHP-based web application with Nginx and MySQL.",
    icon: "fa-server",
    tags: ["AWS", "Linux", "Nginx", "MySQL", "SSL"],
    details: "Deployed a production database-driven web application on AWS EC2 using Linux, Nginx web server, MySQL database, SSL certificate configuration, and custom domain setup with Route 53. Implemented security best practices and performance optimization."
  },
  {
    id: 4,
    title: "Static Website Hosting on AWS S3",
    description: "Serverless static website using Amazon S3.",
    icon: "fa-cloud",
    tags: ["AWS S3", "Static Hosting", "CloudFront"],
    details: "Hosted a static website using AWS S3 with public access policies, static website hosting configuration, and CloudFront CDN integration for global content delivery. Configured custom domain and SSL certificates."
  },
  {
    id: 5,
    title: "Windows Server Active Directory Setup",
    description: "Configured domain controller and user management.",
    icon: "fa-windows",
    tags: ["Windows Server", "Active Directory", "Group Policy"],
    details: "Installed and configured Windows Server with Active Directory Domain Services. Set up domain controller, organizational units, user and group management, Group Policy Objects, and network authentication services for enterprise environment."
  }
];

// Documentation/PDF files - Add your actual PDF filenames here
const documentation = [
  {
    id: 1,
    title: "Resume",
    description: "Professional CV",
    icon: "fa-file-pdf",
    filename: "resume.pdf"
  },
  {
    id: 2,
    title: "Highly Available Web Application on AWS",
    description: "Multi-AZ deployment with screenshots",
    icon: "fa-network-wired",
    filename: "highly-available-web-app.pdf"
  },
  {
    id: 3,
    title: "AWS EC2 Management Using CLI",
    description: "Step-by-step CLI guide",
    icon: "fa-terminal",
    filename: "ec2-cli-management.pdf"
  },
  {
    id: 4,
    title: "Website Deployment with Database",
    description: "Nginx + MySQL setup guide",
    icon: "fa-server",
    filename: "website-database-deployment.pdf"
  },
  {
    id: 5,
    title: "Static Website Hosting on S3",
    description: "S3 hosting configuration",
    icon: "fa-cloud",
    filename: "s3-static-hosting.pdf"
  }
];

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadDocumentation();
    initTheme();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initServerMonitoring();
    setCurrentYear();
});

// Simple Server Monitoring
function initServerMonitoring() {
    const startTime = Date.now();
    let requestCount = parseInt(localStorage.getItem('requestCount') || '0') + 1;
    localStorage.setItem('requestCount', requestCount.toString());
    
    function updateServerStats() {
        const uptime = Date.now() - startTime;
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
        
        const uptimeString = days > 0 ? `${days}d ${hours}h ${minutes}m` : 
                           hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        
        // Update any server stats displays
        const serverStatusElements = document.querySelectorAll('#server-status');
        serverStatusElements.forEach(el => {
            el.textContent = 'Online';
            el.style.color = 'var(--success)';
        });
        
        // You can add more stats here if needed
        console.log(`Server Stats - Uptime: ${uptimeString}, Requests: ${requestCount}`);
    }
    
    updateServerStats();
    setInterval(updateServerStats, 60000); // Update every minute
}

// Load Projects
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map(project => `
        <div class="project-card" onclick="showProjectDetails(${project.id})">
            <div class="project-image">
                <i class="fas ${project.icon}"></i>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Show project details with better modal
function showProjectDetails(id) {
    const project = projects.find(p => p.id === id);
    
    // Create a better modal instead of alert
    const modalHTML = `
        <div class="project-modal" id="projectModal">
            <div class="project-modal-content">
                <div class="project-modal-header">
                    <h3>${project.title}</h3>
                    <button class="modal-close" onclick="closeProjectModal()">&times;</button>
                </div>
                <div class="project-modal-body">
                    <div class="project-icon-large">
                        <i class="fas ${project.icon}"></i>
                    </div>
                    <p>${project.details}</p>
                    <div class="project-tags-modal">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        <button class="btn btn-primary" onclick="openRelatedPdf('${project.title}')">
                            <i class="fas fa-file-pdf"></i> View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function openRelatedPdf(projectTitle) {
    // Map project titles to PDF filenames
    const pdfMap = {
        "Highly Available Web Application on AWS": "highly-available-web-app.pdf",
        "AWS EC2 Management Using CLI": "ec2-cli-management.pdf",
        "Website Deployment with Database on AWS Linux": "website-database-deployment.pdf",
        "Static Website Hosting on AWS S3": "s3-static-hosting.pdf"
    };
    
    const filename = pdfMap[projectTitle];
    if (filename) {
        closeProjectModal();
        openPdf(filename, projectTitle + " - Documentation");
    }
}

// Load Documentation
function loadDocumentation() {
    const grid = document.getElementById('docsGrid');
    grid.innerHTML = documentation.map(doc => `
        <div class="doc-card" onclick="openPdf('${doc.filename}', '${doc.title}')">
            <div class="doc-icon">
                <i class="fas ${doc.icon}"></i>
            </div>
            <h3>${doc.title}</h3>
            <p>${doc.description}</p>
            <span class="doc-btn">
                <i class="fas fa-external-link-alt"></i> View Document
            </span>
        </div>
    `).join('');
}

// PDF Viewer with Skeleton Screen
function openPdf(filename, title) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const titleElement = document.getElementById('pdfTitle');
    
    titleElement.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show skeleton screen
    showPdfSkeleton();
    
    // Load PDF after a short delay to show skeleton
    setTimeout(() => {
        viewer.src = `pdfs/${filename}`;
        
        // Hide skeleton when PDF loads
        viewer.onload = () => {
            hidePdfSkeleton();
        };
        
        // Fallback to hide skeleton after 3 seconds
        setTimeout(() => {
            hidePdfSkeleton();
        }, 3000);
    }, 500);
}

function showPdfSkeleton() {
    const viewer = document.getElementById('pdfViewer');
    const skeletonHTML = `
        <div class="pdf-skeleton">
            <div class="skeleton skeleton-header"></div>
            <div class="skeleton skeleton-content"></div>
            <div class="skeleton skeleton-footer"></div>
            <div class="loading-text">
                <div class="loading-spinner"></div>
                Loading document...
            </div>
        </div>
    `;
    
    viewer.style.display = 'none';
    viewer.insertAdjacentHTML('afterend', skeletonHTML);
}

function hidePdfSkeleton() {
    const skeleton = document.querySelector('.pdf-skeleton');
    const viewer = document.getElementById('pdfViewer');
    
    if (skeleton) {
        skeleton.remove();
    }
    viewer.style.display = 'block';
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const skeleton = document.querySelector('.pdf-skeleton');
    
    modal.classList.remove('active');
    viewer.src = '';
    viewer.style.display = 'block';
    
    if (skeleton) {
        skeleton.remove();
    }
    
    document.body.style.overflow = '';
}

// Theme Toggle
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Navigation
function initNavigation() {
    const nav = document.querySelector('.navbar');
    const toggle = document.getElementById('navToggle');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active link
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile toggle (only if toggle exists)
    if (toggle) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (menu) {
                menu.classList.remove('active');
            }
            if (toggle) {
                toggle.classList.remove('active');
            }
        });
    });
}

// Typing Effect - Updated with cloud-focused phrases
function initTypingEffect() {
    const text = document.querySelector('.typing-text');
    const phrases = [
        'Cloud & IT Support Intern',
        'AWS & Azure Learner',
        'Linux Administrator',
        'Infrastructure Automation'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const current = phrases[phraseIndex];
        
        if (isDeleting) {
            text.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements (removed contact-item since contact section was removed)
    document.querySelectorAll('.project-card, .skill-category, .doc-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closePdfModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePdfModal();
    }
});