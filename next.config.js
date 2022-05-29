/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    loader: "imgix",
    path: "/",
  },
};

module.exports = nextConfig;
