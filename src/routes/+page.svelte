<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import ROUTES from '$lib/const/routes.js';

	export let data;
	const { session } = data;

	onMount(() => {
		if (session) {
			goto(ROUTES.HOME);
		}
	});
</script>

<div class="hero bg-base-200 h-64">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<p class="py-6">
				Where minds unite, tranquility speaks. Empowering growth, fostering empathy. Explore,
				connect, transcend. Join us on this transformative journey.
			</p>
			<a href="/login" class="btn btn-primary">Get Started</a>
		</div>
	</div>
</div>
