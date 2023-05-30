<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	const { session } = data;

	onMount(() => {
		if (session) {
			goto('/home');
		}
	});
</script>

<div class="hero">
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
