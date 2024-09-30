// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: process.env.NODE_ENV === 'production' ? '/violet-notes/' : '/',
    output: 'export',
    distDir: 'public/out',
};

export default nextConfig
