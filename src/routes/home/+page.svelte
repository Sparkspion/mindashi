<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import ChatRoom from '$lib/components/chatRoom/+page.svelte';
	import ROUTES from '$lib/const/routes.js';

	export let data;
	const { userInfo, users } = data;
	let loading = false;

	const handleClick = async (personId: string) => {
		loading = true;
		const res = await fetch('/api/createRoom', {
			method: 'POST',
			body: JSON.stringify({
				userId: userInfo?.id,
				personId
			})
		});
		loading = false;
		const { id: roomId } = await res.json();
		roomId && goto(`${ROUTES.ROOM}/${roomId}`);
	};
</script>

{#if loading}
	<progress class="progress w-full progress-primary fixed top-0 left-0 right-0" />
{/if}

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
