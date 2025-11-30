<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { superForm } from "sveltekit-superforms";
	import { Loader2 } from "lucide-svelte";

	let { data, form: actionForm } = $props();

	const { form, errors, constraints, enhance, delayed } = superForm(data.form);
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<Card.Root class="w-[400px]">
		<Card.Header>
			<Card.Title>Portfolio Roaster</Card.Title>
			<Card.Description>Roast your portfolio with AI</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance class="space-y-4">
				<div class="space-y-2">
					<Label for="url">URL</Label>
					<Input
						type="url"
						name="url"
						placeholder="https://portfolio.com"
						bind:value={$form.url}
						{...$constraints.url}
					/>
					{#if $errors.url}
						<p class="text-sm text-destructive">{$errors.url}</p>
					{/if}
				</div>
				<div class="flex justify-end">
					<button
						type="submit"
						class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
						disabled={$delayed}
					>
						{#if $delayed}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Roasting...
						{:else}
							Roast It
						{/if}
					</button>
				</div>
			</form>
		</Card.Content>
		{#if actionForm?.roast}
			<Card.Footer>
				<p class="text-sm text-muted-foreground">{actionForm.roast}</p>
			</Card.Footer>
		{/if}
	</Card.Root>
</div>