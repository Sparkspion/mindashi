import { AuthApiError } from '@supabase/supabase-js';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import users from '$lib/data/users';
import ROUTES from '$lib/const/routes';

export const load: PageServerLoad = async () => {
	return { users };
};

export const actions: Actions = {
	login: async ({ request, locals: { supabase } }) => {
		const body = await request.formData();
		const email = body.get('email') as string;
		const password = body.get('password') as string;
		const { error: err } = await supabase.auth.signInWithPassword({ email, password });

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, { message: 'Invalid credentials.' });
			}
			return fail(400, { message: 'Server error.' });
		}
		throw redirect(303, ROUTES.HOME);
	}
};
