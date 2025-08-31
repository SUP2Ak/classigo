<script>
  // True story: my dropdown in this select turned into a toxic ex.
  // It just STICKS there when you scroll, like “nah bro, I live here now.”
  // And the cherry on top? Random messages like:
  // [vite-plugin-svelte] no Svelte config found (thanks, Captain Obvious).
  //
  // You fix it in one place? Boom, shit breaks somewhere else.
  // Add a random whitespace to trigger a rebuild? MAGICALLY works again.
  //
  // Honestly, I don’t even care anymore. I dumped Svelte the moment they
  // decided to marry plain JavaScript and put TypeScript in a retirement home.
  // So yeah, I officially don’t give a single fuck. 
  // Leave this comment as a monument to dev pain. Cheers.

  import { onMount, onDestroy } from 'svelte';
  import classigo from 'classigo';

  let variant = 'primary';
  let size = 'medium';
  let disabled = false;
  let rounded = false;
  let outlined = false;
  let openMenu = null;
  let isTouchDevice = false;

  let variantRef;
  let sizeRef;

  const checkTouchDevice = () => {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  $: buttonClasses = classigo(
    'button',
    `button--${variant}`,
    `button--${size}`,
    disabled && 'button--disabled',
    rounded && 'button--rounded',
    outlined && 'button--outlined'
  );

  const handleClick = () => {
    console.log('Button clicked!', {
      variant,
      size,
      disabled,
      rounded,
      outlined,
    });
  };

  const handleSelectChange = (type, value) => {
    if (type === 'variant') {
      variant = value;
    } else if (type === 'size') {
      size = value;
    }
    openMenu = null;
    removeMenu();
  };

  const MenuPortal = () => {
    if (!openMenu) return null;

    // Use querySelector instead of refs since Svelte refs are unreliable
    const selector = openMenu === 'variant' ? '[data-select="variant"]' : '[data-select="size"]';
    const ref = document.querySelector(selector);
    if (!ref) {
      return null;
    }

    const rect = ref.getBoundingClientRect();
    
    const menu = document.createElement('div');
    menu.className = classigo('select-menu-portal', 'select-menu-portal--visible');
    menu.style.cssText = `
      position: fixed;
      top: ${rect.bottom + window.scrollY + 4}px;
      left: ${rect.left + window.scrollX}px;
      width: ${rect.width}px;
      z-index: 999999;
    `;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('tabindex', '0');
    menu.setAttribute('aria-label', 'Select options');

    if (openMenu === 'variant') {
      menu.innerHTML = `
        <div class="${classigo('select-option', 'select-option--variant')}" data-value="primary" role="option" tabindex="0" aria-selected="${variant === 'primary'}">Primary</div>
        <div class="${classigo('select-option', 'select-option--variant')}" data-value="secondary" role="option" tabindex="0" aria-selected="${variant === 'secondary'}">Secondary</div>
      `;
    } else if (openMenu === 'size') {
      menu.innerHTML = `
        <div class="${classigo('select-option', 'select-option--size')}" data-value="small" role="option" tabindex="0" aria-selected="${size === 'small'}">Small</div>
        <div class="${classigo('select-option', 'select-option--size')}" data-value="medium" role="option" tabindex="0" aria-selected="${size === 'medium'}">Medium</div>
        <div class="${classigo('select-option', 'select-option--size')}" data-value="large" role="option" tabindex="0" aria-selected="${size === 'large'}">Large</div>
      `;
    }

    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      const option = e.target.closest('.select-option');
      if (option) {
        handleSelectChange(openMenu, option.dataset.value);
      }
    });

    menu.addEventListener('keydown', (e) => {
      e.stopPropagation();
    });

    // Update menu position on scroll
    const updateMenuPosition = () => {
      const newRect = ref.getBoundingClientRect();
      menu.style.top = `${newRect.bottom + window.scrollY + 4}px`;
      menu.style.left = `${newRect.left + window.scrollX}px`;
    };

    window.addEventListener('scroll', updateMenuPosition);
    window.addEventListener('resize', updateMenuPosition);

    // Store the update function on the menu element for cleanup
    menu._updatePosition = updateMenuPosition;

    document.body.appendChild(menu);
    return menu;
  };

  const removeMenu = () => {
    const existingMenu = document.querySelector('.select-menu-portal');
    if (existingMenu) {
      // Clean up event listeners
      if (existingMenu._updatePosition) {
        window.removeEventListener('scroll', existingMenu._updatePosition);
        window.removeEventListener('resize', existingMenu._updatePosition);
      }
      existingMenu.remove();
    }
  };

  const toggleMenu = (menuType) => {
    if (openMenu === menuType) {
      openMenu = null;
      removeMenu();
    } else {
      openMenu = menuType;
      removeMenu();
      // Wait for Svelte to update the DOM
      setTimeout(() => {
        MenuPortal();
      }, 10);
    }
  };

  const closeAllMenus = () => {
    openMenu = null;
    removeMenu();
  };

  const handleClickOutside = (event) => {
    const target = event.target;
    const isSelectItem = target.closest('.select-item');
    const isSelectMenu = target.closest('.select-menu-portal');
    
    if (!isSelectItem && !isSelectMenu) {
      closeAllMenus();
    }
  };

  onMount(() => {
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    window.removeEventListener('resize', checkTouchDevice);
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<style>
  @import '../styles.css';
</style>

<div class="container">
  <div class="header">
    <h1 class="title">
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg"
        alt="Svelte"
        class="title-logo"
      />
      Svelte + Classigo Demo
    </h1>
    <p class="subtitle">
      Interactive button component demonstrating classigo with Svelte reactivity and CSS Modules integration.
    </p>
  </div>

  <div class="demo">
    <div class="buttonContainer">
      <button
        class={buttonClasses}
        disabled={disabled}
        on:click={handleClick}
      >
        {variant} {size} button
      </button>
    </div>

    <div class="controls">
      <div class="selects-section">
        <h3>Button Properties</h3>
        <div class="selects-grid">
          <div
            bind:this={variantRef}
            data-select="variant"
            class={classigo(
              'select-item',
              openMenu === 'variant' && 'select-item--active'
            )}
            role="button"
            tabindex="0"
            aria-haspopup="listbox"
            aria-expanded={openMenu === 'variant'}
            aria-label="Select variant"
            on:click={(e) => {
              e.stopPropagation();
              toggleMenu('variant');
            }}
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu('variant');
              }
            }}
          >
            <div class="select-item-icon">🎨</div>
            <div class="select-item-content">
              <div class="select-item-label">Variant</div>
              <div class="select-item-value">{variant}</div>
            </div>
            <div class={classigo(
              'select-item-chevron',
              openMenu === 'variant' && 'select-item-chevron--active'
            )}>
              ›
            </div>
          </div>

          <div
            bind:this={sizeRef}
            data-select="size"
            class={classigo(
              'select-item',
              openMenu === 'size' && 'select-item--active'
            )}
            role="button"
            tabindex="0"
            aria-haspopup="listbox"
            aria-expanded={openMenu === 'size'}
            aria-label="Select size"
            on:click={(e) => {
              e.stopPropagation();
              toggleMenu('size');
            }}
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu('size');
              }
            }}
          >
            <div class="select-item-icon">📏</div>
            <div class="select-item-content">
              <div class="select-item-label">Size</div>
              <div class="select-item-value">{size}</div>
            </div>
            <div class={classigo(
              'select-item-chevron',
              openMenu === 'size' && 'select-item-chevron--active'
            )}>
              ›
            </div>
          </div>
        </div>
      </div>

      <div class="switches-section">
        <h3>Button States</h3>
        <div class="switches-grid">
          <div class="switch-container">
            <span class="switch-label">Disabled</span>
            <button
              class={classigo('switch', disabled && 'active')}
              on:click={() => disabled = !disabled}
              type="button"
              role="switch"
              aria-checked={disabled}
              aria-label="Toggle disabled state"
            ></button>
          </div>

          <div class="switch-container">
            <span class="switch-label">Rounded</span>
            <button
              class={classigo('switch', rounded && 'active')}
              on:click={() => rounded = !rounded}
              type="button"
              role="switch"
              aria-checked={rounded}
              aria-label="Toggle rounded state"
            ></button>
          </div>

          <div class="switch-container">
            <span class="switch-label">Outlined</span>
            <button
              class={classigo('switch', outlined && 'active')}
              on:click={() => outlined = !outlined}
              type="button"
              role="switch"
              aria-checked={outlined}
              aria-label="Toggle outlined state"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <div class="output">
      <span class="outputTitle">Generated className:</span>
      <code class="outputCode">{buttonClasses}</code>
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
