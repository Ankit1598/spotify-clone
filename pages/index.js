import Center from '@/components/Center';
import Player from '@/components/Player';
import SideBar from "@/components/Sidebar";
import { getSession } from 'next-auth/react';

export default function Home() {
	return (
		<div className='bg-black h-screen overflow-hidden'>
			<main className='flex'>
				<SideBar />
				<Center />
			</main>
			<div className='sticky bottom-0'>
				<Player />
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	
	return {
		props: {
			session,
		},
	};
}