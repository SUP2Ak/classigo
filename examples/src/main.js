/* global document, setTimeout */

import classigo from 'classigo';
import './styles.css';

const app = document.getElementById('app');

const performanceStats = {
  opsPerSec: '52M',
  bundleSize: '159B',
  framework: 'Standalone'
};

const examples = [
  {
    title: 'React + Classigo',
    description: 'Interactive button with React hooks and CSS Modules',
    url: './react-demo/',
    framework: 'React',
    color: '#61dafb',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    title: 'Vue 3 + Classigo',
    description: 'Reactive button with Composition API and CSS Modules',
    url: './vue-demo/',
    framework: 'Vue',
    color: '#42b883',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
  },
  {
    title: 'Svelte + Classigo',
    description: 'Reactive button with Svelte and CSS Modules',
    url: './svelte-demo/',
    framework: 'Svelte',
    color: '#ff3e00',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg'
  },
  {
    title: 'Vanilla JS + Classigo',
    description: 'Dynamic button with vanilla JavaScript and CSS Modules',
    url: './vanilla-demo/',
    framework: 'Vanilla',
    color: '#f7df1e',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  }
];

app.innerHTML = `
  <div class="${classigo('container')}">
    <div class="${classigo('header')}">
      <h1 class="${classigo('title')}">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
          alt="Classigo"
          class="${classigo('title-logo')}"
        />
        Classigo Examples
      </h1>
      <p class="${classigo('subtitle')}">Ultra-optimized class name utility for CSS Modules</p>
    </div>

    <div class="${classigo('performance')}">
      <h3>⚡ Performance</h3>
      <p>${performanceStats.opsPerSec} ops/sec • ${performanceStats.bundleSize} bundle size • ${performanceStats.framework}</p>
    </div>

    <div class="${classigo('demo')}">
      <div class="${classigo('examples-grid')}">
        ${examples.map(example => `
          <div class="${classigo('example-card')}">
            <div class="${classigo('example-header')}">
              <img src="${example.icon}" alt="${example.framework}" class="${classigo('example-icon')}" />
              <h3 class="${classigo('example-title')}">${example.title}</h3>
            </div>
            <p class="${classigo('example-description')}">${example.description}</p>
            <a href="${example.url}" class="${classigo('example-link')}">
              Try Demo
            </a>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="${classigo('footer')}">
      <a href="https://github.com/SUP2Ak/classigo" class="${classigo('backLink')}" target="_blank">
        View on GitHub
      </a>
    </div>
  </div>
`;

setTimeout(() => {
  app.classList.add('loaded');
}, 100);
