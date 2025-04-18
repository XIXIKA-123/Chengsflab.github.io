document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');

    // Function to show a specific section
    const showSection = (targetId) => {
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active-section');
            // Initialize carousel if home section is shown
            if (targetId === 'home') {
                initializeCarousel();
            }
        }
    };

    // Function to set active navigation link
    const setActiveNavLink = (targetId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });
    };

    // Carousel functionality
    const initializeCarousel = () => {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const images = carousel.querySelectorAll('.carousel-track img');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const nextButton = carousel.querySelector('.carousel-button.next');
        let currentIndex = 0;

        // Function to show the current image
        const showImage = (index) => {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        };

        // Show the first image
        showImage(currentIndex);

        // Next button click
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length; // Loop to first image
            showImage(currentIndex);
        });

        // Previous button click
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop to last image
            showImage(currentIndex);
        });
    };

    // Show home section and highlight home link on page load
    showSection('home');
    setActiveNavLink('home');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');

            // Remove active class from all links and set active link
            setActiveNavLink(target);

            // Show the corresponding section
            showSection(target);

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});