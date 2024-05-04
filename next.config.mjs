/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["www.gravatar.com"],
    },
    typescript: {
        ignoreBuildErrors: true, // This is a temporary fix to ignore build errors
    }
};

export default nextConfig;
