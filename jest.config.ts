module.exports = {
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
  modulePaths: [
    '<rootDir>',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@auth': '<rootDir>/src/auth',
    '@utils': '<rootDir>/src/utils',
    '@articles': '<rootDir>/src/models/aerticles',
  },
};
