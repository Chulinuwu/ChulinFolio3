// Pen names match the --color-pen-* tokens in app.css, which hold the values.
export const PENS = ['pink', 'blue', 'green', 'violet', 'orange'] as const;

// Order of the pens across the hero wordmark and the dot field, left to right.
export const PEN_GRADIENT = [
	'blue',
	'violet',
	'pink',
	'orange'
] as const satisfies readonly (typeof PENS)[number][];
