<script lang="ts">
  import Swipe from '../../lib/index';
  import cat1 from '../image/cat1.jpg';
  import cat2 from '../image/cat2.jpg';
  import cat3 from '../image/cat3.jpg';
  import cat4 from '../image/cat4.jpg';
  import cat5 from '../image/cat5.jpeg';
  import cat6 from '../image/cat6.jpeg';
  import cat7 from '../image/cat7.jpg';
  import cat8 from '../image/cat8.jpg';

  let item = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8];
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte Custom Swipe Demo App" />
</svelte:head>

<section>
  <button on:click={() => item = [...item, cat1, cat2, cat3, cat4, cat5]}
    >Add Item</button
  >
  <Swipe
    {item}
    config={{ isHistory: false, direction: 'row', isCarousel: true }}
    --swipe-wrap-height="800px"
  >
    <img slot="swipeitem" let:swipe src={swipe} alt={swipe} />
  </Swipe>
</section>

<style>
  section {
    width: 100%;
    max-width: 720px;
    max-height: 1800px;
    margin: 0 auto;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
