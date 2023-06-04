<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import '../app.css';

	export let data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="container p-3 mx-auto flex flex-col h-screen max-w-5xl">
	<a href="/" class="block text-center text-primary text-3xl font-bold mt-3 mb-8">Mindashi</a>
	<div class="flex-1">
		<slot />
	</div>
</div>
