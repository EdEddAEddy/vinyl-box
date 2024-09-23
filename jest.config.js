export default {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["js"],
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/test/unit/**/*.test.js"],
  rootDir: "./",
  verbose: true,
  modulePaths: ["."],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
