<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Copy, RefreshCw } from "lucide-svelte";
	import { fade } from "svelte/transition";
	import { marked } from "marked";

	let { roast, onReset } = $props<{ 
		roast: string; 
		onReset: () => void 
	}>();

	let copied = $state(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(roast);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div in:fade={{ duration: 300 }} class="w-full max-w-2xl mx-auto">
	<Card.Root class="w-full">
		<Card.Header>
			<Card.Title>Your Roast 🔥</Card.Title>
			<Card.Description>Here's what the AI thinks of your portfolio.</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="bg-muted/50 p-6 rounded-md max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed border">
				{@html marked(roast)}
			</div>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-4">
			<div class="flex justify-between gap-4">
                <Button variant="outline" onclick={onReset}>
				<RefreshCw class="mr-2 h-4 w-4" />
				Roast Another
			</Button>
			<Button onclick={copyToClipboard} variant={copied ? "secondary" : "default"}>
				{#if copied}
					Copied!
				{:else}
					<Copy class="mr-2 h-4 w-4" />
					Copy Roast
				{/if}
			</Button>
        </div>
        <p class="text-xs text-muted-foreground">Roasted by <a href="https://portfolio-roaster-sv.vercel.app/" target="_blank" rel="noreferrer noopener" class="text-primary hover:underline">https://portfolio-roaster-sv.vercel.app</a></p>
		</Card.Footer>
	</Card.Root>
</div>
