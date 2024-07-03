/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/{!(*protocols|index),}.ts',
    '!<rootDir>/src/main/**',
    '**/*.spec.ts',
    '**/*.test.ts',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    "@/domain/(.*)": "<rootDir>/src/core/domain/$1",
    "@/application/(.*)": "<rootDir>/src/core/application/$1",
    "@/persistence/(.*)": "<rootDir>/src/infrastructure/persistence/$1",
  }
};