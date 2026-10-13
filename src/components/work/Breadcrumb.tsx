import Link from 'next/link';
import { Fragment } from 'react';
import { SCENES } from '@/components/notebook/config/scenes';
import type { BreadcrumbProps } from '@/components/notebook/types/notebook.types';

export default function Breadcrumb({ trail }: BreadcrumbProps) {
	const crumbs = [{ label: SCENES.home.label, href: SCENES.home.path }, ...trail];
	return (
		<nav aria-label="Breadcrumb">
			<ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] text-ink-soft">
				{crumbs.map((c, i) => (
					<Fragment key={c.label}>
						{i > 0 && (
							<li aria-hidden className="text-ink-muted">
								/
							</li>
						)}
						<li className="min-w-0">
							{c.href ? (
								<Link href={c.href} transitionTypes={['turn-back']} className="text-pink underline decoration-pink/40 underline-offset-4 hover:decoration-pink">
									{c.label}
								</Link>
							) : (
								<span aria-current="page" className="text-ink">
									{c.label}
								</span>
							)}
						</li>
					</Fragment>
				))}
			</ol>
		</nav>
	);
}
