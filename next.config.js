const API_URL = process.env.NEXT_PUBLIC_API_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/graphql',
				destination: `${API_URL}/graphql`,
			},
		]
	},
}

module.exports = nextConfig
