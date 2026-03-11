'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

interface BlurTextProps {
	text: string;
	delay?: number;
	className?: string;
	wordClassName?: string;
}

export function BlurText({ text, delay = 80, className = '', wordClassName = '' }: BlurTextProps) {
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);

	const words = useMemo(() => text.split(' '), [text]);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setInView(true);
			},
			{ threshold: 0.1 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<span ref={ref} className={`inline-flex flex-wrap ${className}`}>
			{words.map((word, i) => (
				<span
					key={i}
					className={`inline-block transition-all duration-500 ease-out ${wordClassName}`}
					style={{
						filter: inView ? 'blur(0px)' : 'blur(10px)',
						opacity: inView ? 1 : 0,
						transform: inView ? 'translateY(0)' : 'translateY(12px)',
						transitionDelay: `${i * delay}ms`,
					}}
				>
					{word}
					{i < words.length - 1 ? '\u00A0' : ''}
				</span>
			))}
		</span>
	);
}
