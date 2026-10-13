import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data';
import { SCENES } from '@/components/notebook/config/scenes';
import { siteUrl } from '@/components/notebook/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const scenes = Object.values(SCENES).map((s) => ({ url: `${siteUrl}${s.path}`, priority: s.id === 'home' ? 1 : 0.8 }));
	const work = projects.map((p) => ({ url: `${siteUrl}/work/${p.slug}`, priority: 0.6 }));
	return [...scenes, ...work];
}
