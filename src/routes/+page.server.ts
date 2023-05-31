import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import ROUTES from '$lib/const/routes';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		redirect(303, ROUTES.HOME);
	}

	return { session };
};
