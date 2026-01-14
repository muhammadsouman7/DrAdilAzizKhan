document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear()
    const startingYear = 2008
    const experience = currentYear - startingYear
    document.querySelectorAll(".experience").forEach(exp => {
        exp.textContent = experience + "+";
    });
    // --- 1. Select Elements ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu-wrapper');
    const navLinks = document.querySelectorAll('.nav-item, .nav-cta, .btn-outline, .mobile-nav-cta');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const navbar = document.getElementById('navbar');
    const appointmentForm = document.getElementById('appointmentForm');

    // --- 2. Mobile Menu & Hamburger Logic ---
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent background scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 3. Smooth Scroll & Auto-Close Menu ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Handle Internal Links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        mobileToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }

                    // Scroll to target with offset for sticky header
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 4. Scrollspy (Active Link) & Navbar Styling ---
    window.addEventListener('scroll', () => {
        let current = '';

        // Detect which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // pageYOffset is used for compatibility; window.scrollY is modern
            if (window.scrollY >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        // Update Nav Links
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });

        // Sticky Navbar Shrink Effect
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 5. WhatsApp Form Integration ---
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const paNumber = "923119455349";

            // Construct the WhatsApp URL
            const encodedText = encodeURIComponent(
                `Hello, I would like to book an appointment with Dr. Adil Aziz Khan.\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Details:* ${message}`
            );

            const whatsappUrl = `https://wa.me/${paNumber}?text=${encodedText}`;

            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // Footer current year
    document.getElementById("currentYear").textContent = currentYear;
});