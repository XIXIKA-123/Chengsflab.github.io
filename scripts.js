document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('main section'));
  const navLinks = Array.from(document.querySelectorAll('nav a[data-target]'));

  const carouselState = {
    mounted: false,
    index: 0,
    timerId: null,
    step: null,
    start: null,
    stop: null,
  };

  const setActiveNav = (targetId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('data-target') === targetId;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  };

  const showSection = (targetId) => {
    sections.forEach((section) => section.classList.remove('active-section'));

    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    targetSection.classList.add('active-section');
    document.body.classList.toggle('is-home', targetId === 'home');

    if (targetId === 'home') mountCarouselOnce();
    if (targetId !== 'home') carouselState.stop?.();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mountCarouselOnce = () => {
    if (carouselState.mounted) {
      carouselState.start?.();
      return;
    }

    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const images = Array.from(carousel.querySelectorAll('.carousel-track img'));
    if (images.length === 0) return;

    const nextButton = carousel.querySelector('.carousel-button.next');
    const prevButton = carousel.querySelector('.carousel-button.prev');

    const setActiveImage = (nextIndex) => {
      const safeIndex = ((nextIndex % images.length) + images.length) % images.length;

      images.forEach((img, idx) => img.classList.toggle('active', idx === safeIndex));
      carouselState.index = safeIndex;
    };

    const step = (delta) => setActiveImage(carouselState.index + delta);

    const start = () => {
      if (carouselState.timerId !== null) return;

      carouselState.timerId = window.setInterval(() => step(1), 4500);
    };

    const stop = () => {
      if (carouselState.timerId === null) return;

      window.clearInterval(carouselState.timerId);
      carouselState.timerId = null;
    };

    carouselState.step = step;
    carouselState.start = start;
    carouselState.stop = stop;

    nextButton?.addEventListener('click', () => step(1));
    prevButton?.addEventListener('click', () => step(-1));

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    setActiveImage(0);
    start();

    carouselState.mounted = true;
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      if (!targetId) return;

      setActiveNav(targetId);
      showSection(targetId);
    });
  });

  const initialTarget = (location.hash || '#home').replace('#', '');
  const validTarget = sections.some((s) => s.id === initialTarget) ? initialTarget : 'home';

  setActiveNav(validTarget);
  showSection(validTarget);
});
