document.addEventListener('DOMContentLoaded', () => {

  /* ===== Theme Toggle ===== */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('chenglab-theme');
  if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');
  themeToggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) { root.removeAttribute('data-theme'); localStorage.setItem('chenglab-theme', 'light'); }
    else { root.setAttribute('data-theme', 'dark'); localStorage.setItem('chenglab-theme', 'dark'); }
  });

  /* ===== Landing page ===== */
  const landing = document.getElementById('landing');
  const landingEnter = landing?.querySelector('.landing-enter');

  const dismissLanding = () => {
    if (!landing || landing.classList.contains('is-hidden')) return;
    landing.classList.add('is-hidden');
    landing.addEventListener('transitionend', () => landing.classList.add('is-gone'), { once: true });
  };
  landingEnter?.addEventListener('click', (e) => { e.stopPropagation(); dismissLanding(); });
  landing?.addEventListener('click', (e) => {
    if (e.target.closest('.landing-enter')) return;
    dismissLanding();
  });
  document.addEventListener('keydown', (e) => {
    if (landing && !landing.classList.contains('is-hidden') && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) dismissLanding();
  });

  /* ===== Section navigation ===== */
  const sections = Array.from(document.querySelectorAll('main section'));
  const navLinks = Array.from(document.querySelectorAll('nav a[data-target]'));
  const homeState = { mounted: false, stop: null };
  const researchCarouselState = { mounted: false, index: 0, goTo: null };

  const mountHomeOnce = () => {
    if (homeState.mounted) return;
    const home = document.getElementById('home');
    if (!home) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = Array.from(home.querySelectorAll('[data-reveal]'));
    const reveal = (el) => el.classList.add('is-revealed');
    let observer = null;
    if (!reduced && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (!entry.isIntersecting) return; reveal(entry.target); observer?.unobserve(entry.target); }); }, { threshold: 0.15 });
      revealEls.forEach((el) => observer?.observe(el));
    } else { revealEls.forEach(reveal); }
    homeState.stop = () => { observer?.disconnect(); homeState.mounted = false; homeState.stop = null; };
    homeState.mounted = true;
  };

  /* ===== Research Carousel ===== */
  const mountResearchCarousel = () => {
    if (researchCarouselState.mounted) return;
    const track = document.getElementById('researchCarousel');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.research-slide'));
    if (slides.length === 0) return;
    const prevBtn = document.getElementById('researchPrev');
    const nextBtn = document.getElementById('researchNext');
    const dots = Array.from(document.querySelectorAll('#researchDots .dot'));

    const goTo = (idx, direction) => {
      const current = researchCarouselState.index;
      const next = ((idx % slides.length) + slides.length) % slides.length;
      if (next === current) return;

      // Determine direction for exit animation
      const goingForward = direction !== undefined ? direction : next > current;

      // Exit current slide
      slides[current].classList.remove('active');
      slides[current].classList.add(goingForward ? 'exit-left' : '');
      slides[current].style.transform = goingForward ? 'translateX(-40px)' : 'translateX(40px)';
      slides[current].style.opacity = '0';

      // Enter next slide
      slides[next].style.transform = goingForward ? 'translateX(40px)' : 'translateX(-40px)';
      slides[next].style.opacity = '0';
      slides[next].classList.add('active');

      // Force reflow then animate in
      void slides[next].offsetWidth;
      slides[next].style.transform = 'translateX(0)';
      slides[next].style.opacity = '1';

      // Clean up exit classes after transition
      setTimeout(() => {
        slides[current].classList.remove('exit-left');
        slides[current].style.transform = '';
        slides[current].style.opacity = '';
      }, 550);

      researchCarouselState.index = next;

      // Update dots
      dots.forEach((d, i) => d.classList.toggle('active', i === next));
    };

    researchCarouselState.goTo = goTo;

    nextBtn?.addEventListener('click', () => { goTo(researchCarouselState.index + 1, true); });
    prevBtn?.addEventListener('click', () => { goTo(researchCarouselState.index - 1, false); });
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        const dir = idx > researchCarouselState.index;
        goTo(idx, dir);
      });
    });

    // Ensure first slide is active
    slides.forEach((s, i) => {
      if (i === 0) { s.classList.add('active'); }
      else { s.classList.remove('active'); }
    });

    researchCarouselState.mounted = true;
  };

  const setActiveNav = (targetId) => { navLinks.forEach((link) => { const isActive = link.getAttribute('data-target') === targetId; link.classList.toggle('active', isActive); link.setAttribute('aria-current', isActive ? 'page' : 'false'); }); };
  const showSection = (targetId) => {
    sections.forEach((s) => s.classList.remove('active-section'));
    const t = document.getElementById(targetId); if (!t) return;
    t.classList.add('active-section');
    document.body.classList.toggle('is-home', targetId === 'home');
    if (targetId === 'home') mountHomeOnce();
    if (targetId === 'research') mountResearchCarousel();
    if (targetId !== 'home') homeState.stop?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  navLinks.forEach((link) => { link.addEventListener('click', (e) => { e.preventDefault(); const id = link.getAttribute('data-target'); if (!id) return; setActiveNav(id); showSection(id); }); });
  const initialTarget = (location.hash || '#home').replace('#', '');
  const validTarget = sections.some((s) => s.id === initialTarget) ? initialTarget : 'home';
  setActiveNav(validTarget); showSection(validTarget);

  /* ===== UMAP lazy loading ===== */
  const umapFrame = document.getElementById('umapFrame');
  const umapPlaceholder = document.getElementById('umapPlaceholder');
  const umapWrap = document.getElementById('umapWrap');
  const umapButtons = Array.from(document.querySelectorAll('[data-umap-view]'));
  const umapSrcMap = { '3d': './embeds/Metacell_3D_UMAP_filtered_embed.html', '2d': './embeds/Metacell_2D_UMAP_filtered_embed.html' };
  let umapLoaded = false; let currentUmapView = '3d';

  const loadUmap = (view) => {
    if (!umapFrame) return;
    currentUmapView = view || '3d';
    if (umapPlaceholder && !umapLoaded) umapPlaceholder.innerHTML = '<div class="umap-spinner"></div><span>Loading visualization...</span>';
    const src = umapSrcMap[currentUmapView]; if (!src) return;
    umapFrame.src = src;
    umapFrame.onload = () => { umapLoaded = true; umapPlaceholder?.classList.add('is-hidden'); umapFrame.style.opacity = '1'; umapFrame.style.transition = 'opacity .4s ease'; };
  };

  if (umapWrap && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { loadUmap('3d'); obs.unobserve(e.target); } }); }, { rootMargin: '200px' });
    obs.observe(umapWrap);
  } else { loadUmap('3d'); }

  const setUmapView = (view) => {
    if (!umapFrame || !umapSrcMap[view]) return;
    umapLoaded = false; loadUmap(view);
    umapButtons.forEach((btn) => { const a = btn.getAttribute('data-umap-view') === view; btn.classList.toggle('is-active', a); btn.setAttribute('aria-selected', a ? 'true' : 'false'); });
  };
  umapButtons.forEach((btn) => { btn.addEventListener('click', () => { const v = btn.getAttribute('data-umap-view'); if (!v) return; setUmapView(v); }); });
});
