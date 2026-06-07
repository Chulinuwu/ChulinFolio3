import HandDrawnNav from '@/components/hero/HandDrawnNav';
import HeroPreview from '@/components/hero/HeroPreview';
import WhatIDo from '@/components/sections/WhatIDo';
import Journey from '@/components/sections/Journey';
import SelectedWork from '@/components/sections/SelectedWork';
import Wins from '@/components/sections/Wins';
import Toolbox from '@/components/sections/Toolbox';
import Connect from '@/components/sections/Connect';
import SiteFooter from '@/components/sections/SiteFooter';

export default function Home() {
	return (
		<>
			<HandDrawnNav />
			<main id="top">
				<HeroPreview />
				<WhatIDo />
				<Journey />
				<SelectedWork />
				<Wins />
				<Toolbox />
				<Connect />
			</main>
			<SiteFooter />
		</>
	);
}
