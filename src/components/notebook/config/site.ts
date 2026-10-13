// Vercel exposes the production host at build time; local builds use the dev server.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
	process.env.SITE_URL ?? (productionHost ? `https://${productionHost}` : 'http://localhost:3000');
