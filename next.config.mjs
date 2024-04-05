/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    basePath: '/v2',
    assetPrefix: '/v2',
    trailingSlash: true,
    output: 'export',
    distDir: 'build',
};

export default nextConfig;
