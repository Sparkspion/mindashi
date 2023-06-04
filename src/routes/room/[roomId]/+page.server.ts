import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params, locals: { supabase, getSession } }) => {
	const { roomId } = params as { roomId: string };
	const session = await getSession();
	const user_id = session.user.id;
	let { data: messages } = await supabase.from('messages').select().eq('room_id', roomId);
	let { data: room } = await supabase.from('chat_rooms').select().single();
	const personId = room?.members.find((id: string) => id !== user_id);
	let { data: person_info } = await supabase
		.from('user_info')
		.select('username')
		.eq('id', personId)
		.single();

	return { room, messages: messages || [], user_id, person_info };
};

export const actions: Actions = {
	sendMessage: async ({ request, locals: { supabase, getSession } }) => {
		const body = await request.formData();
		const content = body.get('msg') as string;
		const room_id = body.get('roomId') as string;
		const session = await getSession();
		const user_id = session.user.id;

		const { data, error } = await supabase.from('messages').insert([{ room_id, user_id, content }]);

		if (error) {
			return fail(501, error);
		}
	}
};
