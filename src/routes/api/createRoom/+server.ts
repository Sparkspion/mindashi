import { fail, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
	const { userId, personId } = await request.json();
	let { data: chat_rooms } = await supabase
		.from('chat_rooms')
		.select()
		.contains('members', [userId, personId])
		.single();

	if (!chat_rooms) {
		const { data, error } = await supabase
			.from('chat_rooms')
			.upsert([{ created_by: userId, description: '', members: [userId, personId] }])
			.select()
			.single();

		if (!error) {
			return new Response(JSON.stringify(data) || '{}');
		} else {
			throw fail(501, { error });
		}
	} else {
		return new Response(JSON.stringify(chat_rooms) || '{}');
	}
};
