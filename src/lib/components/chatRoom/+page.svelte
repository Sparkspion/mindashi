<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let user: string;

	const dispatch = createEventDispatcher();
</script>

<button
	type="button"
	class="flex gap-5 p-4 bg-neutral-focus shadow-xl"
	on:click={() => dispatch('click')}
>
	<div class="avatar placeholder">
		<div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
			<span class="text-2xl">{user.charAt(0)}</span>
		</div>
	</div>
	<div>
		<h2 class="card-title">{user}</h2>
		<p>user</p>
	</div>
</button>
