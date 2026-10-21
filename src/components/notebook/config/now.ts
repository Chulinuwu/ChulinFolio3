import type { NowRole } from '../types/notebook.types';

// Roles shown only in the Right now panel; they are kept out of data.ts so the ledger and Experiences page skip them.
export const NOW_ONLY_ROLES: NowRole[] = [
	{ role: 'AI Engineer (Full-time)', org: 'TOMAS TECH CO., LTD.', since: 'July 2026' }
];
