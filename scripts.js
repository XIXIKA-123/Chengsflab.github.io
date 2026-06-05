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

  /* ===== Language Toggle (i18n) ===== */
  var i18nData = {
    en: {
      nav_home: 'Home', nav_research: 'Research', nav_team: 'Team', nav_publications: 'Publications', nav_contact: 'Join us',
      hero_kicker: 'Cheng Lab \u00b7 Westlake University',
      hero_title: 'Epigenetic Regulation in Development',
      hero_lead: 'Decoding the epigenetic mechanisms that orchestrate cell fate decisions during gastrulation',
      hl_atlas_title: 'Single-Cell Embryo Atlas',
      hl_atlas_desc: 'Mapping cell fate decisions during gastrulation at single-cell resolution with time-resolved metacell projections',
      hl_epi_title: 'Epigenetic Regulation',
      hl_epi_desc: 'Decoding how chromatin accessibility and histone modifications control gene expression during lineage commitment',
      hl_comp_title: 'Computational Methods',
      hl_comp_desc: 'Developing tools for metacell projection and multi-omics integration to resolve developmental trajectories',
      atlas_title: 'Single-Cell Embryo Atlas',
      atlas_caption: 'Metacell projection for time-resolved gastrulation states.',
      method_label: 'Computational Method',
      method_title: 'From single-cell matrix to metacell projection',
      method_route: 'single-cell matrix -> gene filtering -> metacell projection',
      method_summary: 'A fixed random seed keeps gene filtering and metacell collection reproducible before projecting the grouped cells into UMAP space.',
      research_title: 'Research',
      research_lead: 'Cellular differentiation transforms a single-cell zygote into a complex multi-cellular organism composed of various tissue and cell types. It\u2019s fascinating to understand how this is achieved despite genetic homogeneity.',
      research_desc: 'The overarching goal of the lab is to unravel the principle of epigenetic regulation in cell fate decisions. We employ embryogenesis, gametogenesis, in vitro models and synthesize experimental and computational frameworks to precisely resolve phenotypes and gene functions, effectively disentangling cell-intrinsic and non-cell-autonomous effects over time.',
      research_aims_title: 'Research Aims',
      aim1_title: 'Epigenetic Dynamics During Embryogenesis',
      aim1_desc: 'We investigate how chromatin accessibility and histone modifications change dynamically during gastrulation, using single-cell multi-omics to capture the temporal landscape of epigenetic reprogramming as cells transition through key developmental checkpoints.',
      aim2_title: 'Chromatin Regulation in Cell Fate',
      aim2_desc: 'We study how specific epigenetic regulators \u2014 including TET proteins and histone variants \u2014 influence lineage commitment during gastrulation, combining genetic perturbation with single-embryo, single-cell resolution approaches.',
      aim3_title: 'Gene Regulatory Networks in Development',
      aim3_desc: 'We develop computational and experimental frameworks to reconstruct gene regulatory networks that drive cell fate decisions, integrating transcriptomic and chromatin data to identify key transcription factors and their downstream targets.',
      team_pi: 'Principal Investigator',
      team_current: 'Current Members',
      team_alumni: 'Alumni',
      pub_title: 'Publications',
      pub_scholar: 'Google Scholar : https://scholar.google.com/',
      contact_positions: 'Open Positions',
      contact_postdoc_title: 'Post-doctoral Position',
      contact_postdoc_desc: 'We are looking for motivated postdoctoral fellows with strong background in developmental biology, epigenetics, single-cell genomics, computational biology or related fields. Candidates with experience in mouse embryology and gene editing are highly preferred. Please send your CV, research interests and contact information of three references to me.',
      contact_grad_title: 'Graduate Students',
      contact_grad_desc: 'If you are interested in epigenetics and embryo development, please have a try in our lab!',
      contact_us_title: 'Contact Us',
      contact_intro: 'If you are interested in joining us, please email me!',
      contact_address: '3-228/229, Yunqi campus, Westlake University, Hangzhou, China',
      footer_copyright: '\u00a9 2026 Cheng Lab.',
    },
    zh: {
      nav_home: '\u9996\u9875', nav_research: '\u7814\u7a76', nav_team: '\u56e2\u961f', nav_publications: '\u53d1\u8868', nav_contact: '\u52a0\u5165\u6211\u4eec',
      hero_kicker: '\u7a0b\u5b9e\u9a8c\u5ba4 \u00b7 \u897f\u6e56\u5927\u5b66',
      hero_title: '\u53d1\u80b2\u8fc7\u7a0b\u4e2d\u7684\u8868\u89c2\u8c03\u63a7',
      hero_lead: '\u89e3\u7801\u5728\u539f\u80a0\u8fd0\u52a8\u8fc7\u7a0b\u4e2d\u8c03\u63a7\u7ec6\u80de\u547d\u8fd0\u51b3\u5b9a\u7684\u8868\u89c2\u9057\u4f20\u673a\u5236',
      hl_atlas_title: '\u5355\u7ec6\u80de\u80da\u80ce\u56fe\u8c31',
      hl_atlas_desc: '\u4ee5\u5355\u7ec6\u80de\u5206\u8fa8\u7387\u6620\u5c04\u539f\u80a0\u8fd0\u52a8\u671f\u7684\u7ec6\u80de\u547d\u8fd0\u51b3\u5b9a\uff0c\u901a\u8fc7\u65f6\u95f4\u5206\u8fa8\u7684metacell\u6295\u5f71',
      hl_epi_title: '\u8868\u89c2\u8c03\u63a7',
      hl_epi_desc: '\u89e3\u7801\u67d3\u8272\u8d28\u53ef\u53ca\u6027\u548c\u7ec4\u86cb\u767d\u4fee\u9970\u5982\u4f55\u5728\u8c31\u7cfb\u627f\u8bfa\u8fc7\u7a0b\u4e2d\u63a7\u5236\u57fa\u56e0\u8868\u8fbe',
      hl_comp_title: '\u8ba1\u7b97\u65b9\u6cd5',
      hl_comp_desc: '\u5f00\u53d1metacell\u6295\u5f71\u548c\u591a\u7ec4\u5b66\u6574\u5408\u5de5\u5177\uff0c\u89e3\u6790\u53d1\u80b2\u8f68\u8ff9',
      atlas_title: '\u5355\u7ec6\u80de\u80da\u80ce\u56fe\u8c31',
      atlas_caption: '\u65f6\u95f4\u5206\u8fa8\u7684\u539f\u80a0\u8fd0\u52a8\u72b6\u6001metacell\u6295\u5f71\u3002',
      method_label: '\u8ba1\u7b97\u65b9\u6cd5',
      method_title: '\u4ece\u5355\u7ec6\u80de\u77e9\u9635\u5230metacell\u6295\u5f71',
      method_route: '\u5355\u7ec6\u80de\u77e9\u9635 -> \u57fa\u56e0\u8fc7\u6ee4 -> metacell\u6295\u5f71',
      method_summary: '\u56fa\u5b9a\u7684\u968f\u673a\u79cd\u5b50\u786e\u4fdd\u57fa\u56e0\u8fc7\u6ee4\u548cmetacell\u6536\u96c6\u7684\u53ef\u91cd\u590d\u6027\uff0c\u7136\u540e\u5c06\u5206\u7ec4\u7ec6\u80de\u6295\u5f71\u5230UMAP\u7a7a\u95f4\u3002',
      research_title: '\u7814\u7a76',
      research_lead: '\u7ec6\u80de\u5206\u5316\u5c06\u5355\u7ec6\u80de\u53d7\u7cbe\u5375\u8f6c\u5316\u4e3a\u7531\u5404\u79cd\u7ec4\u7ec7\u548c\u7ec6\u80de\u7c7b\u578b\u7ec4\u6210\u7684\u590d\u6742\u591a\u7ec6\u80de\u751f\u7269\u4f53\u3002\u7406\u89e3\u5728\u57fa\u56e0\u540c\u8d28\u6027\u7684\u60c5\u51b5\u4e0b\u8fd9\u662f\u5982\u4f55\u5b9e\u73b0\u7684\uff0c\u975e\u5e38\u5f15\u4eba\u5165\u80dc\u3002',
      research_desc: '\u5b9e\u9a8c\u5ba4\u7684\u603b\u4f53\u76ee\u6807\u662f\u63ed\u793a\u8868\u89c2\u8c03\u63a7\u5728\u7ec6\u80de\u547d\u8fd0\u51b3\u5b9a\u4e2d\u7684\u539f\u7406\u3002\u6211\u4eec\u91c7\u7528\u80da\u80ce\u53d1\u751f\u3001\u914d\u5b50\u53d1\u751f\u3001\u4f53\u5916\u6a21\u578b\uff0c\u5e76\u7efc\u5408\u5b9e\u9a8c\u548c\u8ba1\u7b97\u6846\u67b6\uff0c\u7cbe\u786e\u89e3\u6790\u8868\u578b\u548c\u57fa\u56e0\u529f\u80fd\uff0c\u6709\u6548\u533a\u5206\u7ec6\u80de\u5185\u5728\u548c\u975e\u7ec6\u80de\u81ea\u4e3b\u6548\u5e94\u3002',
      research_aims_title: '\u7814\u7a76\u76ee\u6807',
      aim1_title: '\u80da\u80ce\u53d1\u751f\u8fc7\u7a0b\u4e2d\u7684\u8868\u89c2\u52a8\u6001',
      aim1_desc: '\u6211\u4eec\u7814\u7a76\u67d3\u8272\u8d28\u53ef\u53ca\u6027\u548c\u7ec4\u86cb\u767d\u4fee\u9970\u5728\u539f\u80a0\u8fd0\u52a8\u8fc7\u7a0b\u4e2d\u7684\u52a8\u6001\u53d8\u5316\uff0c\u5229\u7528\u5355\u7ec6\u80de\u591a\u7ec4\u5b66\u6355\u6349\u7ec6\u80de\u5728\u5173\u952e\u53d1\u80b2\u68c0\u67e5\u70b9\u8f6c\u6362\u65f6\u8868\u89c2\u91cd\u7f16\u7a0b\u7684\u65f6\u95f4\u666f\u89c2\u3002',
      aim2_title: '\u7ec6\u80de\u547d\u8fd0\u4e2d\u7684\u67d3\u8272\u8d28\u8c03\u63a7',
      aim2_desc: '\u6211\u4eec\u7814\u7a76\u7279\u5b9a\u7684\u8868\u89c2\u8c03\u63a7\u56e0\u5b50\u2014\u2014\u5305\u62ecTET\u86cb\u767d\u548c\u7ec4\u86cb\u767d\u53d8\u4f53\u2014\u2014\u5982\u4f55\u5f71\u54cd\u539f\u80a0\u8fd0\u52a8\u671f\u7684\u8c31\u7cfb\u627f\u8bfa\uff0c\u7ed3\u5408\u57fa\u56e0\u6270\u52a8\u4e0e\u5355\u80da\u80ce\u3001\u5355\u7ec6\u80de\u5206\u8fa8\u7387\u65b9\u6cd5\u3002',
      aim3_title: '\u53d1\u80b2\u4e2d\u7684\u57fa\u56e0\u8c03\u63a7\u7f51\u7edc',
      aim3_desc: '\u6211\u4eec\u5f00\u53d1\u8ba1\u7b97\u548c\u5b9e\u9a8c\u6846\u67b6\u6765\u91cd\u5efa\u9a71\u52a8\u7ec6\u80de\u547d\u8fd0\u51b3\u5b9a\u7684\u57fa\u56e0\u8c03\u63a7\u7f51\u7edc\uff0c\u6574\u5408\u8f6c\u5f55\u7ec4\u548c\u67d3\u8272\u8d28\u6570\u636e\u4ee5\u8bc6\u522b\u5173\u952e\u8f6c\u5f55\u56e0\u5b50\u53ca\u5176\u4e0b\u6e38\u9776\u6807\u3002',
      team_pi: '\u8bfe\u9898\u7ec4\u8d1f\u8d23\u4eba',
      team_current: '\u5728\u8bfb\u6210\u5458',
      team_alumni: '\u6bd5\u4e1a\u751f',
      pub_title: '\u53d1\u8868\u8bba\u6587',
      pub_scholar: '\u8c37\u6b4c\u5b66\u672f : https://scholar.google.com/',
      contact_positions: '\u62db\u8058\u4fe1\u606f',
      contact_postdoc_title: '\u535a\u58eb\u540e\u804c\u4f4d',
      contact_postdoc_desc: '\u6211\u4eec\u5bfb\u627e\u5728\u53d1\u80b2\u751f\u7269\u5b66\u3001\u8868\u89c2\u9057\u4f20\u5b66\u3001\u5355\u7ec6\u80de\u57fa\u56e0\u7ec4\u5b66\u3001\u8ba1\u7b97\u751f\u7269\u5b66\u6216\u76f8\u5173\u9886\u57df\u5177\u6709\u6df1\u539a\u80cc\u666f\u7684\u535a\u58eb\u540e\u7814\u7a76\u5458\u3002\u5177\u6709\u5c0f\u9f20\u80da\u80ce\u5b66\u548c\u57fa\u56e0\u7f16\u8f91\u7ecf\u9a8c\u7684\u5019\u9009\u4eba\u4f18\u5148\u3002\u8bf7\u5c06\u60a8\u7684\u7b80\u5386\u3001\u7814\u7a76\u5174\u8da3\u548c\u4e09\u4f4d\u63a8\u8350\u4eba\u7684\u8054\u7cfb\u4fe1\u606f\u53d1\u9001\u7ed9\u6211\u3002',
      contact_grad_title: '\u7814\u7a76\u751f',
      contact_grad_desc: '\u5982\u679c\u60a8\u5bf9\u8868\u89c2\u9057\u4f20\u5b66\u548c\u80da\u80ce\u53d1\u80b2\u611f\u5174\u8da3\uff0c\u6b22\u8fce\u52a0\u5165\u6211\u4eec\u7684\u5b9e\u9a8c\u5ba4\uff01',
      contact_us_title: '\u8054\u7cfb\u6211\u4eec',
      contact_intro: '\u5982\u679c\u60a8\u5bf9\u52a0\u5165\u6211\u4eec\u611f\u5174\u8da3\uff0c\u8bf7\u53d1\u90ae\u4ef6\u7ed9\u6211\uff01',
      contact_address: '\u4e2d\u56fd\u676d\u5dde\uff0c\u897f\u6e56\u5927\u5b66\u4e91\u6816\u6821\u533a3-228/229',
      footer_copyright: '\u00a9 2026 \u7a0b\u5b9e\u9a8c\u5ba4\u3002',
    }
  };

  var currentLang = 'en';
  try { currentLang = localStorage.getItem('chenglab-lang') || 'en'; } catch(e) {}
  var langBtn = document.getElementById('langToggle');
  var translatableEls = document.querySelectorAll('[data-i18n]');

  function applyLang(lang) {
    try {
      var dict = i18nData[lang];
      if (!dict) dict = i18nData.en;
      currentLang = lang;
      for (var i = 0; i < translatableEls.length; i++) {
        var el = translatableEls[i];
        var key = el.getAttribute('data-i18n');
        if (key && dict[key] !== undefined) {
          el.textContent = dict[key];
        }
      }
      document.documentElement.setAttribute('data-lang', lang);
      if (langBtn) langBtn.textContent = lang === 'zh' ? 'EN' : '\u4e2d';
      try { localStorage.setItem('chenglab-lang', lang); } catch(e) {}
    } catch(err) {
      console.error('i18n error:', err);
    }
  }

  applyLang(currentLang);
  if (langBtn) {
    langBtn.addEventListener('click', function() {
      applyLang(currentLang === 'zh' ? 'en' : 'zh');
    });
  }

  /* ===== Global Reveal Observer ===== */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const allRevealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  const revealEl = (el) => el.classList.add('is-revealed');
  let revealObserver = null;
  if (!reduced && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (!entry.isIntersecting) return; revealEl(entry.target); revealObserver?.unobserve(entry.target); });
    }, { threshold: 0.15 });
    allRevealEls.forEach((el) => revealObserver?.observe(el));
  } else {
    allRevealEls.forEach(revealEl);
  }

  /* ===== Section navigation ===== */
  const sections = Array.from(document.querySelectorAll('main section'));
  const navLinks = Array.from(document.querySelectorAll('nav a[data-target]'));
  const researchCarouselState = { mounted: false, index: 0, goTo: null };

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
    if (targetId === 'research') mountResearchCarousel();
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
