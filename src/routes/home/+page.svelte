<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	const { userInfo } = data;
</script>

<div class="container flex justify-between mt-5">
	<p>Welcome, {userInfo?.username}.</p>

	<form method="post" action="?/signout" use:enhance>
		<div>
			<button class="btn btn-primary btn-sm">Sign Out</button>
		</div>
	</form>
</div>
