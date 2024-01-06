<script lang="ts">
  import Swipe from '$lib/index.ts';
  const item = [
    'https://yoonjonglyu.github.io/custom-swipe/assets/c1dbbdc1b473d757ed94a80d6cff51f5.jpg',
    'https://yoonjonglyu.github.io/custom-swipe/assets/3f394bd7102b8da522047a82fd90f3e8.jpg',
    'https://yoonjonglyu.github.io/custom-swipe/assets/580b2619aaaa962d2fe3d9714de50cf7.jpg',
  ];
</script>

<h1>Welcome to your library project</h1>
<Swipe {item} config={{ isCarousel: true }}>
  <img slot="swipeitem" let:swipe src={swipe} alt={swipe} />
</Swipe>
<p>
  Create your package using @sveltejs/package and preview/showcase your work
  with SvelteKit
</p>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
