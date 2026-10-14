import { Fragment, type CSSProperties } from 'react';
import type { RiseTextProps } from '../types/notebook.types';

// Splits text into letters for the rise animation; words stay unbroken so wrapping is unchanged.
export default function RiseText({ text, delayMs = 0 }: RiseTextProps) {
	const words = text.split(' ');
	let i = 0;
	return (
		<span aria-label={text} role="text">
			{words.map((word, w) => (
				<Fragment key={`${word}-${w}`}>
					{w > 0 && ' '}
					<span aria-hidden className="inline-block whitespace-nowrap">
						{[...word].map((ch) => {
							const style: CSSProperties & Record<'--rise-i' | '--rise-delay', string> = {
								'--rise-i': String(i++),
								'--rise-delay': `${delayMs}ms`
							};
							return (
								<span key={`${ch}-${i}`} data-ch={ch} className="rise-letter" style={style}>
									{ch}
								</span>
							);
						})}
					</span>
				</Fragment>
			))}
		</span>
	);
}
