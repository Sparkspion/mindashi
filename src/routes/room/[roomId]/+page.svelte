<script lang="ts">
	import { onMount } from 'svelte';
	import { formatDistanceToNow } from 'date-fns';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types.js';

	export let data;
	const { room, messages, user_id, person_info, supabase } = data;
	let loading = false,
		scrollContainer: HTMLElement;
	$: chats = messages;

	const handleMsg: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			update();
			loading = false;
		};
	};

	onMount(() => {
		const msgsSubscription = supabase
			.channel('any')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'messages', filter: `room_id=eq.${room?.id}` },
				(payload) => {
					chats = [...chats, payload.new];
					handleDelayedScrollToBottom();
				}
			)
			.subscribe();
		return () => {
			msgsSubscription.unsubscribe();
		};
	});

	const handleDelayedScrollToBottom = () => {
		setTimeout(() => {
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		}, 0);
	};
</script>

{#if loading}
	<progress class="progress w-full progress-primary fixed top-0 left-0 right-0" />
{/if}
<div class="flex flex-col h-full">
	<h2 class="text-center p-4 text-2xl font-bold">{person_info?.username}</h2>
	<div class="flex-1 overflow-auto" bind:this={scrollContainer}>
		{#each chats as message}
			<div class={`chat ${message.user_id === user_id ? 'chat-end' : 'chat-start'}`}>
				<div class="chat-header">
					<time class="text-xs opacity-50"
						>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</time
					>
				</div>
				<div class="chat-bubble">{message.content}</div>
			</div>
		{/each}
	</div>
	<form method="POST" action="?/sendMessage" class="flex p-3" use:enhance={handleMsg}>
		<input
			type="text"
			name="msg"
			placeholder="Type here"
			class="input input-bordered input-md flex-1"
		/>
		<input type="hidden" name="roomId" value={room?.id} />
		<button type="submit" class="btn join-item rounded-r-full">send</button>
	</form>
</div>
