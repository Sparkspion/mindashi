<script lang="ts">
	import { enhance } from '$app/forms';
	import ChatRoom from '$lib/components/chatRoom/+page.svelte';

	export let data;
	const { userInfo, users } = data;
	let personId = '';

	const handleClick = (id: string) => {
		personId = id;
	};
</script>

<div class="container flex justify-between my-5">
	<p>Welcome, {userInfo?.username}.</p>

	<form method="post" action="?/signout" use:enhance>
		<div>
			<button class="btn btn-primary btn-sm">Sign Out</button>
		</div>
	</form>
</div>

<p class="mb-2">Users</p>
<div class="container flex flex-col justify-start gap-1">
	{#if users}
		{#each users as user}
			<ChatRoom user={user.username} on:click={() => handleClick(user.id)} />
		{/each}
	{/if}
</div>
