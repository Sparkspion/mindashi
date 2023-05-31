import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import ROUTES from '$lib/const/routes';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, ROUTES.DEFAULT);
	}
	const userId = session.user.id;

	let { data: users, error } = await supabase.from('user_info').select('*');

	const userInfo = users?.find(({ id }) => id === userId);

	if (error) {
		return fail(502, { message: 'Something went wrong' });
	}
	return { session, userInfo, users: users?.filter(({ id }) => id !== userId) };
};

export const actions: Actions = {
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, ROUTES.DEFAULT);
		}
		return {};
	},
	startChat: async () => {}
};
