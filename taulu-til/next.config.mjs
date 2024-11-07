/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"],
		turbo: {
			     resolveAlias: {
			       canvas: './empty-module.ts',
			     },
			   },
	},
};

// module.exports = nextConfig;

export default nextConfig;