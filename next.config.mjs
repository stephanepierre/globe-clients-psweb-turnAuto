/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Évite les warnings d’images sur un site statique
  images: {
    unoptimized: true, // évite les optimisations Next inutiles
  },

  // ✅ Supprime les console.log en production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

};

export default nextConfig;
