import type { ImageAsset } from '../types/notebook.types';

export const AVATAR: ImageAsset = {
	src: '/notebook/avatar.png',
	width: 724,
	height: 724,
	alt: 'Chulin as she draws herself: maroon hair with heavy bangs, a black bow, sleepy eyes and headphones around her neck'
};

// The drawing is a full circle, so a ring offset from its edge reads as a frame around it.
export const AVATAR_OUTLINE = 'rounded-full outline-[1.5px] outline-ink-line outline-offset-[6px]';
