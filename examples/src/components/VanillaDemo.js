/* global document, window, navigator, console */

import classigo from 'classigo';
import '../styles.css';

class VanillaDemo {
  constructor() {
    this.variant = 'primary';
    this.size = 'medium';
    this.disabled = false;
    this.rounded = false;
    this.outlined = false;
    this.openMenu = null;
    this.isTouchDevice = false;
    
    this.variantRef = null;
    this.sizeRef = null;
    
    this.init();
  }

  checkTouchDevice() {
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  getButtonClasses() {
    return classigo(
      'button',
      `button--${this.variant}`,
      `button--${this.size}`,
      this.disabled && 'button--disabled',
      this.rounded && 'button--rounded',
      this.outlined && 'button--outlined'
    );
  }

  updateButton() {
    const button = document.querySelector('.button');
    if (button) {
      button.className = this.getButtonClasses();
      button.disabled = this.disabled;
    }

    const outputCode = document.querySelector('.outputCode');
    if (outputCode) {
      outputCode.textContent = this.getButtonClasses();
    }

    this.updateSwitches();
    this.updateSelects();
  }

  updateSwitches() {
    const switches = document.querySelectorAll('.switch');
    switches[0].className = classigo('switch', this.disabled && 'active');
    switches[1].className = classigo('switch', this.rounded && 'active');
    switches[2].className = classigo('switch', this.outlined && 'active');
  }

  updateSelects() {
    const variantSelect = this.variantRef;
    const sizeSelect = this.sizeRef;

    if (variantSelect) {
      variantSelect.className = classigo(
        'select-item',
        this.openMenu === 'variant' && 'select-item--active'
      );
      const variantChevron = variantSelect.querySelector('.select-item-chevron');
      if (variantChevron) {
        variantChevron.className = classigo(
          'select-item-chevron',
          this.openMenu === 'variant' && 'select-item-chevron--active'
        );
      }
    }

    if (sizeSelect) {
      sizeSelect.className = classigo(
        'select-item',
        this.openMenu === 'size' && 'select-item--active'
      );
      const sizeChevron = sizeSelect.querySelector('.select-item-chevron');
      if (sizeChevron) {
        sizeChevron.className = classigo(
          'select-item-chevron',
          this.openMenu === 'size' && 'select-item-chevron--active'
        );
      }
    }
  }

  handleSelectChange(type, value) {
    if (type === 'variant') {
      this.variant = value;
    } else if (type === 'size') {
      this.size = value;
    }
    this.openMenu = null;
    this.removeMenu();
    this.updateButton();
  }

  toggleMenu(menuType) {
    if (this.openMenu === menuType) {
      this.openMenu = null;
      this.removeMenu();
    } else {
      this.openMenu = menuType;
      this.removeMenu();
      this.showMenu();
    }
    this.updateSelects();
  }

  showMenu() {
    if (!this.openMenu) return;

    const ref = this.openMenu === 'variant' ? this.variantRef : this.sizeRef;
    if (!ref) return;

    const rect = ref.getBoundingClientRect();
    
    const menu = document.createElement('div');
    menu.className = classigo('select-menu-portal', 'select-menu-portal--visible');
    menu.style.cssText = `
      position: absolute;
      top: ${rect.bottom + window.scrollY + 4}px;
      left: ${rect.left + window.scrollX}px;
      width: ${rect.width}px;
      z-index: 1000;
    `;

    if (this.openMenu === 'variant') {
      menu.innerHTML = `
        <div class="${classigo('select-option', 'select-option--variant')}" data-value="primary">Primary</div>
        <div class="${classigo('select-option', 'select-option--variant')}" data-value="secondary">Secondary</div>
      `;
    } else if (this.openMenu === 'size') {
      menu.innerHTML = `
        <div class="${classigo('select-option', 'select-option--size')}" data-value="small">Small</div>
        <div class="${classigo('select-option', 'select-option--size')}" data-value="medium">Medium</div>
        <div class="${classigo('select-option', 'select-option--size')}" data-value="large">Large</div>
      `;
    }

    menu.querySelectorAll('.select-option').forEach(option => {
      option.addEventListener('click', () => {
        this.handleSelectChange(this.openMenu, option.dataset.value);
      });
    });

    document.body.appendChild(menu);
  }

  removeMenu() {
    const existingMenu = document.querySelector('.select-menu-portal');
    if (existingMenu) {
      existingMenu.remove();
    }
  }

  bindEvents() {
    const button = document.querySelector('.button');
    if (button) {
      button.addEventListener('click', () => {
        console.log('Button clicked!', {
          variant: this.variant,
          size: this.size,
          disabled: this.disabled,
          rounded: this.rounded,
          outlined: this.outlined,
        });
      });
    }

    const switches = document.querySelectorAll('.switch');
    switches[0].addEventListener('click', () => {
      this.disabled = !this.disabled;
      this.updateButton();
    });

    switches[1].addEventListener('click', () => {
      this.rounded = !this.rounded;
      this.updateButton();
    });

    switches[2].addEventListener('click', () => {
      this.outlined = !this.outlined;
      this.updateButton();
    });

    if (this.variantRef) {
      this.variantRef.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu('variant');
      });
    }

    if (this.sizeRef) {
      this.sizeRef.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu('size');
      });
    }

    document.addEventListener('click', () => {
      this.openMenu = null;
      this.removeMenu();
      this.updateSelects();
    });
  }

  render() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="container">
        <div class="header">
          <h1 class="title">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              alt="Vanilla JS"
              class="title-logo"
            />
            Vanilla JS + Classigo Demo
          </h1>
          <p class="subtitle">
            Dynamic button component demonstrating classigo with vanilla JavaScript and CSS Modules integration.
          </p>
        </div>

        <div class="demo">
          <div class="buttonContainer">
            <button class="${this.getButtonClasses()}" ${this.disabled ? 'disabled' : ''}>
              ${this.variant} ${this.size} button
            </button>
          </div>

          <div class="controls">
            <div class="selects-section">
              <h3>Button Properties</h3>
              <div class="selects-grid">
                <div class="select-item" data-ref="variantRef">
                  <div class="select-item-icon">🎨</div>
                  <div class="select-item-content">
                    <div class="select-item-label">Variant</div>
                    <div class="select-item-value">${this.variant}</div>
                  </div>
                  <div class="select-item-chevron">›</div>
                </div>

                <div class="select-item" data-ref="sizeRef">
                  <div class="select-item-icon">📏</div>
                  <div class="select-item-content">
                    <div class="select-item-label">Size</div>
                    <div class="select-item-value">${this.size}</div>
                  </div>
                  <div class="select-item-chevron">›</div>
                </div>
              </div>
            </div>

            <div class="switches-section">
              <h3>Button States</h3>
              <div class="switches-grid">
                <div class="switch-container">
                  <span class="switch-label">Disabled</span>
                  <button class="${classigo('switch', this.disabled && 'active')}" type="button"></button>
                </div>

                <div class="switch-container">
                  <span class="switch-label">Rounded</span>
                  <button class="${classigo('switch', this.rounded && 'active')}" type="button"></button>
                </div>

                <div class="switch-container">
                  <span class="switch-label">Outlined</span>
                  <button class="${classigo('switch', this.outlined && 'active')}" type="button"></button>
                </div>
              </div>
            </div>
          </div>

          <div class="output">
            <span class="outputTitle">Generated className:</span>
            <code class="outputCode">${this.getButtonClasses()}</code>
          </div>
        </div>

        <div class="performance">
          <h3>⚡ Performance</h3>
          <p>
            classigo: 52M ops/sec • 159B bundle size • Ultra-optimized for CSS
            Modules
          </p>
        </div>

        <a href="../" class="backLink">← Back to Examples</a>
      </div>
    `;

    this.variantRef = document.querySelector('[data-ref="variantRef"]');
    this.sizeRef = document.querySelector('[data-ref="sizeRef"]');

    this.bindEvents();
  }

  init() {
    if (typeof window !== 'undefined') {
      this.checkTouchDevice();
      this.render();
    }
  }
}

export default VanillaDemo;
