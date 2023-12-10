<script lang="ts">
  import { afterUpdate } from 'svelte';
  import useSwipe from '../hooks/useSwipe';
  import type { ConfigProps } from 'swipe-core-provider';

  interface SwipeConfigProps extends ConfigProps {
    isCarousel?: boolean;
  }
  export let item: Array<any>;
  export let config: SwipeConfigProps | undefined = undefined;
  let swipeRef: HTMLUListElement;
  let dotRef: HTMLUListElement;
  const { handleSlide } = useSwipe(() => swipeRef, {
    ...config,
    historyCallback: (state) => {
      config?.historyCallback && config?.historyCallback(state);
      if (config?.isCarousel && !config.isHistory) handleDot(state.currentStep);
    },
  });

  const handleDot = (index: number) => {
    if (dotRef !== undefined) {
      dotRef.childNodes.forEach((node: ChildNode, idx: number) => {
        const Node = node as HTMLLIElement;
         index === idx ? Node.classList.add('active') : Node.classList.remove('active');
      });
    }
  };
  afterUpdate(() => {
    handleDot(
      parseInt(
        new URLSearchParams(location.search).get(
          config?.paramName || 'index',
        ) || '0',
      ),
    );
  });
</script>

<div class="swipe-container">
  {#if config?.isCarousel && !config.isHistory}
  <div class="swipe-carousel">
    <button
      class="swipe-button swipe-left-button"
      on:click={() => handleSlide('L')}
    >
      〈
    </button>
    <button
      class="swipe-button swipe-right-button"
      on:click={() => handleSlide('R')}
    >
      〉
    </button>
    <ul class="carousel-dots" bind:this={dotRef}>
      {#each item as Swipe}
        <li></li>
      {/each}
    </ul>
  </div>
  {/if}
  <ul
    class={`swipe-wrap ${config?.direction === 'column' ? 'column' : 'row'}`}
    bind:this={swipeRef}
  >
    {#each item as swipe, idx}
      <li class="swipe-item"><slot name="swipeitem" {swipe} key={idx} /></li>
    {/each}
  </ul>
</div>

<style>
  .swipe-container {
    position: relative;
    display: flex;
    padding: 0;
    overflow: hidden;
    z-index: 1;
  }
  .swipe-wrap {
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
    height: var(--swipe-wrap-height);
    margin: 0 auto;
    padding: 0;
    list-style: none;
    box-sizing: content-box;
  }
  .swipe-container .column {
    flex-direction: column !important;
  }
  .swipe-item {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
  }
  :root {
    --swipe-wrap-height: 100%;
  }
  :global(.swipe-item img) {
    -webkit-user-drag: none;
  }
  .swipe-button {
    position: absolute;
    top: 50%;
    padding: 4px 2px 3px 4px;
    font-size: 2rem;
    color: rgba(48, 48, 48, 0.582);
    border: none;
    background: none;
    z-index: 2;
    cursor: pointer;
  }
  .swipe-left-button {
    left: 18px;
  }
  .swipe-right-button {
    right: 18px;
  }
  .carousel-dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    font-size: 0;
    z-index: 2;
  }

  :global(.carousel-dots li) {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 3px;
    list-style: none;
    font-size: 0px;
    border: 1px solid rgb(54, 53, 53);
    background: rgba(8, 8, 8, 0.199);
    border-radius: 100%;
  }

  :global(.carousel-dots .active) {
    background: rgb(103 39 39);
  }
</style>
