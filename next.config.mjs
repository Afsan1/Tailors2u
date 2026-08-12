/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/fabrics',
        destination: '/fabric',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
