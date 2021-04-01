module.exports = {
  plugins: [
    '@chakra-ui/gatsby-plugin',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Elijah\'s Math',
        short_name: 'elijahmath',
        start_url: '/',
        display: 'standalone',
        icon: 'src/images/icon.png',
        crossOrigin: 'use-credentials'
      }
    }
  ]
}
