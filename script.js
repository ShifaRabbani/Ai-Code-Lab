document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------
       1. Custom Cursor Logic
       ------------------------------------- */
    const cursor = document.getElementById('custom-cursor');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    // Only activate custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect states
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });
    } else {
        // Disable custom cursor
        if (cursor) cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    /* -------------------------------------
       2. Magnetic Buttons
       ------------------------------------- */
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate mouse position relative to button center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move button slightly towards cursor
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = 'transform 0.5s ease';
        });
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });

    /* -------------------------------------
       3. 3D Glass Card Tilt & Glow Tracking
       ------------------------------------- */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top; // y position within the element.
            
            // Update CSS variables for the inner radial gradient glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Calculate 3D tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    /* -------------------------------------
       4. Scroll Reveal Intersection Observer
       ------------------------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // We do not unobserve, allowing elements to fade back out if desired, 
                // but usually you unobserve.
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((element) => {
        revealObserver.observe(element);
    });

    /* -------------------------------------
       5. Form Handling Override
       ------------------------------------- */
    const newsForm = document.querySelector('.news-box');
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = "Access Requested!";
            btn.style.background = "var(--secondary)";
            btn.style.color = "var(--bg-base)";
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = "";
                btn.style.color = "";
                newsForm.reset();
            }, 3000);
        });
    }

});