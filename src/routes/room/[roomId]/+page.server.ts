import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
	const { roomId } = params as { roomId: string };
	return { roomId };
};
