<template>
  <div class="container">
    <div class="header">
      <h1 class="title">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
          alt="Vue"
          class="title-logo"
        />
        Vue + Classigo Demo
      </h1>
      <p class="subtitle">
        Interactive button component demonstrating classigo with Vue 3 Composition API and CSS Modules integration.
      </p>
    </div>

    <div class="demo">
      <div class="buttonContainer">
        <button
          :class="buttonClasses"
          :disabled="disabled"
          @click="handleClick"
        >
          {{ variant }} {{ size }} button
        </button>
      </div>

      <div class="controls">
        <div class="selects-section">
          <h3>Button Properties</h3>
          <div class="selects-grid">
            <div
              ref="variantRef"
              :class="['select-item', { 'select-item--active': openMenu === 'variant' }]"
              @click.stop="toggleMenu('variant')"
            >
              <div class="select-item-icon">🎨</div>
              <div class="select-item-content">
                <div class="select-item-label">Variant</div>
                <div class="select-item-value">{{ variant }}</div>
              </div>
              <div :class="['select-item-chevron', { 'select-item-chevron--active': openMenu === 'variant' }]">
                ›
              </div>
            </div>

            <div
              ref="sizeRef"
              :class="['select-item', { 'select-item--active': openMenu === 'size' }]"
              @click.stop="toggleMenu('size')"
            >
              <div class="select-item-icon">📏</div>
              <div class="select-item-content">
                <div class="select-item-label">Size</div>
                <div class="select-item-value">{{ size }}</div>
              </div>
              <div :class="['select-item-chevron', { 'select-item-chevron--active': openMenu === 'size' }]">
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
                :class="['switch', { 'active': disabled }]"
                @click="disabled = !disabled"
                type="button"
              />
            </div>

            <div class="switch-container">
              <span class="switch-label">Rounded</span>
              <button
                :class="['switch', { 'active': rounded }]"
                @click="rounded = !rounded"
                type="button"
              />
            </div>

            <div class="switch-container">
              <span class="switch-label">Outlined</span>
              <button
                :class="['switch', { 'active': outlined }]"
                @click="outlined = !outlined"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="output">
        <span class="outputTitle">Generated className:</span>
        <code class="outputCode">{{ buttonClasses }}</code>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="openMenu"
        :class="['select-menu-portal', { 'select-menu-portal--visible': openMenu }]"
        :style="menuStyle"
        @click.stop
      >
        <template v-if="openMenu === 'variant'">
          <div
            class="select-option select-option--variant"
            @click="handleSelectChange('variant', 'primary')"
          >
            Primary
          </div>
          <div
            class="select-option select-option--variant"
            @click="handleSelectChange('variant', 'secondary')"
          >
            Secondary
          </div>
        </template>

        <template v-if="openMenu === 'size'">
          <div
            class="select-option select-option--size"
            @click="handleSelectChange('size', 'small')"
          >
            Small
          </div>
          <div
            class="select-option select-option--size"
            @click="handleSelectChange('size', 'medium')"
          >
            Medium
          </div>
          <div
            class="select-option select-option--size"
            @click="handleSelectChange('size', 'large')"
          >
            Large
          </div>
        </template>
      </div>
    </Teleport>

    <div class="performance">
      <h3>⚡ Performance</h3>
      <p>
        classigo: 52M ops/sec • 159B bundle size • Ultra-optimized for CSS
        Modules
      </p>
    </div>

    <a href="../" class="backLink">← Back to Examples</a>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import classigo from 'classigo';

const variant = ref<'primary' | 'secondary'>('primary');
const size = ref<'small' | 'medium' | 'large'>('medium');
const disabled = ref(false);
const rounded = ref(false);
const outlined = ref(false);
const openMenu = ref<'variant' | 'size' | null>(null);
const isTouchDevice = ref(false);

const variantRef = ref<HTMLElement>();
const sizeRef = ref<HTMLElement>();

const checkTouchDevice = () => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

onMounted(() => {
  checkTouchDevice();
  window.addEventListener('resize', checkTouchDevice);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkTouchDevice);
});

const buttonClasses = computed(() =>
  classigo(
    'button',
    `button--${variant.value}`,
    `button--${size.value}`,
    disabled.value && 'button--disabled',
    rounded.value && 'button--rounded',
    outlined.value && 'button--outlined'
  )
);

const menuStyle = computed(() => {
  if (!openMenu.value) return {};
  
  const ref = openMenu.value === 'variant' ? variantRef.value : sizeRef.value;
  if (!ref) return {};
  
  const rect = ref.getBoundingClientRect();
  return {
    position: 'absolute' as const,
    top: `${rect.bottom + window.scrollY + 4}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    zIndex: 1000,
  };
});

const handleClick = () => {
  console.log('Button clicked!', {
    variant: variant.value,
    size: size.value,
    disabled: disabled.value,
    rounded: rounded.value,
    outlined: outlined.value,
  });
};

const handleSelectChange = (type: 'variant' | 'size', value: string) => {
  if (type === 'variant') {
    variant.value = value as 'primary' | 'secondary';
  } else if (type === 'size') {
    size.value = value as 'small' | 'medium' | 'large';
  }
  openMenu.value = null;
};

const toggleMenu = (menuType: 'variant' | 'size') => {
  openMenu.value = openMenu.value === menuType ? null : menuType;
};

const closeAllMenus = () => {
  openMenu.value = null;
};

const handleClickOutside = () => {
  closeAllMenus();
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
@import '../styles.css';
</style>
