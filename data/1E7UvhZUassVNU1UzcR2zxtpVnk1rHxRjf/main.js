"use strict";

const $ = q => document.querySelector(q);
const $a = q => document.querySelectorAll(q);

const $root = document.documentElement;
// Disable any transition while loading.
$root.classList.add('loading');

const now = new Date();
// If the local time is after 8pm and before 6am, use dark theme.
if (now.getHours() >= 20 || now.getHours() < 6) {
  $root.classList.add('dark');
}

// When this promise gets resolved, we've finished loading the content.
const promiseContentLoaded = new Promise(resolve => {
  document.addEventListener('DOMContentLoaded', resolve, {once: true});
});

function createElement(tag, attrs) {
  let $elem = document.createElement(tag);
  for (let attr in attrs) {
    $elem[attr] = attrs[attr];
  }
  return $elem;
}

function isCmdOrCtrlPressed(evt) {
  if (navigator.userAgent.indexOf('Macintosh') > 0) {
    return evt.metaKey;
  } else {
    return evt.ctrlKey;
  }
}

async function applyUserAgentFixes() {
  function loadFix(src) {
    let promiseFixLoaded = new Promise(resolve => {
      document.head.appendChild(createElement('script', {
        src, onload: resolve
      }));
    });
    return Promise.all([promiseContentLoaded, promiseFixLoaded]);
  }

  // Edge doesn't support CSS variables at all, but it declares all
  // following pieces in its user-agent string, so we need to detect
  // it explicitly.
  if (navigator.userAgent.indexOf('Edge/') > 0) {
    await loadFix('edge-fix.js');
    EdgeFix.fixVariables();
    return;
  }
  // Chromium-based browsers
  if (navigator.userAgent.indexOf('Chrome/') > 0) {
    await loadFix('blink-fix.js');
    BlinkFix.fixBackgroundImages();
    return;
  }
  // WebKit-based browsers
  if (navigator.userAgent.indexOf('AppleWebKit/') > 0) {
    await loadFix('webkit-fix.js');
    WebKitFix.fixSVGSprites();
    return;
  }
}

async function addThemeSwitcher() {
  await promiseContentLoaded;
  document.body.appendChild(createElement('input', {
    id: 'theme-switch',
    type: 'checkbox',
    hidden: true,
    checked: $root.classList.contains('dark'),
    onchange: function() {
      $root.classList.toggle('dark', this.checked);
    },
  }));
  document.body.appendChild(createElement('label', {
    htmlFor: 'theme-switch',
    onmouseenter: function() {
      $root.classList.add('theme-may-change');
    },
    onmouseleave: function() {
      $root.classList.remove('theme-may-change');
    },
  }));
}

async function addSiteTransition() {
  // The transition animation requires Web Animations API.
  if (!('animate' in Element.prototype)) {
    return;
  }
  await promiseContentLoaded;
  for (let a of $a('#list a')) {
    a.addEventListener('click', function(evt) {
      // Don't show the animation if it is a cmd/ctrl-click because
      // browser would open the link in new window.
      if (isCmdOrCtrlPressed(evt)) {
        return;
      }

      const initStyle = getComputedStyle(this, '::after');
      const initBgImage = initStyle.backgroundImage;
      const initSize = parseInt(initStyle.backgroundSize.split(' ')[0]);
      const rect = this.getBoundingClientRect();
      const initTop = rect.top;
      const initLeft = rect.left +
        parseInt(initStyle.backgroundPosition.split(' ')[0]);

      const finalSize = Math.sqrt(Math.pow(window.innerWidth, 2) +
                                  Math.pow(window.innerHeight, 2));
      const finalTop = (window.innerHeight - finalSize) / 2;
      const finalLeft = (window.innerWidth - finalSize) / 2;
      const style = `
        position: fixed;
        left: ${finalLeft}px;
        top: ${finalTop}px;
        width: ${finalSize}px;
        height: ${finalSize}px;
        border-radius: 100%;
        background: center/${initSize}px ${initSize}px no-repeat
          ${initBgImage} ${initStyle.backgroundColor};
        background-size: 20vmin;
        will-change: left top width height background-size;
      `;
      const $div = createElement('div', {id: 'splash', style});
      document.body.appendChild($div);
      let keyframes = {
        left: [`${initLeft}px`],
        top: [`${initTop}px`],
        width: [`${initSize}px`],
        height: [`${initSize}px`],
        backgroundSize: [`${initSize}px`],
      };
      for (let prop in keyframes) {
        keyframes[prop].push($div.style[prop]);
      }
      $div.animate(keyframes, 300);
    });
  }
  window.addEventListener('pageshow', function() {
    // Remove any splash if the page is shown again (likely from BFCache).
    for (let $splash of $a('#splash')) {
      document.body.removeChild($splash);
    }
    document.activeElement.blur();
  });
}

applyUserAgentFixes();
addThemeSwitcher();
addSiteTransition();
// Wait for one frame after loaded before enabling transition.
promiseContentLoaded.then(() => {
  requestAnimationFrame(() => {
    setTimeout(() => $root.classList.remove('loading'));
  });
});
