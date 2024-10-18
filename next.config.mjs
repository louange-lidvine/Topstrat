/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["www.gravatar.com"],
        domains: ["res.cloudinary.com"],
    },
    typescript: {
        ignoreBuildErrors: true, // This is a temporary fix to ignore build errors
    },
    webpack: (config) => {
        config.resolve = {
            ...config.resolve,
            fallback: {
                fs: false,
                path: false,
                os: false,
            },
        };
        return config;
    },
};

export default nextConfig;
