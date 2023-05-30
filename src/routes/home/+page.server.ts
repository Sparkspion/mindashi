import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}
	const userId = session.user.id;

	let { data: userNames, error } = await supabase
		.from('user_info')
		.select('username')
		.eq('id', userId);
	const [userName] = userNames || [];

	if (error) {
		return fail(502, { message: 'Something went wrong' });
	}
	return { session, userInfo: userName };
};

export const actions: Actions = {
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
		return {};
	}
};
