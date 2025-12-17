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

  const homeV3State = {
    mounted: false,
    stop: null,
  };

  const mountHomeV3Once = () => {
    if (homeV3State.mounted) return;

    const home = document.getElementById('home');
    if (!home) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = Array.from(home.querySelectorAll('[data-reveal]'));

    const reveal = (el) => el.classList.add('is-revealed');

    let observer = null;
    if (!reduced && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          reveal(entry.target);
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.15 });

      revealEls.forEach((el) => observer?.observe(el));
    } else {
      revealEls.forEach(reveal);
    }

    const cleanups = [];
    const canTilt = !reduced && window.matchMedia('(pointer: fine)').matches;
    const tiltEls = canTilt ? Array.from(home.querySelectorAll('[data-tilt]')) : [];

    const mountTilt = (el) => {
      let rafId = 0;
      let rect = null;

      const updateRect = () => { rect = el.getBoundingClientRect(); };
      const clearTransform = () => { el.style.transform = ''; };

      const onMove = (e) => {
        if (!rect) updateRect();

        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(() => {
          el.style.transform = `translateY(-2px) rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 10).toFixed(2)}deg)`;
        });
      };

      const onEnter = () => updateRect();
      const onLeave = () => { window.cancelAnimationFrame(rafId); clearTransform(); };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);

      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        window.cancelAnimationFrame(rafId);
        clearTransform();
      };
    };

    tiltEls.forEach((el) => cleanups.push(mountTilt(el)));

    homeV3State.stop = () => {
      observer?.disconnect();
      cleanups.forEach((fn) => fn());
      homeV3State.mounted = false;
      homeV3State.stop = null;
    };

    homeV3State.mounted = true;
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
    document.body.classList.toggle('home-v3', targetId === 'home');

    if (targetId === 'home') mountCarouselOnce();
    if (targetId === 'home') mountHomeV3Once();
    if (targetId !== 'home') carouselState.stop?.();
    if (targetId !== 'home') homeV3State.stop?.();

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
