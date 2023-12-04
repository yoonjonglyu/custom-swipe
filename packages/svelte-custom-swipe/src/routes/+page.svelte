<script>
	import Swipe from "../components/Swipe.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte Custom Swipe Demo App" />
</svelte:head>

<section>
	<Swipe />
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
