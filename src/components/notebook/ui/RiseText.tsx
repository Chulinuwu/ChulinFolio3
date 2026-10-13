import type { CSSProperties } from 'react';
import type { RiseTextProps } from '../types/notebook.types';

// Splits text into letters for the rise animation; words stay unbroken so wrapping is unchanged.
export default function RiseText({ text, delayMs = 0 }: RiseTextProps) {
	let i = 0;
	return (
		<span aria-label={text} role="text">
			{text.split(' ').map((word, w) => (
				<span key={`${word}-${w}`} aria-hidden className="inline-block whitespace-nowrap">
					{[...word].map((ch) => {
						const style: CSSProperties & Record<'--rise-i' | '--rise-delay', string> = {
							'--rise-i': String(i++),
							'--rise-delay': `${delayMs}ms`
						};
						return (
							<span key={`${ch}-${i}`} className="rise-letter" style={style}>
								{ch}
							</span>
						);
					})}
					{w < text.split(' ').length - 1 && ' '}
				</span>
			))}
		</span>
	);
}
