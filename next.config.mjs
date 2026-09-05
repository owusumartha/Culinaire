/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cache-Control', value: 'public, max-age=300, must-revalidate' },
        ],
      },
      {
        source: '/(.*\\.(?:js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
