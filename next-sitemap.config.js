// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://chhayapartyplot.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
    exclude: ['/admin', '/login'],
};
