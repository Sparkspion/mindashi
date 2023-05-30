<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	export let form;
	const { session } = data;

	onMount(() => {
		if (session) {
			goto('/home');
		}
	});
</script>

<form
	method="POST"
	action="?/login"
	class="flex flex-col max-w-xs container mx-auto gap-3"
	use:enhance
>
	<div class="form-control">
		<label class="label" for="email">
			<span class="label-text">Your Email</span>
		</label>
		<input type="text" name="email" placeholder="info@mindashi.com" class="input input-bordered" />
	</div>
	<div class="form-control">
		<label class="label" for="password">
			<span class="label-text">Your Password</span>
		</label>
		<input type="password" name="password" placeholder="******" class="input input-bordered" />
	</div>
	<button type="submit" class="btn btn-primary">Log in</button>
	{#if form?.message}
		<div class="alert alert-error shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Error! {form.message}</span>
			</div>
		</div>
	{/if}
</form>
