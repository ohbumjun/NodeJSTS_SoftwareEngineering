"use strict";
module.exports = {
    roots: ['<rootDir>/test'],
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
    transform: {
        '^.+\\.(ts)?$': 'ts-jest',
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/public/js/**/*.ts'],
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    testMatch: [
        '<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ]
};
