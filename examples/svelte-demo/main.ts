import SvelteDemo from '../src/components/SvelteDemo.svelte';

const app = new SvelteDemo({
  target: document.getElementById('app')!
});

export default app;
