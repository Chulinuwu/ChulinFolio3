import DeviceIntro from '@/components/notebook/home/DeviceIntro';
import HomePage from '@/components/notebook/home/HomePage';
import PageTurn from '@/components/notebook/ui/PageTurn';

export default function Home() {
	return (
		<PageTurn>
			<DeviceIntro>
				<HomePage />
			</DeviceIntro>
		</PageTurn>
	);
}
