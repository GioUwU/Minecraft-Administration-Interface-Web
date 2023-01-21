// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    domains: [
      "back.mariana-re.com",
      "res.cloudinary.com",
      "localhost",
      "https://back.mariana-re.com/",
      "https://back.mariana-re.com/avatar/",
      "i.imgur.com",
    ],
  },

  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
