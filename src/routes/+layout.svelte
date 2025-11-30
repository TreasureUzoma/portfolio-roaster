<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Portfolio Roaster</title>
	<meta name="description" content="Portfolio Roaster AI" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

{@render children()}
