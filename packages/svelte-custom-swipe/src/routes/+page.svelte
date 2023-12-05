<script lang="ts">
	import Swipe from "../components/Swipe.svelte";
	const item = ['1','2','3','4','5'];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte Custom Swipe Demo App" />
</svelte:head>

<section>
	<Swipe item={item} config={{direction:'row'}}>
		<img slot="swipeitem" let:swipe src={swipe} alt={swipe} />
	</Swipe>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

</style>
