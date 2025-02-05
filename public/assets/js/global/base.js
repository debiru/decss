(function() {
  'use strict';

  const NS = {};
  window.NS = NS;

  const Main = {
    setNS() {
      NS.header = document.getElementById('page-header');
      NS.globalNavArea = NS.header.querySelector('.globalNavArea');
      NS.main = document.getElementById('page-main');
      NS.footer = document.getElementById('page-footer');
    },
    setToC() {
      const container = Util.createElement('nav', { id: 'docs-toc' });
      const buttonContainer = Util.createElement('div', { id: 'docs-toc-controller' }, container);
      const ariaAttrs = { 'aria-controls': 'docs-toc-list', 'aria-expanded': 'false' };
      const buttonLabel = '目次を開く';
      const buttonLabelExpanded = '目次を閉じる';
      const button = Util.createElement('button', { id: 'docs-toc-expand', type: 'button', textContent: buttonLabel, ...ariaAttrs }, buttonContainer);
      const hiddenValue = 'hidden';
      const list = Util.createElement('ol', { id: 'docs-toc-list', 'hidden': hiddenValue }, container);
      const headings = NS.main.querySelectorAll('h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        const section = heading.closest('section');
        const elemName = heading.tagName.toLowerCase();
        const hash = `#${section.id}`;
        const li = Util.createElement('li', { class: `toc-${elemName}` }, list);
        const anchor = Util.createElement('a', { href: hash, textContent: heading.textContent }, li);
      });
      Util.addEvent(button, 'click', () => {
        const isExpanded = list.getAttribute('hidden') == null;
        const isExpandNext = !isExpanded;
        button.setAttribute('aria-expanded', isExpandNext);
        if (isExpandNext) {
          button.textContent = buttonLabelExpanded;
          list.removeAttribute('hidden');
        }
        else {
          button.textContent = buttonLabel;
          list.setAttribute('hidden', hiddenValue);
        }
      });
      if (headings.length > 0) NS.globalNavArea.append(container);
    },
  };

  const Util = {
    execObjectRoutine(obj) {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'function') {
          const retval = obj[key]();
          if (retval != null) return retval;
        }
      }
    },
    empty(arg) {
      let isEmpty = arg == null || arg === false || arg === '';
      if (!isEmpty) {
        if (Array.isArray(arg) && arg.length === 0) isEmpty = true;
        if (Object.getPrototypeOf(arg).constructor.name === 'Object' && Object.keys(arg).length === 0) isEmpty = true;
      }
      return isEmpty;
    },
    delegateEvent(selector, type, listener, options) {
      if (options == null) options = false;
      document.addEventListener(type, evt => {
        for (let elem = evt.target; elem && elem !== document; elem = elem.parentNode) {
          if (elem.matches(selector)) return listener.call(elem, evt);
        }
      }, options);
    },
    addEvent(elems, type, listener, options) {
      if (Util.empty(elems)) return null;
      if (!elems.forEach) elems = [elems];
      if (options == null) options = false;
      elems.forEach((elem, idx) => elem.addEventListener(type, evt => { listener.call(elem, evt, idx); }, options));
    },
    triggerEvent(elems, type, options) {
      if (Util.empty(elems)) return null;
      if (!elems.forEach) elems = [elems];
      const event = new Event(type, options);
      elems.forEach(elem => elem.dispatchEvent(event));
    },
    elemsFilter(elems, selector, single = false) {
      const result = [];
      for (const elem of elems) {
        if (elem.matches(selector)) result.push(elem);
      }
      return single ? result[0] : result;
    },
    createElement(name, attrs, parent) {
      if (attrs == null) attrs = {};
      const elem = document.createElement(name);
      const { textContent, ...restAttrs } = attrs;
      if (textContent != null) elem.textContent = textContent;
      for (const [key, value] of Object.entries(restAttrs)) {
        elem.setAttribute(key, value);
      }
      if (parent != null) parent.append(elem);
      return elem;
    },
    debounce(func, interval = 50) {
      return function(...args) {
        clearTimeout(func._debounceTid);
        func._debounceTid = setTimeout(() => {
          delete func._debounceTid;
          func.call(this, ...args);
        }, interval);
      };
    },
    sprintf(format, ...args) {
      let p = 0;
      return format.replace(/%./g, function(m) {
        if (m === '%%') return '%';
        if (m === '%s') return args[p++];
        return m;
      });
    },
  };
  NS.Util = Util;

  Util.addEvent(document, 'DOMContentLoaded', () => {
    Util.execObjectRoutine(Main);
  });

  Util.addEvent(window, 'unload', () => {});
}());
