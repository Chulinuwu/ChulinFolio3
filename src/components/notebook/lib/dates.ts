import type { Experience } from '@/lib/data';

// A bare year sorts mid-year so it lands after dated entries that start early in the same year.
const UNKNOWN_MONTH = 6;

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const parsePoint = (text: string) => {
	const year = Number(text.match(/\d{4}/)?.[0] ?? Number.NaN);
	const month = MONTHS.indexOf(text.trim().slice(0, 3).toLowerCase());
	return { year, month: month < 0 ? UNKNOWN_MONTH : month };
};

const spanOf = (exp: Experience) => {
	const [start, end = ''] = exp.year.split(' - ');
	return { start: parsePoint(start), end: parsePoint(end) };
};

export const startKey = (exp: Experience) => {
	const { start } = spanOf(exp);
	return start.year * 12 + start.month;
};

const monthKey = (p: { year: number; month: number }) => p.year * 12 + p.month;

export const nowKey = (date: Date) => date.getFullYear() * 12 + date.getMonth();

// End months are inclusive, so a bar runs to the end of its last month; an open role runs to today.
export const monthRange = (exp: Experience, today: number) => {
	const { start, end } = spanOf(exp);
	return { start: monthKey(start), end: Number.isNaN(end.year) ? today + 1 : monthKey(end) + 1 };
};
