/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
        unoptimized: true,
    }
};

export default nextConfig;
