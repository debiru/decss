import Util from '/src/config/Util';

export const args = {
  siteName: 'DECSS',
  titleSuffix: 'Definitive Ecosystem of CSS',
  description: 'CSS における究極の生態系 - 主に Tailwind CSS の是非について解説します',
  keywords: ['CSS', 'CSS設計', 'Semantic CSS', 'Utility First CSS', 'Tailwind CSS', 'Master CSS'],
  twitter: '@debiru_R',
};

export const pages = [
  { route: '/', label: 'About' },
  { route: '/html-and-css-basics', label: 'HTML and CSS Basics', desc: '従来の <abbr title="Multi-Page Application">MPA</abbr> による HTML, CSS の基礎について<span class="wbr">知りたい方はこちら</span>' },
  { route: '/learn-css-with-spa', label: 'Learn CSS with SPA', desc: '<abbr title="Single-Page Application">SPA</abbr> による HTML, CSS の設計手法について<span class="wbr">知りたい方はこちら</span>' },
  { route: '/semantic-css', label: 'Semantic CSS Approach', desc: 'Semantic CSS の考え方について<span class="wbr">知りたい方はこちら</span>' },
  { route: '/utility-first-css', label: 'Utility-First CSS Approach', desc: 'Utility-First CSS の考え方について<span class="wbr">知りたい方はこちら</span>' },
  { route: '/extra', label: 'Extra Stage' },
];

export const app = {
  init(Astro) {
    app.Astro = Astro;
    app.args = Astro.props.args ?? {};
    app.url = Astro.url;
    args.domain = app.url.hostname;
    args.path = app.url.pathname.replace(/\.html$/, '');
    args.url = app.url.origin + args.path;
    args.siteRootUrlWithoutProtocol = app.url.host;
    args.urlWithoutProtocol = app.url.host + args.path;
    args.cssList = app.args.cssList ?? [];
    args.jsList = app.args.jsList ?? [];
    args.titlePrefix = app.args.title;
    args.title = (args.titlePrefix != null ? args.titlePrefix + ' - ' : '') + args.siteName + ' | ' + args.titleSuffix;
    args.lang = 'ja';
    args.locale = 'ja_JP';
    args.og_type = args.path === '/' ? 'website' : 'article';
    args.og_image = assetsUrl('img/global/og.png', true);
  },
};

export const assets = (path, cacheBuster = false) => {
  path = '/assets/' + Util.ltrim(path);
  if (cacheBuster) path += '?' + Date.now();
  return path;
};

export const assetsUrl = (path, cacheBuster = false) => {
  return Util.rtrim(app.url.origin) + assets(path, cacheBuster);
};

export const img = (path) => {
  return assets('img/' + Util.ltrim(path));
};

export const route = (path) => {
  return '/' + Util.ltrim(path);
};

export const setID = (id) => {
  app.latestID = id;
  return id;
};

export const getID = () => {
  return '#' + app.latestID;
};
