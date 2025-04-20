/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'instrutherm.com.br',
            },
        ],
    },
};

module.exports = nextConfig
