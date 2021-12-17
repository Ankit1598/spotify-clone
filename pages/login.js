import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
	return (
		<div className='bg-black min-h-screen w-full flex flex-col items-center justify-center'>
			<img
				className='w-52 mb-5'
				src='https://cdn.pixabay.com/photo/2021/06/14/04/44/spotify-6334914_960_720.png'
				alt=''
			/>

			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						className='bg-[#18d860] text-white px-5 py-3 rounded-lg'
						onClick={() =>
							signIn(provider.id, { callbackUrl: "/" })
						}
					>
						Login with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
