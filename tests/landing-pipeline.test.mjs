import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../style.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../scripts.js', import.meta.url), 'utf8');

const getCssBlock = (selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, 'm'));
  assert.ok(match, `Expected CSS block for ${selector}`);
  return match[1];
};

test('home uses IBM Plex typography and the current hero plus highlights layout', () => {
  assert.match(html, /IBM\+Plex\+Sans/);
  assert.match(html, /IBM\+Plex\+Mono/);
  assert.doesNotMatch(html, /class="star/);
  assert.doesNotMatch(html, /landing-enter/);
  assert.doesNotMatch(html, /home-shell/);
  assert.doesNotMatch(css, /mask-image/);
  assert.doesNotMatch(css, /-webkit-mask-image/);
  assert.doesNotMatch(css, /repeating-linear-gradient/);

  const rootBlock = getCssBlock(':root');
  assert.match(rootBlock, /--font-sans:\s*"IBM Plex Sans"/);
  assert.match(rootBlock, /--font-mono:\s*"IBM Plex Mono"/);

  const heroContentBlock = getCssBlock('.hero-content');
  assert.match(heroContentBlock, /position:\s*relative/);
  assert.match(heroContentBlock, /padding-top:\s*80px/);
  assert.match(heroContentBlock, /padding-bottom:\s*80px/);

  const heroTitleBlock = getCssBlock('.hero-title');
  assert.match(heroTitleBlock, /font-size:\s*clamp\(36px,\s*5\.5vw,\s*72px\)/);
  assert.match(heroTitleBlock, /color:\s*#fff/);
  assert.match(heroTitleBlock, /max-width:\s*780px/);

  const highlightsBlock = getCssBlock('.home-highlights');
  assert.match(highlightsBlock, /grid-template-columns:\s*repeat\(3,\s*1fr\)/);
  assert.match(highlightsBlock, /padding:\s*56px 0 48px/);

  const highlightCardBlock = getCssBlock('.highlight-card');
  assert.match(highlightCardBlock, /padding:\s*28px 24px/);
  assert.match(highlightCardBlock, /border-radius:\s*var\(--radius\)/);
  assert.match(highlightCardBlock, /transform \.2s/);
});

test('home keeps the atlas and method workbench markup used by the current redesign', () => {
  const homeSection = html.match(/<section id="home">[\s\S]*?<\/section>/);
  assert.ok(homeSection, 'Expected the Home section');

  const homeHtml = homeSection[0];
  assert.match(homeHtml, /class="home-hero-full"/);
  assert.match(homeHtml, /class="hero-content container"/);
  assert.match(homeHtml, /class="home-highlights"/);
  assert.match(homeHtml, /class="home-workbench"/);
  assert.match(homeHtml, /class="home-atlas"/);
  assert.match(homeHtml, /class="home-method"/);
  assert.match(homeHtml, /Single-Cell Embryo Atlas/);
  assert.match(homeHtml, /Computational Method/);
  assert.match(homeHtml, /From single-cell matrix to metacell projection/);
  assert.match(homeHtml, /single-cell matrix -&gt; gene filtering -&gt; metacell projection/);
  assert.match(homeHtml, /Loading 3D UMAP visualization\.\.\./);
  assert.match(homeHtml, /<pre class="method-code"/);

  for (const snippet of ['exclude_genes', 'collect_metacells', 'umap_by_metacell', 'random_seed=123456']) {
    assert.match(homeHtml, new RegExp(snippet));
  }

  const highlightCards = homeHtml.match(/class="highlight-card"/g) ?? [];
  assert.equal(highlightCards.length, 3);

  for (const removedClass of ['homev3', 'pipeline-map', 'pipeline-evidence', 'pipeline-status', 'pipeline-steps', 'homev3-tags', 'homev3-tag']) {
    assert.doesNotMatch(homeHtml, new RegExp(removedClass));
  }

  assert.doesNotMatch(html, /class="[^"]*homev3/);
  assert.doesNotMatch(css, /homev3/);
  assert.doesNotMatch(js, /homeV3|home-v3/);

  const workbenchBlock = getCssBlock('#home .home-workbench');
  assert.match(workbenchBlock, /grid-template-columns:\s*minmax\(0,\s*1\.08fr\)\s*minmax\(320px,\s*\.92fr\)/);
  assert.match(workbenchBlock, /gap:\s*18px/);

  const methodBlock = getCssBlock('#home .home-method');
  assert.match(methodBlock, /border-radius:\s*8px/);

  const methodCodeBlock = getCssBlock('#home .method-code');
  assert.match(methodCodeBlock, /padding:\s*22px/);
  assert.match(methodCodeBlock, /font-family:\s*var\(--font-mono\)/);

  const umapSwitchBlock = getCssBlock('.umap-switch');
  assert.match(umapSwitchBlock, /display:\s*inline-flex/);
  assert.match(umapSwitchBlock, /border-radius:\s*6px/);
});

test('research carousel keeps manual navigation without automatic image switching', () => {
  const carouselBlock = js.match(/\/\* ===== Research Carousel ===== \*\/[\s\S]*?const setActiveNav/);
  assert.ok(carouselBlock, 'Expected the Research carousel script block');

  const script = carouselBlock[0];
  assert.doesNotMatch(script, /setInterval/);
  assert.doesNotMatch(script, /stepForward/);
  assert.doesNotMatch(script, /researchCarouselState\.start\s*=/);
  assert.doesNotMatch(script, /mouseleave',\s*start/);
  assert.match(script, /nextBtn\?\.addEventListener\('click'/);
  assert.match(script, /prevBtn\?\.addEventListener\('click'/);
  assert.match(script, /dot\.addEventListener\('click'/);
});
