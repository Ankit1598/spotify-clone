const plugin = require("tailwindcss/plugin");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities(
				{
					".scrollbar-hide": {
						/* IE and Edge */
						"-ms-overflow-style": "none",

						/* Firefox */
						"scrollbar-width": "none",

						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "none",
						},
					},

					".scrollbar-default": {
						/* IE and Edge */
						"-ms-overflow-style": "auto",

						/* Firefox */
						"scrollbar-width": "auto",

						/* Safari and Chrome */
						"&::-webkit-scrollbar": {
							display: "block",
						},
					},
				},
				["responsive"]
			);
		}),
	],
};
