<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from './$types.js';
	import ROUTES from '$lib/const/routes.js';

	export let data, form;
	const { session, users } = data;
	let loading = false;
	let formData = { email: '', password: '' };

	onMount(() => {
		if (session) {
			goto(ROUTES.HOME);
		}
	});

	const handleLogin: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const handleAutoLogin = (user: keyof typeof users) => {
		formData = users[user];
	};
</script>

<form
	method="POST"
	action="?/login"
	class="flex flex-col max-w-xs container mx-auto gap-3"
	use:enhance={handleLogin}
>
	<div class="form-control">
		<label class="label" for="email">
			<span class="label-text">Your Email</span>
		</label>
		<input type="text" name="email" bind:value={formData.email} class="input input-bordered" />
	</div>
	<div class="form-control">
		<label class="label" for="password">
			<span class="label-text">Your Password</span>
		</label>
		<input
			type="password"
			name="password"
			bind:value={formData.password}
			class="input input-bordered"
		/>
	</div>
	<button type="submit" disabled={loading} class:loading class="btn btn-primary"> Log in </button>

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
	<div class="divider">OR</div>
	<div class="flex justify-center gap-5">
		<button type="button" on:click={() => handleAutoLogin('hiroshi')}>
			<div class="avatar placeholder">
				<div class="bg-neutral-focus text-neutral-content rounded-full w-24">
					<span class="text-3xl">HT</span>
				</div>
			</div>
		</button>
		<button type="button" on:click={() => handleAutoLogin('emi')}>
			<div class="avatar placeholder">
				<div class="bg-neutral-focus text-neutral-content rounded-full w-24">
					<span class="text-3xl">EN</span>
				</div>
			</div>
		</button>
	</div>
</form>
