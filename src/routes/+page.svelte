<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { enhance } from "$app/forms"	
	import { Loader } from "lucide-svelte";
	import RoastDisplay from "$lib/components/RoastDisplay.svelte";
	import { goto } from "$app/navigation";

	let { form } = $props();
	let loading = $state(false);
</script>

<div class="flex flex-col min-h-screen px-5">
	<div class="flex-1 flex flex-col items-center justify-center w-full">
		{#if form?.roast}
			<RoastDisplay 
				roast={form.roast} 
				onReset={() => goto('/', { invalidateAll: true })} 
			/>
		{:else}
			<Card.Root class="w-full max-w-lg">
				<Card.Header>
					<Card.Title>Portfolio Roaster</Card.Title>
					<Card.Description>Roast your portfolio with AI</Card.Description>
				</Card.Header>
				<Card.Content>
					<form
						method="POST"
						use:enhance={() => {
							loading = true;
							return async ({ update }) => {
								await update();
								loading = false;
							};
						}}
						class="space-y-4"
					>
						<div class="space-y-2">
							<Label for="url">URL</Label>
							<Input
								type="url"
								name="url"
								placeholder="https://portfolio.com"
								value={form?.url ?? ""}
							/>
							{#if form?.error}
								<p class="text-sm text-destructive">{form.error}</p>
							{/if}
						</div>
						<div class="flex justify-end">
							<button
								type="submit"
								class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
								disabled={loading}
							>
								{#if loading}
									<Loader class="mr-2 h-4 w-4 animate-spin" /> 
									Roasting...
								{:else}
									Roast It
								{/if}
							</button>
						</div>
					</form>
				</Card.Content>
			</Card.Root>
		{/if}
	</div>
	<footer class="py-5 text-center">
		<p class="text-muted-foreground text-sm">Built with {`{"Svelte" && "❤"}`} by <a href="http://idolo.dev" target="_blank" rel="noreferrer noopener" class="text-primary hover:underline">Treasure</a></p>
	</footer>
</div>