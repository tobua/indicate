import { join } from 'path'

// This is not required for regular use of indicate with Next.js.
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Symlinked dependency will resolve React in root and therefore bundle React twice leading to an error.
    config.resolve.alias.react = join(process.cwd(), 'node_modules/react')
    return config
  },
}

export default nextConfig
