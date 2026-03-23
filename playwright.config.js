// Playwright config for frontend
const isRemote = !!process.env.PLAYWRIGHT_BASE_URL;

module.exports = {
  testDir: './e2e',
  webServer: isRemote
    ? undefined
    : {
        command: 'npm run dev',
        port: 3000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
      },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    headless: true,
  },
};