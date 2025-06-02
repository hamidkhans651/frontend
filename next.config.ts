/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the App Directory for Next.js 13+ features.
  // This is true by default for new Next.js 13+ projects created with `create-next-app`.
  // You only need to explicitly set this if you're migrating an older project.
  experimental: {
    appDir: true,
  },

  // Output directory for standalone builds.
  // Useful for Docker deployments or when you want to run Next.js as a standalone server.
  // If you don't plan to use this, you can remove it.
  output: 'standalone',

  // Image Optimization Configuration:
  // If your blog posts will include images hosted on external domains,
  // you need to list those domains here for Next.js Image Optimization to work.
  // For example:
  // images: {
  //   domains: ['example.com', 'another-cdn.com'],
  // },
  // Since your blog app uses local content, this might not be immediately necessary,
  // but it's good to be aware of for future expansion.
  images: {
    // You can also configure remotePatterns for more flexible matching
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.example.com',
    //   },
    // ],
  },

  // Environment Variables:
  // You can expose environment variables to the browser here.
  // Variables defined in .env.local are already available on the server.
  // Only variables prefixed with NEXT_PUBLIC_ are exposed to the client by default.
  // env: {
  //   CUSTOM_VAR: 'my-custom-value',
  // },

  // Redirects:
  // Define custom URL redirects.
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true, // true for 308, false for 307
  //     },
  //   ];
  // },

  // Rewrites:
  // Define custom URL rewrites (proxy requests).
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/proxy/:path*',
  //       destination: 'https://external-api.com/:path*',
  //     },
  //   ];
  // },

  // Headers:
  // Add custom HTTP headers to all responses.
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)', // Apply to all routes
  //       headers: [
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //       ],
  //     },
  //   ];
  // },

  // Webpack configuration (advanced):
  // webpack: (config, { isServer }) => {
  //   // Custom webpack configurations
  //   return config;
  // },
};

module.exports = nextConfig;
