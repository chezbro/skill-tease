/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,
    images: {
      domains: ['picsum.photos'],
    },
    transpilePackages: ['lucide-react'],
};

export default nextConfig;
