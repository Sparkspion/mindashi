import { AuthApiError } from '@supabase/supabase-js';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, locals: { supabase, getSession } }) => {
		const body = await request.formData();
		const email = body.get('email') as string;
		const password = body.get('password') as string;
		const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, { message: 'Invalid credentials.' });
			}
			return fail(400, { message: 'Server error.' });
		}

		redirect(303, '/home');

		const session = await getSession();
		return { session, data };
	}
};
