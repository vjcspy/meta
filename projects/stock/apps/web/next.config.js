/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ['ace-builds', 'clsx'],
};

module.exports = nextConfig;
