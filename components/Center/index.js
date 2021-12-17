import { ChevronDownIcon } from "@heroicons/react/outline";
import { playlistIdState, playlistState } from "atoms/playlistAtom";
import useSpotify from "hooks/useSpotify";
import { shuffle } from "lodash";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Songs from "../Songs";

const colors = [
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-purple-500",
];

const Center = () => {
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [color, setColor] = useState(null);
	const playlistsId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);

	useEffect(() => {
		setColor(shuffle(colors).pop());
	}, [playlistsId]);

	useEffect(() => {
		spotifyApi
			.getPlaylist(playlistsId)
			.then((res) => setPlaylist(res.body))
			.catch((e) => console.error(e));
	}, [spotifyApi, playlistsId]);

	return (
		<div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
			<header className='absolute top-5 right-8' onClick={signOut}>
				<div className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
					<img
						className='rounded-full w-10 h-10'
						src={session?.user.image}
						alt=''
					/>
					<h2>{session?.user.name}</h2>
					<ChevronDownIcon className='h-5 w-5' />
				</div>
			</header>

			<section
				className={`bg-gradient-to-b to-black ${color} h-80 flex items-end space-x-7 p-8 text-white `}
			>
				<img
					src={playlist?.images?.[0]?.url}
					alt=''
					className='w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-44 lg:h-44 shadow-2xl'
				/>
				<div>
					<p>PLAYLIST</p>
					<h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
						{playlist?.name}
					</h1>
				</div>
			</section>

			<div>
				<Songs />
			</div>
		</div>
	);
};

export default Center;
