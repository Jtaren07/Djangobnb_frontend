// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add the hostname of your image source here
    // For local development, 'localhost' is the hostname,
    // and you should include the port if it's not the default HTTP/HTTPS port.
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', // Specify the port your image server is running on
        pathname: '/media/uploads/**', // Optionally, restrict to a specific path
      },
    ],
  },
};

module.exports = nextConfig;

