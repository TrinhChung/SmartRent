/** @type {import('jest').Config} */

module.exports = {
  testMatch: ["**/src/test/**.test.js"],
  rootDir: "./src",
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  clearMocks: true,
  silent: true,
  forceExit: true,
  detectOpenHandles: true,
};
